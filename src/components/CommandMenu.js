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
            </div>
        </div>
    );
}
