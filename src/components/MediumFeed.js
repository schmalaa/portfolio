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
                        const contentNode = item.getElementsByTagName("content:encoded")[0] || item.querySelector("content\\:encoded");
                        const content = contentNode?.textContent || item.querySelector("description")?.textContent || "";
                        const description = item.querySelector("description")?.textContent || "";

                        // Extract categories
                        const categoryNodes = item.querySelectorAll("category");
                        const categories = Array.from(categoryNodes).map(node => node.textContent);

                        // Save the raw innerHTML in case we need it for fallback regex scraping
                        const innerHTML = item.innerHTML || "";

                        return { title, link, pubDate, guid, content, description, categories, innerHTML };
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
        const htmlContent = item.content || item.description || item.innerHTML || "";
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
            <div style={{ padding: "8px", fontFamily: "'Tahoma','Arial',sans-serif", fontSize: 11, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 16, height: 16, border: "2px solid #000080", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} aria-label="Loading" />
                Loading Medium articles...
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (error || articles.length === 0) {
        return (
            <div style={{ padding: "8px", fontFamily: "'Tahoma','Arial',sans-serif", fontSize: 11, color: "#444" }}>
                No articles found or unable to load feed.
            </div>
        );
    }
    return (
        <div className="medium-feed-list">
            {articles.map((article, idx) => {
                const imageUrl = extractImage(article);
                return (
                    <div key={article.guid} className="medium-row win-listview-row">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, color: "#000080" }}>
                            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                        </svg>
                        <div className="medium-row-content">
                            <a
                                href={article.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="medium-row-title"
                            >
                                {article.title}
                            </a>
                            <span className="medium-row-date">
                                {new Date(article.pubDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                            </span>
                            <span className="medium-row-tags">
                                {article.categories.slice(0, 3).map(tag => (
                                    <span key={tag} className="medium-row-tag">{tag}</span>
                                ))}
                            </span>
                        </div>
                    </div>
                );
            })}

            <style jsx>{`
                .medium-feed-list {
                    background: #ffffff;
                    box-shadow: inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #404040;
                    width: 100%;
                }
                .medium-row {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    padding: 6px 8px;
                    border-bottom: 1px solid #e0e0e0;
                    font-family: 'Tahoma','Arial',sans-serif;
                    font-size: 11px;
                    color: #000;
                }
                .medium-row:hover {
                    background: #000080;
                    color: #fff;
                }
                .medium-row:hover a, .medium-row:hover .medium-row-date, .medium-row:hover .medium-row-tag {
                    color: #fff !important;
                }
                .medium-row-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }
                .medium-row-title {
                    color: #000080;
                    font-weight: bold;
                    text-decoration: underline;
                    font-size: 11px;
                }
                .medium-row-date {
                    color: #666;
                    font-size: 10px;
                }
                .medium-row-tags {
                    display: flex;
                    gap: 4px;
                    flex-wrap: wrap;
                }
                .medium-row-tag {
                    font-size: 10px;
                    color: #444;
                    background: #e0e0e0;
                    padding: 0 4px;
                }
            `}</style>
        </div>
    );
}
