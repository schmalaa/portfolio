"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="main-nav">
      <div className="nav-content">
        <Link href="/" className="logo">
          Alex<span className="accent">.Schmaltz</span>
        </Link>
        <ul
          className="nav-links"
          style={{ display: menuOpen ? "flex" : "", flexDirection: menuOpen ? "column" : "" }}
        >
          <li><Link href="#about">About</Link></li>
          <li><Link href="#skills">Skills</Link></li>
          <li><Link href="#projects">Work</Link></li>
          <li><Link href="#contact" className="btn-primary-small">Contact</Link></li>
        </ul>
        <button
          className="mobile-menu-btn"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: var(--nav-height);
          z-index: 100;
          transition: var(--transition-normal);
          background: transparent;
          border-bottom: 1px solid transparent;
        }
        .navbar.scrolled {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          border-bottom: var(--glass-border);
          box-shadow: var(--glass-shadow);
          height: calc(var(--nav-height) - 10px);
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          height: 100%;
        }
        .logo {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: -0.5px;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-links li a:not(.btn-primary-small) {
          font-size: 0.9rem;
          font-family: var(--font-heading);
          color: var(--clr-text-main);
          position: relative;
        }
        .nav-links li a:not(.btn-primary-small)::after {
          content: '';
          position: absolute;
          bottom: -5px; left: 0;
          width: 0; height: 2px;
          background: var(--clr-primary);
          transition: width var(--transition-normal);
        }
        .nav-links li a:not(.btn-primary-small):hover::after {
          width: 100%;
        }
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 101;
        }
        .mobile-menu-btn span {
          display: block;
          width: 25px;
          height: 2px;
          background: var(--clr-text-main);
          margin: 5px 0;
          transition: 0.3s;
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .mobile-menu-btn { display: block; }
          .nav-links[style*="display: flex"] {
            position: absolute;
            top: var(--nav-height);
            left: 0;
            width: 100%;
            background: var(--glass-bg);
            backdrop-filter: blur(12px);
            padding: 20px 0;
            gap: 20px;
            border-bottom: var(--glass-border);
          }
        }
      `}</style>
    </nav>
  );
}
