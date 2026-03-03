"use client";

import React from 'react';

export default function Socials() {
    return (
        <div className="socials-container">
            <ul className="socials-list">
                <li>
                    <a
                        href="https://github.com/schmalaa/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="GitHub"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-github"
                        >
                            <title>GitHub</title>
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.linkedin.com/in/alex-schmaltz-12127139/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="LinkedIn"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-linkedin"
                        >
                            <title>LinkedIn</title>
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                    </a>
                </li>
                <li>
                    <a
                        href="https://medium.com/@schmalaa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="Medium"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            viewBox="0 0 24 24"
                            style={{ fill: 'currentColor', stroke: 'none', width: '20px', height: '20px' }}
                        >
                            <title>Medium</title>
                            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                        </svg>
                    </a>
                </li>
            </ul>

            <style jsx>{`
                .socials-container {
                    width: 40px;
                    position: fixed;
                    bottom: 0px;
                    left: 40px;
                    right: auto;
                    z-index: 10;
                    color: var(--clr-text-muted);
                }
                .socials-list {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin: 0px;
                    padding: 0px;
                    list-style: none;
                }
                .socials-list::after {
                    content: "";
                    display: block;
                    width: 1px;
                    height: 90px;
                    margin: 0px auto;
                    background-color: var(--clr-text-muted);
                }
                .social-link {
                    padding: 10px;
                    display: inline-block;
                    transition: var(--transition-normal);
                    color: inherit;
                }
                .social-link:hover, .social-link:focus {
                    color: var(--clr-primary);
                    transform: translateY(-3px);
                }
                .social-link svg {
                    width: 20px;
                    height: 20px;
                }

                @media (max-width: 768px) {
                    .socials-container {
                        left: 20px;
                        display: none; /* Often hidden on very small screens, or we can just move it to the footer */
                    }
                }
            `}</style>
        </div>
    );
}
