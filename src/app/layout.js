import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Socials from "@/components/Socials";
import DynamicBackgroundWrapper from "@/components/DynamicBackgroundWrapper";

const bodyFont = Plus_Jakarta_Sans({ subsets: ["latin"], variable: '--font-body', display: 'swap' });
const headingFont = Space_Grotesk({ subsets: ["latin"], weight: ['400', '600', '700'], variable: '--font-heading', display: 'swap' });

export const metadata = {
  title: "Alex | Web Developer Portfolio",
  description: "Portfolio of Alex, a passionate Web Developer showcasing modern, responsive, and dynamic web applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body>
        <DynamicBackgroundWrapper />
        <div id="particles-background" style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          zIndex: -2, background: 'radial-gradient(circle at center, var(--clr-bg-elevated) 0%, var(--clr-bg-base) 100%)',
          overflow: 'hidden', pointerEvents: 'none'
        }}></div>
        <Navbar />
        <Socials />
        <main className="container">
          {children}
        </main>

        <footer className="site-footer" style={{ padding: '40px 0', textAlign: 'center', color: 'var(--clr-text-muted)', fontSize: '0.9rem', fontFamily: 'var(--font-heading)' }}>
          <p>Built with <span style={{ color: '#e25555' }}>&hearts;</span> by Alex</p>
        </footer>
      </body>
    </html>
  );
}
