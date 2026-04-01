"use client";

import React from "react";

export default function Socials() {
  return (
    <div className="win-bottom-taskbar" role="complementary" aria-label="Social links taskbar">
      <div className="win-taskbar-links">
        <a
          href="https://github.com/schmalaa/"
          target="_blank"
          rel="noopener noreferrer"
          className="win-taskbar-app-btn"
          aria-label="GitHub"
          title="GitHub - schmalaa"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/alex-schmaltz-12127139/"
          target="_blank"
          rel="noopener noreferrer"
          className="win-taskbar-app-btn"
          aria-label="LinkedIn"
          title="LinkedIn - Alex Schmaltz"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
          LinkedIn
        </a>
        <a
          href="https://medium.com/@schmalaa"
          target="_blank"
          rel="noopener noreferrer"
          className="win-taskbar-app-btn"
          aria-label="Medium"
          title="Medium - @schmalaa"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
          </svg>
          Medium
        </a>
        <a
          href="mailto:alex.schmaltz@gmail.com"
          className="win-taskbar-app-btn"
          aria-label="Email Alex Schmaltz"
          title="Email - alex.schmaltz@gmail.com"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          Email
        </a>
      </div>

      <div className="win-taskbar-clock" aria-live="polite">
        <WinClock />
      </div>

      <style jsx>{`
        .win-bottom-taskbar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 30px;
          background: #c0c0c0;
          box-shadow: inset 0 1px 0 #ffffff, 0 -1px 0 #808080;
          z-index: 500;
          display: flex;
          align-items: center;
          padding: 2px 4px;
          font-family: 'Tahoma', 'Arial', sans-serif;
          font-size: 11px;
          gap: 2px;
        }

        .win-taskbar-links {
          display: flex;
          align-items: center;
          gap: 2px;
          flex: 1;
        }

        .win-taskbar-app-btn {
          height: 22px;
          padding: 0 10px;
          background: #c0c0c0;
          box-shadow: inset -1px -1px 0 #808080, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #404040, inset 2px 2px 0 #d4d0c8;
          font-size: 11px;
          font-family: 'Tahoma', 'Arial', sans-serif;
          color: #000;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          white-space: nowrap;
          border: none;
        }

        .win-taskbar-app-btn:hover {
          background: #d4d0c8;
          text-decoration: none;
          color: #000;
        }

        .win-taskbar-app-btn:active {
          box-shadow: inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #404040, inset -2px -2px 0 #d4d0c8;
        }

        .win-taskbar-clock {
          background: #c0c0c0;
          box-shadow: inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff;
          padding: 2px 8px;
          font-size: 11px;
          font-family: 'Tahoma', 'Arial', sans-serif;
          color: #000;
          white-space: nowrap;
          margin-left: auto;
          flex-shrink: 0;
        }

        @media (max-width: 480px) {
          .win-taskbar-app-btn span:not(:first-child) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

function WinClock() {
  const [time, setTime] = React.useState(() => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  });

  React.useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }));
    }, 10000);
    return () => clearInterval(id);
  }, []);

  return <span>{time}</span>;
}
