"use client";

import { useEffect, useRef, useState } from "react";
import ProjectSlider from "@/components/ProjectSlider";
import GitHubMetrics from "@/components/GitHubMetrics";
import MediumFeed from "@/components/MediumFeed";

/* ---- Win2K Window component ---- */
function WinWindow({ title, icon, children, defaultWidth, className = "", id = "" }) {
  return (
    <div className={`win-window-outer ${className}`} id={id}>
      {/* Title bar */}
      <div className="win-titlebar" role="heading" aria-level="2">
        <span className="win-titlebar-title">
          {icon && <img src={icon} alt="" aria-hidden="true" className="win-titlebar-icon" width="16" height="16" />}
          {title}
        </span>
        <span className="win-titlebar-controls" aria-hidden="true">
          <button className="win-btn" title="Minimize" tabIndex="-1">_</button>
          <button className="win-btn" title="Maximize" tabIndex="-1">□</button>
          <button className="win-btn win-btn-close" title="Close" tabIndex="-1">✕</button>
        </span>
      </div>
      {/* Menu bar */}
      <div className="win-menubar" role="menubar" aria-label={`${title} menu`}>
        <span className="win-menu-item">File</span>
        <span className="win-menu-item">Edit</span>
        <span className="win-menu-item">View</span>
        <span className="win-menu-item">Help</span>
      </div>
      {/* Content */}
      <div className="win-window-body">
        {children}
      </div>
      {/* Status bar */}
      <div className="win-statusbar" role="status">
        <span className="win-statusbar-pane">Ready</span>
        <span className="win-statusbar-pane">alexschmaltz.com</span>
      </div>

      <style jsx>{`
        .win-window-outer {
          background: #c0c0c0;
          box-shadow: inset -1px -1px 0 #404040, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #d4d0c8, 4px 4px 10px rgba(0,0,0,0.4);
          margin-bottom: 16px;
          max-width: ${defaultWidth || "100%"};
          width: 100%;
        }
        .win-window-body {
          padding: 8px;
          background: #c0c0c0;
        }
      `}</style>
    </div>
  );
}

/* ---- IE-style browser window ---- */
function BrowserWindow({ url, title, children }) {
  return (
    <div className="ie-window">
      <div className="ie-titlebar">
        <span className="ie-title">
          <svg width="14" height="14" viewBox="0 0 32 32" aria-hidden="true" style={{ marginRight: 4 }}>
            <circle cx="16" cy="16" r="14" fill="#0078d7" />
            <path d="M10 16 Q16 6 22 16 Q16 26 10 16Z" fill="white" />
            <ellipse cx="16" cy="16" rx="14" ry="6" fill="none" stroke="white" strokeWidth="1.5" />
          </svg>
          {title} - Microsoft Internet Explorer
        </span>
        <span className="ie-controls" aria-hidden="true">
          <button className="win-btn" tabIndex="-1">_</button>
          <button className="win-btn" tabIndex="-1">□</button>
          <button className="win-btn win-btn-close" tabIndex="-1">✕</button>
        </span>
      </div>
      <div className="ie-menubar">
        <span className="win-menu-item">File</span>
        <span className="win-menu-item">Edit</span>
        <span className="win-menu-item">View</span>
        <span className="win-menu-item">Favorites</span>
        <span className="win-menu-item">Tools</span>
        <span className="win-menu-item">Help</span>
      </div>
      <div className="ie-toolbar">
        <button className="win-toolbar-btn" aria-label="Back">◄ Back</button>
        <button className="win-toolbar-btn" aria-label="Forward">Forward ►</button>
        <button className="win-toolbar-btn" aria-label="Stop">Stop</button>
        <button className="win-toolbar-btn" aria-label="Refresh">Refresh</button>
        <button className="win-toolbar-btn" aria-label="Home">Home</button>
        <span className="win-toolbar-sep" aria-hidden="true"></span>
        <button className="win-toolbar-btn" aria-label="Search">Search</button>
        <button className="win-toolbar-btn" aria-label="Favorites">Favorites</button>
      </div>
      <div className="ie-address-bar">
        <label className="win-address-label" htmlFor="ie-url-bar">Address</label>
        <input
          id="ie-url-bar"
          className="win-address-input"
          type="text"
          value={url}
          readOnly
          aria-label={`Current URL: ${url}`}
        />
        <button className="win-toolbar-btn" aria-label="Go">Go</button>
      </div>
      <div className="ie-content">
        {children}
      </div>
      <div className="ie-statusbar" role="status">
        <span className="win-statusbar-pane" style={{ flex: 1 }}>Done</span>
        <span className="win-statusbar-pane" aria-label="Security zone">Internet</span>
      </div>

      <style jsx>{`
        .ie-window {
          background: #c0c0c0;
          box-shadow: inset -1px -1px 0 #404040, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #d4d0c8, 6px 6px 16px rgba(0,0,0,0.4);
          margin-bottom: 16px;
          width: 100%;
        }
        .ie-titlebar {
          background: linear-gradient(to right, #000080, #1084d0);
          color: #fff;
          padding: 3px 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 21px;
          user-select: none;
        }
        .ie-title {
          font-size: 11px;
          font-weight: bold;
          font-family: 'Tahoma', 'Arial', sans-serif;
          display: flex;
          align-items: center;
        }
        .ie-controls {
          display: flex;
          gap: 2px;
        }
        .ie-menubar {
          background: #c0c0c0;
          padding: 2px 4px;
          display: flex;
          gap: 0;
          border-bottom: 1px solid #808080;
        }
        .ie-toolbar {
          background: #c0c0c0;
          padding: 2px 4px;
          display: flex;
          align-items: center;
          gap: 2px;
          border-bottom: 1px solid #808080;
          flex-wrap: wrap;
        }
        .ie-address-bar {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 2px 4px;
          background: #c0c0c0;
          border-bottom: 1px solid #808080;
        }
        .ie-content {
          padding: 16px;
          background: #ffffff;
          min-height: 200px;
        }
        .ie-statusbar {
          background: #c0c0c0;
          padding: 2px 8px;
          font-size: 11px;
          color: #444;
          border-top: 1px solid #808080;
          display: flex;
          gap: 4px;
          align-items: center;
          font-family: 'Tahoma', 'Arial', sans-serif;
        }
      `}</style>
    </div>
  );
}

/* ---- Reveal wrapper ---- */
function RevealWrapper({ children, animation = "reveal-up", delay = "", className = "", style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add("active"); },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`${animation} ${delay} ${className}`.trim()} style={style}>{children}</div>;
}

/* ---- Skill list item ---- */
function SkillItem({ name }) {
  return (
    <li className="skill-item">
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="14" height="14" rx="0" fill="#c0c0c0" 
          style={{filter: "drop-shadow(inset -1px -1px 0 #808080) drop-shadow(inset 1px 1px 0 #fff)"}} />
        <polyline points="3,8 6,12 13,4" stroke="#000080" strokeWidth="2" fill="none" />
      </svg>
      {name}
      <style jsx>{`
        .skill-item {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 2px 4px;
          font-size: 11px;
          color: #000;
          font-family: 'Tahoma', 'Arial', sans-serif;
        }
        .skill-item:hover {
          background: #000080;
          color: #fff;
        }
      `}</style>
    </li>
  );
}

/* ---- Main Page ---- */
export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      {/* Hero / Welcome Dialog */}
      <section id="home" className="hero-section" aria-labelledby="hero-title">
        <RevealWrapper>
          <BrowserWindow url="http://www.alexschmaltz.com/" title="Alex Schmaltz - Portfolio">
            <div className="hero-inner">
              <div className="hero-text-area">
                <p className="hero-greeting">Welcome to</p>
                <h1 id="hero-title" className="hero-name">Alex Schmaltz</h1>
                <h2 className="hero-subtitle">Software Engineer &amp; Web Developer</h2>
                <p className="hero-desc">
                  I&apos;m a software engineer and web developer specializing in building exceptional
                  digital experiences. Currently focused on building accessible, human-centered products.
                </p>
                <div className="hero-cta-row">
                  <a href="#projects" className="btn-primary">View My Work</a>
                  <a href="#contact" className="btn-primary">Contact Me</a>
                  <button className="btn-primary" onClick={() => setDialogOpen(true)}>Learn More...</button>
                </div>
              </div>
              <div className="hero-sidebar">
                <div className="win-groupbox" style={{ marginTop: 0 }}>
                  <span className="win-groupbox-title">Quick Links</span>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {[
                      { href: "#about", label: "About Me" },
                      { href: "#skills", label: "Skills" },
                      { href: "#projects", label: "Projects" },
                      { href: "#contact", label: "Contact" },
                      { href: "https://github.com/schmalaa", label: "GitHub" },
                      { href: "https://medium.com/@schmalaa", label: "Medium Blog" },
                    ].map((item) => (
                      <li key={item.href} className="win-listview-row">
                        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" style={{ flexShrink: 0 }}>
                          <polygon points="2,1 10,6 2,11" fill="#000080" />
                        </svg>
                        <a href={item.href} style={{ color: "#000080", textDecoration: "underline", fontSize: "11px" }}>{item.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="win-groupbox">
                  <span className="win-groupbox-title">Status</span>
                  <p style={{ fontSize: "11px", marginBottom: 6 }}>
                    <strong>Available for:</strong><br />
                    Freelance &amp; Full-time
                  </p>
                  <div className="win-progress-bar" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" aria-label="Availability: 85%">
                    <div className="win-progress-fill" style={{ width: "85%" }}>
                      <span style={{ color: "#fff", fontSize: "10px" }}>85%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BrowserWindow>
        </RevealWrapper>
      </section>

      {/* "Learn More" dialog */}
      {dialogOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 900,
            background: "rgba(0,0,0,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}
          onClick={() => setDialogOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="About Alex dialog"
        >
          <div
            style={{
              background: "#c0c0c0",
              boxShadow: "inset -1px -1px 0 #404040, inset 1px 1px 0 #fff, inset -2px -2px 0 #808080, inset 2px 2px 0 #d4d0c8, 4px 4px 10px rgba(0,0,0,0.5)",
              width: 380,
              fontFamily: "'Tahoma','Arial',sans-serif",
              fontSize: 11,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="win-titlebar">
              <span className="win-titlebar-title">About Alex Schmaltz</span>
              <span className="win-titlebar-controls">
                <button className="win-btn win-btn-close" onClick={() => setDialogOpen(false)} aria-label="Close dialog">✕</button>
              </span>
            </div>
            <div style={{ padding: 16, display: "flex", gap: 12 }}>
              <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" style={{ flexShrink: 0 }}>
                <circle cx="16" cy="10" r="8" fill="#000080" />
                <rect x="4" y="22" width="24" height="8" rx="2" fill="#000080" />
              </svg>
              <div>
                <p style={{ marginBottom: 8 }}>
                  <strong>Alex Schmaltz</strong> is a passionate web developer with a keen eye for 
                  modern design and robust architecture.
                </p>
                <p style={{ color: "#444" }}>
                  His journey started with Dreamweaver on a school computer, which taught him HTML &amp; CSS the wrong way — 
                  and he&apos;s been correcting it ever since.
                </p>
              </div>
            </div>
            <div style={{ borderTop: "1px solid #808080", padding: "8px 16px", display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button className="btn-primary" onClick={() => setDialogOpen(false)}>OK</button>
            </div>
          </div>
        </div>
      )}

      {/* About Section */}
      <section id="about" aria-labelledby="about-heading">
        <RevealWrapper delay="delay-1">
          <WinWindow title="About Me - Notepad" id="about-window">
            <div className="about-content">
              <div style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 4, borderBottom: "1px solid #808080", paddingBottom: 6 }}>
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                  <rect x="1" y="1" width="14" height="14" fill="#ffffff" stroke="#808080" />
                  <line x1="3" y1="4" x2="13" y2="4" stroke="#000" strokeWidth="1" />
                  <line x1="3" y1="7" x2="13" y2="7" stroke="#000" strokeWidth="1" />
                  <line x1="3" y1="10" x2="9" y2="10" stroke="#000" strokeWidth="1" />
                </svg>
                <h2 id="about-heading" style={{ fontSize: 11, fontWeight: "bold" }}>
                  <span style={{ color: "#000080" }}>01.</span> About Me
                </h2>
              </div>
              <div className="about-textarea">
                <p>Hello! I&apos;m Alex Schmaltz, a passionate web developer with a keen eye for modern design and robust architecture.</p>
                <br />
                <p>My journey in web development started back when I found Dreamweaver installed on a school computer, which taught me a lot about HTML &amp; CSS (the wrong way)!</p>
                <br />
                <p>Fast-forward to today, and I&apos;ve had the privilege of working on varying projects, focusing on delivering high-quality, impactful solutions. I thrive in environments where I can combine my technical skills with creative problem-solving.</p>
              </div>
            </div>
          </WinWindow>
        </RevealWrapper>
      </section>

      {/* Skills Section */}
      <section id="skills" aria-labelledby="skills-heading">
        <RevealWrapper delay="delay-2">
          <WinWindow title="My Arsenal - Windows Explorer" id="skills-window">
            <h2 id="skills-heading" style={{ fontSize: 11, fontWeight: "bold", marginBottom: 8 }}>
              <span style={{ color: "#000080" }}>02.</span> My Arsenal
            </h2>
            <div className="skills-content">
              <div className="win-groupbox" style={{ marginTop: 0, flex: 1 }}>
                <span className="win-groupbox-title">Frontend</span>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {["HTML5 & CSS3", "JavaScript (ES6+)", "React / Next.js", "TypeScript", "Angular"].map(s => (
                    <SkillItem key={s} name={s} />
                  ))}
                </ul>
              </div>
              <div className="win-groupbox" style={{ marginTop: 0, flex: 1 }}>
                <span className="win-groupbox-title">Backend</span>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {["Node.js", "Go", "Python", "RESTful APIs", "PHP"].map(s => (
                    <SkillItem key={s} name={s} />
                  ))}
                </ul>
              </div>
              <div className="win-groupbox" style={{ marginTop: 0, flex: 1 }}>
                <span className="win-groupbox-title">Database &amp; Tools</span>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {["PostgreSQL / MongoDB", "Git & GitHub", "Linux", "Figma", "AWS"].map(s => (
                    <SkillItem key={s} name={s} />
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ marginTop: 16, borderTop: "1px solid #808080", paddingTop: 12 }}>
              <h3 style={{ fontSize: 11, fontWeight: "bold", marginBottom: 8 }}>GitHub Impact</h3>
              <GitHubMetrics username="schmalaa" />
            </div>

            <div style={{ marginTop: 16, borderTop: "1px solid #808080", paddingTop: 12 }}>
              <h3 style={{ fontSize: 11, fontWeight: "bold", marginBottom: 8 }}>Latest Insights</h3>
              <MediumFeed username="schmalaa" />
            </div>
          </WinWindow>
        </RevealWrapper>
      </section>

      {/* Projects Section */}
      <section id="projects" aria-labelledby="projects-heading">
        <RevealWrapper delay="delay-3">
          <WinWindow title="Featured Projects - Windows Explorer" id="projects-window">
            <h2 id="projects-heading" style={{ fontSize: 11, fontWeight: "bold", marginBottom: 12 }}>
              <span style={{ color: "#000080" }}>03.</span> Featured Projects
            </h2>

            <ProjectCard
              title="LeadRevival"
              url="https://getleadrevival.ai"
              desc="A full-stack SaaS platform for reviving stale leads for businesses. Utilizes AI to analyze and re-engage leads, increasing conversion rates."
              tech={["Next.js", "Node.js", "Stripe", "PostgreSQL"]}
              images={[
                { src: "/leadrevival.jpg", alt: "LeadRevival main dashboard view" },
                { src: "/dashboard.jpg", alt: "LeadRevival analytics overview" },
                { src: "/leads-table.jpg", alt: "LeadRevival detailed leads table" },
                { src: "/email-composer.jpg", alt: "LeadRevival AI email composer" },
              ]}
            />

            <ProjectCard
              title="Bolt Design System"
              url="https://bolt.nationwide.com"
              desc="A comprehensive design system for Nationwide Insurance, providing a consistent and accessible visual language for all digital products."
              tech={["TypeScript", "SASS", "Storybook", "Figma"]}
              images={[
                { src: "/bolt-home.jpg", alt: "Bolt Design System homepage" },
                { src: "/bolt-button.jpg", alt: "Bolt Design System interactive button component" },
              ]}
            />

            <ProjectCard
              title="Codebase Architect"
              url="https://codebase-architect.vercel.app/"
              desc="A Next.js application that visualizes GitHub repositories with React Flow and explains code files using an AI agent."
              tech={["Next.js", "React Flow", "AI SDK", "GitHub API", "Open Source"]}
              images={[
                { src: "/homepage.jpg", alt: "Codebase Architect homepage" },
                { src: "/agent-answer.jpg", alt: "Codebase Architect AI agent" },
              ]}
            />

            <ProjectCard
              title="Synapse Snake"
              url="https://www.synapse-snake.com/"
              desc="A high-stakes, balanced rogue-lite survival game. Features exponential enemy scaling, a dynamic boss spawn system, and unique hero attacks."
              tech={["React", "Vite", "Web Audio API", "Canvas"]}
              images={[
                { src: "/synapse-snake-new-1.png", alt: "Synapse Snake gameplay" },
                { src: "/synapse-snake-new-2.png", alt: "Synapse Snake character selection" },
              ]}
            />
          </WinWindow>
        </RevealWrapper>
      </section>

      {/* Contact Section */}
      <section id="contact" aria-labelledby="contact-heading">
        <RevealWrapper delay="delay-4">
          <WinWindow title="Contact - Send Message" id="contact-window">
            <h2 id="contact-heading" style={{ fontSize: 11, fontWeight: "bold", marginBottom: 8 }}>
              <span style={{ color: "#000080" }}>04.</span> Get In Touch
            </h2>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true" style={{ flexShrink: 0 }}>
                <rect x="4" y="10" width="40" height="28" rx="2" fill="#ffffff" stroke="#808080" strokeWidth="2" />
                <polyline points="4,10 24,28 44,10" fill="none" stroke="#000080" strokeWidth="2" />
                <line x1="4" y1="38" x2="18" y2="24" stroke="#808080" strokeWidth="1.5" />
                <line x1="44" y1="38" x2="30" y2="24" stroke="#808080" strokeWidth="1.5" />
              </svg>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: "bold", marginBottom: 4 }}>What&apos;s Next?</p>
                <p style={{ fontSize: 11, color: "#444", marginBottom: 12 }}>
                  Although I&apos;m not currently looking for any new opportunities, my inbox is always open. 
                  Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                </p>
                <div style={{ marginBottom: 8 }}>
                  <label style={{ fontSize: 11, display: "block", marginBottom: 2 }} htmlFor="contact-email">Your Email:</label>
                  <input id="contact-email" type="email" className="win-text-field" placeholder="you@example.com" style={{ width: "100%", marginBottom: 8 }} />
                  <label style={{ fontSize: 11, display: "block", marginBottom: 2 }} htmlFor="contact-msg">Message:</label>
                  <textarea
                    id="contact-msg"
                    className="win-text-field"
                    rows={4}
                    placeholder="Type your message here..."
                    style={{ width: "100%", resize: "vertical", marginBottom: 8 }}
                  />
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <a href="mailto:alex.schmaltz@gmail.com" className="btn-primary">Send Email</a>
                  <a href="mailto:alex.schmaltz@gmail.com" className="btn-primary">Say Hello</a>
                </div>
              </div>
            </div>
          </WinWindow>
        </RevealWrapper>
      </section>

      <style jsx>{`
        /* Hero layout */
        .hero-section { padding-top: 0; }
        .hero-inner {
          display: grid;
          grid-template-columns: 1fr 200px;
          gap: 12px;
          align-items: flex-start;
          background: #ffffff;
          padding: 12px;
        }
        .hero-greeting {
          font-size: 11px;
          color: #444;
          margin-bottom: 4px;
        }
        .hero-name {
          font-size: 28px;
          font-weight: bold;
          color: #000080;
          margin-bottom: 4px;
          line-height: 1.1;
        }
        .hero-subtitle {
          font-size: 16px;
          font-weight: bold;
          color: #000;
          margin-bottom: 8px;
        }
        .hero-desc {
          font-size: 11px;
          color: #444;
          margin-bottom: 12px;
          max-width: 480px;
          line-height: 1.5;
        }
        .hero-cta-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .hero-sidebar {
          min-width: 0;
        }

        /* About */
        .about-content { padding: 4px; }
        .about-textarea {
          background: #ffffff;
          box-shadow: inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #404040, inset -2px -2px 0 #d4d0c8;
          padding: 8px;
          font-size: 11px;
          color: #000;
          line-height: 1.6;
          min-height: 120px;
          font-family: 'Courier New', monospace;
        }

        /* Skills */
        .skills-content {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .hero-inner {
            grid-template-columns: 1fr;
          }
          .hero-sidebar { display: none; }
          .skills-content { flex-direction: column; }
          .hero-name { font-size: 20px; }
          .hero-subtitle { font-size: 13px; }
        }
      `}</style>
    </>
  );
}

/* ---- Project card as Win2K dialog ---- */
function ProjectCard({ title, url, desc, tech, images }) {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`proj-card ${active ? "active" : ""}`}
      onClick={() => setActive(!active)}
      role="article"
    >
      <div className="proj-card-header">
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <rect x="1" y="1" width="14" height="14" fill="#c0c0c0"
            style={{ filter: "drop-shadow(inset -1px -1px 0 #808080) drop-shadow(inset 1px 1px 0 #fff)" }} />
          <rect x="2" y="2" width="7" height="5" fill="#000080" />
          <rect x="10" y="2" width="3" height="3" fill="#c0c0c0"
            style={{ filter: "drop-shadow(inset -1px -1px 0 #808080) drop-shadow(inset 1px 1px 0 #fff)" }} />
          <rect x="2" y="9" width="12" height="2" fill="#808080" />
          <rect x="2" y="12" width="8" height="2" fill="#808080" />
        </svg>
        <span className="proj-title">
          {title}
          <span className="proj-overline"> — Featured Project</span>
        </span>
        <span className="proj-expand" aria-label={active ? "Collapse" : "Expand"}>{active ? "▲" : "▼"}</span>
      </div>

      {active && (
        <div className="proj-body">
          <div className="proj-layout">
            <div className="proj-info">
              <p className="proj-desc">{desc}</p>
              <div className="proj-tech">
                {tech.map(t => (
                  <span key={t} className="proj-tech-tag">{t}</span>
                ))}
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8 }}
                onClick={(e) => e.stopPropagation()}
                aria-label={`Visit ${title} website`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Visit Site
              </a>
            </div>
            <div className="proj-slider-wrap">
              <ProjectSlider images={images} />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .proj-card {
          background: #c0c0c0;
          box-shadow: inset -1px -1px 0 #808080, inset 1px 1px 0 #ffffff;
          margin-bottom: 4px;
          cursor: pointer;
          font-family: 'Tahoma', 'Arial', sans-serif;
          font-size: 11px;
        }
        .proj-card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 8px;
          background: #c0c0c0;
          user-select: none;
        }
        .proj-card.active .proj-card-header {
          background: #000080;
          color: #ffffff;
        }
        .proj-card.active .proj-card-header * {
          color: #ffffff;
        }
        .proj-title {
          font-weight: bold;
          font-size: 11px;
          flex: 1;
        }
        .proj-overline {
          font-weight: normal;
          color: #444;
          font-size: 10px;
        }
        .proj-card.active .proj-overline {
          color: #aac4ff;
        }
        .proj-expand {
          font-size: 9px;
          color: #444;
          flex-shrink: 0;
        }
        .proj-body {
          padding: 8px;
          background: #c0c0c0;
          border-top: 1px solid #808080;
          cursor: default;
        }
        .proj-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          align-items: flex-start;
        }
        .proj-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .proj-desc {
          font-size: 11px;
          color: #000;
          line-height: 1.5;
          background: #ffffff;
          box-shadow: inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #404040;
          padding: 6px 8px;
        }
        .proj-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .proj-tech-tag {
          background: #c0c0c0;
          box-shadow: inset -1px -1px 0 #808080, inset 1px 1px 0 #ffffff;
          padding: 1px 6px;
          font-size: 10px;
          font-family: 'Courier New', monospace;
          color: #000080;
        }
        .proj-slider-wrap {
          background: #000;
          box-shadow: inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #404040;
          min-height: 200px;
          overflow: hidden;
        }
        @media (max-width: 600px) {
          .proj-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
