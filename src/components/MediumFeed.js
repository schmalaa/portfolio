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
                // Use rss2json to convert Medium's XML RSS feed into JSON
                const rssUrl = `https://medium.com/feed/@${username}`;
                const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error("Failed to fetch Medium articles");

                const data = await response.json();

                if (data.status === "ok") {
                    // Filter out comments/replies (Medium RSS sometimes includes them)
                    // Usually full articles have categories (tags)
                    const posts = data.items.filter(item => item.categories && item.categories.length > 0);
                    // Take the latest 3
                    setArticles(posts.slice(0, 3));
                } else {
                    throw new Error(data.message || "Failed to parse RSS feed");
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

    // Function to extract the first image URL from the HTML content
    const extractImage = (item) => {
        if (item.thumbnail && item.thumbnail !== "") return item.thumbnail;
        const htmlContent = item.content || item.description || "";
        const match = htmlContent.match(/<img[^>]+src=["']([^"']+)["']/i);
        return match ? match[1] : null;
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
