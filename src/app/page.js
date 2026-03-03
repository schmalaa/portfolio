"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Hero3DElement from "@/components/Hero3DElement";
import Profile3D from "@/components/Profile3D";
import ProjectSlider from "@/components/ProjectSlider";
import GitHubGraph3D from "@/components/GitHubGraph3D";

function RevealWrapper({ children, animation = "reveal-up", delay = "", className = "", style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`${animation} ${delay} ${className}`.trim()} style={style}>{children}</div>;
}

export default function Home() {
  return (
    <>
      <section id="home" className="hero section-spacing">
        <div className="hero-content">
          <RevealWrapper><p className="greeting">Hi, my name is</p></RevealWrapper>
          <RevealWrapper delay="delay-1"><h1 className="hero-title">Alex.</h1></RevealWrapper>
          <RevealWrapper delay="delay-2"><h1 className="hero-subtitle">I build things.</h1></RevealWrapper>
          <RevealWrapper delay="delay-3">
            <p className="hero-desc">
              I'm a software engineer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products.
            </p>
          </RevealWrapper>
          <RevealWrapper delay="delay-4">
            <div className="hero-cta"><a href="#projects" className="btn-primary">Check out my work</a></div>
          </RevealWrapper>
        </div>
        <RevealWrapper
          animation="reveal-fade"
          delay="delay-5"
          style={{
            flex: 1,
            width: '100%',
            height: '400px',
            minHeight: '400px',
            position: 'relative',
            display: 'block'
          }}
        >
          <div className="hero-image-container" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <Hero3DElement />
          </div>
        </RevealWrapper>
      </section>

      <section id="about" className="about section-spacing">
        <RevealWrapper><h2 className="section-heading"><span className="heading-number">01.</span> About Me</h2></RevealWrapper>
        <div className="about-content">
          <RevealWrapper delay="delay-1">
            <div className="about-text glass-panel">
              <p>Hello! I'm Alex, a passionate web developer with a keen eye for modern design and robust architecture.</p>
              <p>My journey in web development started back when I found dreamweaver installed on a school computer, which taught me a lot about HTML & CSS (the wrong way)!</p>
              <p>Fast-forward to today, and I've had the privilege of working on varying projects, focusing on delivering high-quality, impactful solutions. I thrive in environments where I can combine my technical skills with creative problem-solving.</p>
            </div>
          </RevealWrapper>
          <RevealWrapper delay="delay-2">
            <div className="profile-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Profile3D />
            </div>
          </RevealWrapper>
        </div>
      </section>

      <section id="skills" className="skills section-spacing">
        <RevealWrapper><h2 className="section-heading"><span className="heading-number">02.</span> My Arsenal</h2></RevealWrapper>
        <div className="skills-grid">
          <RevealWrapper delay="delay-1">
            <div className="skill-category glass-card">
              <h3>Frontend</h3>
              <ul className="skill-list">
                <li>HTML5 & CSS3</li>
                <li>JavaScript (ES6+)</li>
                <li>React / Next.js</li>
                <li>TypeScript</li>
                <li>Angular</li>
              </ul>
            </div>
          </RevealWrapper>
          <RevealWrapper delay="delay-2">
            <div className="skill-category glass-card">
              <h3>Backend</h3>
              <ul className="skill-list">
                <li>Node.js</li>
                <li>Go</li>
                <li>Python</li>
                <li>RESTful APIs</li>
                <li>PHP</li>
              </ul>
            </div>
          </RevealWrapper>
          <RevealWrapper delay="delay-3">
            <div className="skill-category glass-card">
              <h3>Database & Tools</h3>
              <ul className="skill-list">
                <li>PostgreSQL / MongoDB</li>
                <li>Git & GitHub</li>
                <li>Linux</li>
                <li>Figma</li>
                <li>AWS</li>
              </ul>
            </div>
          </RevealWrapper>
        </div>

        <div style={{ marginTop: "60px" }}>
          <RevealWrapper delay="delay-4">
            <GitHubGraph3D username="schmalaa" />
          </RevealWrapper>
        </div>
      </section>

      <section id="projects" className="projects section-spacing">
        <RevealWrapper><h2 className="section-heading"><span className="heading-number">03.</span> Featured Projects</h2></RevealWrapper>
        <div className="project-list">

          <RevealWrapper delay="delay-1">
            <article className="project-card">
              <div className="project-content glass-panel">
                <p className="project-overline">Featured Project</p>
                <h3 className="project-title">LeadRevival</h3>
                <div className="project-description">
                  <p>A full-stack SaaS platform for reviving stale leads for businesses. Utilizes AI to analyze and re-engage leads, increasing conversion rates.</p>
                </div>
                <ul className="project-tech-list">
                  <li>Next.js</li><li>Node.js</li><li>Stripe</li><li>PostgreSQL</li>
                </ul>
              </div>
              <div className="project-image glass-panel" style={{ padding: 0 }}>
                <ProjectSlider images={[
                  "/leadrevival.jpg",
                  "/dashboard.jpg",
                  "/leads-table.jpg",
                  "/email-composer.jpg"
                ]} />
              </div>
            </article>
          </RevealWrapper>

          <RevealWrapper delay="delay-2">
            <article className="project-card reverse">
              <div className="project-content glass-panel">
                <p className="project-overline">Featured Project</p>
                <h3 className="project-title">Bolt Design System</h3>
                <div className="project-description">
                  <p>A comprehensive design system for Nationwide Insurance, providing a consistent and accessible visual language for all digital products.</p>
                </div>
                <ul className="project-tech-list">
                  <li>TypeScript</li><li>SASS</li><li>Storybook</li><li>Figma</li>
                </ul>
              </div>
              <div className="project-image glass-panel" style={{ padding: 0 }}>
                <ProjectSlider images={[
                  "/bolt-home.jpg",
                  "/bolt-button.jpg"
                ]} />
              </div>
            </article>
          </RevealWrapper>
        </div>
      </section>

      <RevealWrapper>
        <section id="contact" className="contact section-spacing">
          <h2 className="section-heading" style={{ justifyContent: 'center' }}><span className="heading-number">04.</span> What's Next?</h2>
          <h2 className="contact-title">Get In Touch</h2>
          <p className="contact-text">
            Although I'm not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <a href="mailto:hello@example.com" className="btn-primary contact-btn">Say Hello</a>
        </section>
      </RevealWrapper>

      <style jsx>{`
        /* Scoped styles referencing globals.css variables */
        
        /* Hero Section */
        .hero { flex-direction: row; align-items: center; justify-content: space-between; }
        .hero-content { flex: 1; max-width: 600px; }
        .greeting { color: var(--clr-primary); font-family: var(--font-heading); font-weight: 600; margin-bottom: 20px; font-size: clamp(16px, 2vw, 20px); }
        .hero-title { font-size: clamp(40px, 8vw, 80px); line-height: 1; color: var(--clr-text-main); }
        .hero-subtitle { font-size: clamp(30px, 6vw, 60px); line-height: 1; color: var(--clr-text-muted); margin-top: 10px; margin-bottom: 30px; }
        .hero-desc { color: var(--clr-text-muted); font-size: 1.1rem; max-width: 500px; margin-bottom: 50px; }
        
        /* About */
        .about-content { display: grid; grid-template-columns: 3fr 2fr; gap: 50px; align-items: center; }
        .about-text { padding: 30px; border-radius: 12px; font-size: 1.05rem; }
        .about-text p { margin-bottom: 15px; color: var(--clr-text-muted); }
        .profile-container { position: relative; width: 100%; max-width: 400px; margin: 0 auto; min-height: 400px; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); }

        /* Skills */
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
        .skill-category { padding: 30px; border-radius: 16px; transition: transform var(--transition-normal), box-shadow var(--transition-normal); }
        .skill-category:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5), 0 0 20px var(--clr-primary-glow); border-color: rgba(124, 58, 237, 0.3); }
        .skill-category h3 { font-size: 1.5rem; margin-bottom: 20px; color: var(--clr-text-main); position: relative; display: inline-block; }
        .skill-category h3::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 30px; height: 2px; background: var(--clr-secondary); }
        .skill-list li { margin-bottom: 10px; color: var(--clr-text-muted); display: flex; align-items: center; }
        .skill-list li::before { content: '▹'; color: var(--clr-primary); margin-right: 10px; font-size: 1.2rem; }

        /* Projects */
        .project-list { display: flex; flex-direction: column; gap: 80px; }
        .project-card { position: relative; display: grid; grid-template-columns: repeat(12, 1fr); align-items: center; gap: 40px; }
        .project-content { grid-column: 1 / 7; grid-row: 1 / -1; padding: 40px; border-radius: 16px; z-index: 2; position: relative; }
        .project-image { grid-column: 7 / -1; grid-row: 1 / -1; position: relative; z-index: 1; border-radius: 12px; height: 100%; min-height: 350px; overflow: hidden; background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01)); display: flex; align-items: center; justify-content: center; transition: var(--transition-normal); }
        .image-placeholder { color: var(--clr-text-muted); font-family: var(--font-heading); font-size: 1.1rem; opacity: 0.5; }
        .project-card:hover .project-image { transform: scale(1.02); }
        .project-card.reverse .project-content { grid-column: 7 / -1; text-align: right; }
        .project-card.reverse .project-image { grid-column: 1 / 7; }
        .project-card.reverse .project-tech-list { justify-content: flex-end; }
        .project-overline { color: var(--clr-primary); font-family: var(--font-heading); font-size: 0.9rem; font-weight: 600; margin-bottom: 10px; }
        .project-title { font-size: clamp(24px, 4vw, 32px); margin-bottom: 20px; }
        .project-description { background: rgba(10, 10, 15, 0.7); padding: 25px; border-radius: 8px; color: var(--clr-text-muted); font-size: 1.05rem; margin-bottom: 20px; box-shadow: 0 10px 30px -15px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.05); }
        .project-tech-list { display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 20px; font-family: var(--font-heading); font-size: 0.9rem; color: var(--clr-text-accent); }

        /* Contact */
        .contact { text-align: center; max-width: 600px; margin: 0 auto; align-items: center; }
        .contact-title { font-size: clamp(40px, 5vw, 60px); margin-bottom: 20px; }
        .contact-text { color: var(--clr-text-muted); font-size: 1.1rem; margin-bottom: 50px; }
        .contact-btn { padding: 1.25rem 2.5rem; font-size: 1.1rem; }

        @media (max-width: 768px) {
            .hero { flex-direction: column; justify-content: center; text-align: center; padding-top: 150px; }
            .hero-content { align-items: center; display: flex; flex-direction: column; }
            .hero-desc { text-align: center; }
            .about-content { grid-template-columns: 1fr; }
            .project-card, .project-card.reverse { display: flex; flex-direction: column; gap: 20px; }
            .project-content { padding: 30px 20px; text-align: left; }
            .project-image { min-height: 250px; height: 300px; width: 100%; order: -1; margin-bottom: 10px; flex-shrink: 0; }
            .project-card.reverse .project-tech-list { justify-content: flex-start; }
            .section-heading::after { display: none; }
        }
      `}</style>
    </>
  );
}
