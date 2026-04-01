"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Home, User, Lightbulb, Briefcase, Mail, Github, Linkedin, FileText, Copy } from "lucide-react";

export default function CommandMenu() {
    const [open, setOpen] = useState(false);

    // Toggle the menu when ⌘K is pressed
    useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        const navbarClick = (e) => {
            if (e.detail?.action === 'open-cmd-k') {
                setOpen(true);
            }
        };

        document.addEventListener("keydown", down);
        document.addEventListener("cmdk", navbarClick);
        return () => {
            document.removeEventListener("keydown", down);
            document.removeEventListener("cmdk", navbarClick);
        };
    }, []);

    const scrollToSection = (id) => {
        setOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const copyEmail = () => {
        setOpen(false);
        navigator.clipboard.writeText("alex.schmaltz@gmail.com");
        alert("Email copied!");
    };

    const openLink = (url) => {
        setOpen(false);
        window.open(url, "_blank", "noopener,noreferrer");
    };

    if (!open) return null;

    return (
        <div className="cmdk-dialog-overlay" onClick={() => setOpen(false)}>
            <div className="cmdk-dialog" onClick={(e) => e.stopPropagation()}>
                {/* Win2K title bar */}
                <div className="win-titlebar" style={{ marginBottom: 0 }}>
                    <span className="win-titlebar-title">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ marginRight: 4 }}>
                            <rect x="1" y="1" width="7" height="7" fill="#c0c0c0" />
                            <rect x="1" y="9" width="7" height="7" fill="#c0c0c0" />
                            <rect x="9" y="1" width="7" height="7" fill="#c0c0c0" />
                            <rect x="9" y="9" width="7" height="7" fill="#c0c0c0" />
                            <rect x="2" y="2" width="5" height="5" fill="#ffffff" />
                            <rect x="10" y="2" width="5" height="5" fill="#ffffff" />
                            <line x1="4" y1="4" x2="4" y2="6" stroke="#000080" strokeWidth="1.5" />
                            <line x1="3.5" y1="5" x2="5.5" y2="5" stroke="#000080" strokeWidth="1.5" />
                        </svg>
                        Run — Command Palette
                    </span>
                    <span className="win-titlebar-controls" aria-hidden="true">
                        <button className="win-btn win-btn-close" onClick={() => setOpen(false)} tabIndex="-1">✕</button>
                    </span>
                </div>
                <div style={{ padding: "8px", fontFamily: "'Tahoma','Arial',sans-serif", fontSize: 11, background: "#c0c0c0" }}>
                    <label style={{ display: "block", marginBottom: 4 }}>
                        Type a command, navigation target, or link name:
                    </label>
                </div>
                <Command>
                    <Command.Input placeholder="Search commands, projects, links..." autoFocus />

                    <Command.List>
                        <Command.Empty>No results found.</Command.Empty>

                        <Command.Group heading="Navigation">
                            <Command.Item onSelect={() => scrollToSection("home")}><Home size={16} /><span>Home</span></Command.Item>
                            <Command.Item onSelect={() => scrollToSection("about")}><User size={16} /><span>About Me</span></Command.Item>
                            <Command.Item onSelect={() => scrollToSection("skills")}><Lightbulb size={16} /><span>Skills</span></Command.Item>
                            <Command.Item onSelect={() => scrollToSection("projects")}><Briefcase size={16} /><span>Featured Projects</span></Command.Item>
                            <Command.Item onSelect={() => scrollToSection("contact")}><Mail size={16} /><span>Contact</span></Command.Item>
                        </Command.Group>

                        <Command.Group heading="Social & Links">
                            <Command.Item onSelect={() => openLink("https://github.com/schmalaa")}><Github size={16} /><span>GitHub</span></Command.Item>
                            <Command.Item onSelect={() => openLink("https://www.linkedin.com/in/alex-schmaltz-12127139/")}><Linkedin size={16} /><span>LinkedIn</span></Command.Item>
                            <Command.Item onSelect={() => openLink("/resume.pdf")}><FileText size={16} /><span>Resume</span></Command.Item>
                        </Command.Group>

                        <Command.Group heading="Actions">
                            <Command.Item onSelect={copyEmail}><Copy size={16} /><span>Copy Email Address</span></Command.Item>
                        </Command.Group>
                    </Command.List>
                </Command>
                <div style={{ borderTop: "1px solid #808080", padding: "6px 8px", display: "flex", justifyContent: "flex-end", background: "#c0c0c0", fontFamily: "'Tahoma','Arial',sans-serif" }}>
                    <button
                        className="btn-primary"
                        onClick={() => setOpen(false)}
                        style={{ minWidth: 75 }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
