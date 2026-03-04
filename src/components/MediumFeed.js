"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function MediumFeed({ username = "schmalaa" }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchArticles() {
            try {
                // Use our internal Next.js API route to fetch the Medium RSS XML
                // This bypasses entirely CORS blocks from external proxies like allorigins.win
                const apiUrl = `/api/medium?username=${encodeURIComponent(username)}`;

                const response = await fetch(apiUrl, { cache: "no-store" });
                if (!response.ok) throw new Error("Failed to fetch Medium articles from API");

                const xmlString = await response.text();

                if (xmlString) {
                    // Manually parse the raw XML string into a DOM Document
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

                    const items = Array.from(xmlDoc.querySelectorAll("item"));

                    const parsedPosts = items.map(item => {
                        const title = item.querySelector("title")?.textContent || "";
                        const link = item.querySelector("link")?.textContent || "";
                        const pubDate = item.querySelector("pubDate")?.textContent || "";
                        const guid = item.querySelector("guid")?.textContent || "";
                        // Content can be in <content:encoded> or <description>
                        const content = item.querySelector("content\\:encoded")?.textContent || item.querySelector("description")?.textContent || "";
                        const description = item.querySelector("description")?.textContent || "";

                        // Extract categories
                        const categoryNodes = item.querySelectorAll("category");
                        const categories = Array.from(categoryNodes).map(node => node.textContent);

                        return { title, link, pubDate, guid, content, description, categories };
                    });

                    // Filter out comments/replies (usually lack categories)
                    const posts = parsedPosts.filter(item => item.categories && item.categories.length > 0);
                    // Take the latest 3
                    setArticles(posts.slice(0, 3));
                } else {
                    throw new Error("Failed to parse RSS feed xml");
                }
            } catch (err) {
                console.error("Error fetching Medium feed:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchArticles();
    }, [username]);

    // Function to extract a clean text snippet from the HTML content returned by Medium
    const extractSnippet = (htmlContent) => {
        // Strip HTML tags
        const text = htmlContent.replace(/<[^>]+>/g, ' ');
        // Get first ~120 characters
        return text.length > 120 ? text.substring(0, 120) + "..." : text;
    };

    // Optional: Medium's RSS feed doesn't expose the "Featured Image" metadata.
    // It only dumps all images into the HTML body. 
    // This allows you to explicitly map an article's GUID (or URL) to a specific image URL.
    const thumbnailOverrides = {
        "https://medium.com/p/ce2c5f7001a1": "/leadrevival.jpg", // The Future of Web Development
        "https://medium.com/p/99f5655a2ec5": "/ai-planning.jpg"  // Don't Let Your Agents Go Rogue
    };

    // Function to extract the first image URL from the HTML content, with override support
    const extractImage = (item) => {
        // 1. Check if we have an explicit override for this article
        if (thumbnailOverrides[item.guid]) {
            return thumbnailOverrides[item.guid];
        }

        // 2. Check if the API magically found a thumbnail
        if (item.thumbnail && item.thumbnail !== "") return item.thumbnail;

        // 3. Fallback: parse the HTML body and extract the first valid image
        const htmlContent = item.content || item.description || "";
        // Match all images to potentially find highest res, but default to first valid cdn image
        const matches = [...htmlContent.matchAll(/<img[^>]+src=["'](https:\/\/cdn-images[^"']+|https:\/\/miro\.medium\.com[^"']+)["']/ig)];

        if (matches.length > 0) {
            // Return the first valid Medium CDN image found
            return matches[0][1];
        }

        return null;
    };

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
                <p style={{ color: "var(--clr-primary)" }}>Loading Medium articles...</p>
            </div>
        );
    }

    if (error || articles.length === 0) {
        return (
            <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
                <p style={{ color: "var(--clr-text-muted)" }}>No articles found or unable to load feed.</p>
            </div>
        );
    }
    return (
        <div className="medium-feed-grid">
            {articles.map((article) => {
                const imageUrl = extractImage(article);
                return (
                    <a
                        key={article.guid}
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="medium-card glass-panel"
                    >
                        {/* Thumbnail Image */}
                        <div className="medium-thumbnail">
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt={article.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            ) : (
                                <div style={{ width: '100%', height: '100%', background: 'var(--clr-bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ color: 'var(--clr-text-muted)' }}>Medium</span>
                                </div>
                            )}
                        </div>

                        {/* Content Area */}
                        <div className="medium-content">
                            <div className="medium-date">
                                {new Date(article.pubDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
                            </div>
                            <h4 className="medium-title">{article.title}</h4>
                            <p className="medium-snippet">{extractSnippet(article.description)}</p>

                            <div className="medium-tags">
                                {article.categories.slice(0, 3).map(tag => (
                                    <span key={tag} className="medium-tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </a>
                )
            })
            }

            <style jsx>{`
                .medium-feed-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 30px;
                    width: 100%;
                }

                .medium-card {
                    display: flex;
                    flex-direction: column;
                    border-radius: 12px;
                    overflow: hidden;
                    text-decoration: none;
                    color: inherit;
                    transition: transform var(--transition-normal), box-shadow var(--transition-normal);
                    height: 100%;
                }

                .medium-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(255, 255, 255, 0.05);
                }

                .medium-thumbnail {
                    position: relative;
                    width: 100%;
                    height: 180px;
                    overflow: hidden;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }

                .medium-content {
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                }

                .medium-date {
                    font-family: var(--font-heading);
                    font-size: 0.8rem;
                    color: var(--clr-primary);
                    margin-bottom: 8px;
                    font-weight: 600;
                }

                .medium-title {
                    font-size: 1.15rem;
                    line-height: 1.4;
                    margin-bottom: 12px;
                    color: var(--clr-text-main);
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .medium-snippet {
                    font-size: 0.95rem;
                    color: var(--clr-text-muted);
                    line-height: 1.5;
                    margin-bottom: 20px;
                    flex-grow: 1;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .medium-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-top: auto;
                }

                .medium-tag {
                    font-size: 0.75rem;
                    padding: 4px 10px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 20px;
                    color: var(--clr-text-accent);
                }
            `}</style>
        </div >
    );
}
