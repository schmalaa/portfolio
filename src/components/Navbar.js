"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const menuItems = [
    { label: "File", links: [{ href: "/", text: "Home" }, { href: "#about", text: "About Me" }] },
    { label: "View", links: [{ href: "#skills", text: "Skills" }, { href: "#projects", text: "Projects" }] },
    { label: "Help", links: [{ href: "#contact", text: "Contact" }, { href: "mailto:alex.schmaltz@gmail.com", text: "Send Email" }] },
  ];

  return (
    <header className="win-taskbar-top" id="main-nav" role="banner">
      {/* Start Button */}
      <button
        className={`win-start-btn ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Start menu"
        aria-expanded={menuOpen}
      >
        <span className="win-logo-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="0" y="0" width="7" height="7" fill="#FF0000" />
            <rect x="9" y="0" width="7" height="7" fill="#00FF00" />
            <rect x="0" y="9" width="7" height="7" fill="#0000FF" />
            <rect x="9" y="9" width="7" height="7" fill="#FFFF00" />
          </svg>
        </span>
        <strong>Start</strong>
      </button>

      {/* Menu bar items */}
      <nav className="win-menubar-top" aria-label="Main navigation">
        {menuItems.map((menu) => (
          <div
            key={menu.label}
            className="win-menu-wrapper"
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              className={`win-menu-top-item ${activeMenu === menu.label ? "active" : ""}`}
              onMouseEnter={() => setActiveMenu(menu.label)}
              onClick={() => setActiveMenu(activeMenu === menu.label ? null : menu.label)}
              aria-haspopup="true"
              aria-expanded={activeMenu === menu.label}
            >
              {menu.label}
            </button>
            {activeMenu === menu.label && (
              <ul className="win-dropdown" role="menu">
                {menu.links.map((link) => (
                  <li key={link.text} role="none">
                    <Link
                      href={link.href}
                      className="win-dropdown-item"
                      role="menuitem"
                      onClick={() => setActiveMenu(null)}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>

      {/* Taskbar tray area */}
      <div className="win-taskbar-tray" aria-label="System tray">
        <button
          className="win-cmd-badge"
          onClick={() => document.dispatchEvent(new CustomEvent("cmdk", { detail: { action: "open-cmd-k" } }))}
          aria-label="Open command palette (Ctrl+K)"
          title="Command Palette (Ctrl+K)"
        >
          Run...
        </button>
        <div className="win-clock" aria-label="Current user: Alex Schmaltz">
          Alex.Schmaltz
        </div>
      </div>

      {/* Start Menu popup */}
      {menuOpen && (
        <div className="win-start-menu" role="menu" aria-label="Start menu">
          <div className="win-start-banner">
            <span className="win-start-name">Alex Schmaltz</span>
          </div>
          <ul className="win-start-list">
            <li><Link href="/" className="win-start-link" onClick={() => setMenuOpen(false)}>
              <span className="win-start-icon" aria-hidden="true">&#x1F4C4;</span> Home
            </Link></li>
            <li><Link href="#about" className="win-start-link" onClick={() => setMenuOpen(false)}>
              <span className="win-start-icon" aria-hidden="true">&#x1F464;</span> About Me
            </Link></li>
            <li><Link href="#skills" className="win-start-link" onClick={() => setMenuOpen(false)}>
              <span className="win-start-icon" aria-hidden="true">&#x1F4BB;</span> Skills
            </Link></li>
            <li><Link href="#projects" className="win-start-link" onClick={() => setMenuOpen(false)}>
              <span className="win-start-icon" aria-hidden="true">&#x1F5C2;&#xFE0F;</span> Projects
            </Link></li>
            <li className="win-start-sep" role="separator"></li>
            <li><Link href="#contact" className="win-start-link" onClick={() => setMenuOpen(false)}>
              <span className="win-start-icon" aria-hidden="true">&#x2709;&#xFE0F;</span> Contact
            </Link></li>
            <li><Link href="https://github.com/schmalaa" target="_blank" rel="noopener noreferrer" className="win-start-link" onClick={() => setMenuOpen(false)}>
              <span className="win-start-icon" aria-hidden="true">&#x1F4C1;</span> GitHub
            </Link></li>
          </ul>
          <div className="win-start-footer">
            <button className="win-shutdown-btn" onClick={() => setMenuOpen(false)} aria-label="Close start menu">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="10" height="10" fill="#c0c0c0" stroke="#808080" strokeWidth="1"/>
                <path d="M4 7 H10 M7 4 V10" stroke="#000" strokeWidth="1.5"/>
              </svg>
              Close
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .win-taskbar-top {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 30px;
          background: #c0c0c0;
          box-shadow: inset 0 -1px 0 #808080, 0 2px 4px rgba(0,0,0,0.3);
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 2px 4px;
          font-family: 'Tahoma', 'Arial', sans-serif;
          font-size: 11px;
        }

        .win-start-btn {
          height: 22px;
          padding: 0 8px;
          background: #c0c0c0;
          border: none;
          font-family: 'Tahoma', 'Arial', sans-serif;
          font-size: 11px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          box-shadow: inset -1px -1px 0 #808080, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #404040, inset 2px 2px 0 #d4d0c8;
          color: #000;
          flex-shrink: 0;
        }

        .win-start-btn:active,
        .win-start-btn.active {
          box-shadow: inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #404040, inset -2px -2px 0 #d4d0c8;
          padding-top: 2px;
          padding-left: 9px;
        }

        .win-logo-icon {
          display: flex;
          align-items: center;
        }

        .win-menubar-top {
          display: flex;
          align-items: center;
          flex: 1;
          height: 100%;
        }

        .win-menu-wrapper {
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
        }

        .win-menu-top-item {
          padding: 2px 8px;
          font-size: 11px;
          font-family: 'Tahoma', 'Arial', sans-serif;
          color: #000;
          background: transparent;
          border: none;
          cursor: pointer;
          height: 100%;
          white-space: nowrap;
        }

        .win-menu-top-item:hover,
        .win-menu-top-item.active {
          background: #000080;
          color: #ffffff;
        }

        .win-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          background: #c0c0c0;
          min-width: 140px;
          box-shadow: inset -1px -1px 0 #808080, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #404040, inset 2px 2px 0 #d4d0c8, 2px 2px 4px rgba(0,0,0,0.4);
          z-index: 1001;
          list-style: none;
          padding: 2px;
        }

        .win-dropdown-item {
          display: block;
          padding: 3px 20px 3px 20px;
          font-size: 11px;
          font-family: 'Tahoma', 'Arial', sans-serif;
          color: #000;
          text-decoration: none;
          white-space: nowrap;
        }

        .win-dropdown-item:hover {
          background: #000080;
          color: #ffffff;
          text-decoration: none;
        }

        .win-taskbar-tray {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-left: auto;
          flex-shrink: 0;
        }

        .win-cmd-badge {
          height: 20px;
          padding: 0 8px;
          background: #c0c0c0;
          border: none;
          font-family: 'Tahoma', 'Arial', sans-serif;
          font-size: 11px;
          cursor: pointer;
          box-shadow: inset -1px -1px 0 #808080, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #404040, inset 2px 2px 0 #d4d0c8;
          color: #000;
        }

        .win-cmd-badge:active {
          box-shadow: inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #404040, inset -2px -2px 0 #d4d0c8;
        }

        .win-clock {
          background: #c0c0c0;
          box-shadow: inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff;
          padding: 2px 8px;
          font-size: 11px;
          font-family: 'Tahoma', 'Arial', sans-serif;
          color: #000;
          white-space: nowrap;
        }

        /* Start Menu */
        .win-start-menu {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 200px;
          background: #c0c0c0;
          box-shadow: inset -1px -1px 0 #808080, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #404040, inset 2px 2px 0 #d4d0c8, 4px 0 8px rgba(0,0,0,0.4);
          z-index: 2000;
          top: 30px;
          bottom: auto;
        }

        .win-start-banner {
          background: linear-gradient(to bottom, #000080, #1084d0);
          padding: 8px 12px;
          writing-mode: vertical-lr;
          transform: rotate(180deg);
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 28px;
          display: flex;
          align-items: center;
        }

        .win-start-name {
          color: #ffffff;
          font-size: 14px;
          font-weight: bold;
          font-family: 'Tahoma', 'Arial', sans-serif;
          opacity: 0.8;
          letter-spacing: 2px;
        }

        .win-start-list {
          margin-left: 28px;
          padding: 4px 0;
          list-style: none;
        }

        .win-start-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 5px 12px;
          font-size: 11px;
          font-family: 'Tahoma', 'Arial', sans-serif;
          color: #000;
          text-decoration: none;
          cursor: pointer;
        }

        .win-start-link:hover {
          background: #000080;
          color: #ffffff;
          text-decoration: none;
        }

        .win-start-icon {
          font-size: 14px;
          width: 20px;
          text-align: center;
        }

        .win-start-sep {
          height: 1px;
          background: #808080;
          margin: 2px 8px;
          box-shadow: 0 1px 0 #ffffff;
        }

        .win-start-footer {
          border-top: 1px solid #808080;
          box-shadow: 0 -1px 0 #ffffff inset;
          padding: 4px 8px;
          margin-left: 28px;
          display: flex;
          justify-content: flex-end;
        }

        .win-shutdown-btn {
          height: 22px;
          padding: 0 8px;
          background: #c0c0c0;
          border: none;
          box-shadow: inset -1px -1px 0 #808080, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #404040, inset 2px 2px 0 #d4d0c8;
          font-size: 11px;
          font-family: 'Tahoma', 'Arial', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          color: #000;
        }

        .win-shutdown-btn:active {
          box-shadow: inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #404040, inset -2px -2px 0 #d4d0c8;
        }

        @media (max-width: 600px) {
          .win-menubar-top { display: none; }
        }
      `}</style>
    </header>
  );
}
