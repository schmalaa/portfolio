import "./globals.css";
import Navbar from "@/components/Navbar";
import Socials from "@/components/Socials";
import { Analytics } from "@vercel/analytics/react";
import CommandMenu from "@/components/CommandMenu";

export const metadata = {
  metadataBase: new URL("https://alexschmaltz.com"),
  title: "Alex Schmaltz | Web Developer & Software Engineer Portfolio",
  description:
    "Portfolio of Alex Schmaltz, a passionate Web Developer and Software Engineer showcasing modern, responsive, and dynamic web applications.",
  keywords: [
    "Alex Schmaltz",
    "Web Developer",
    "Software Engineer",
    "Frontend Developer",
    "Full Stack Developer",
    "Portfolio",
    "React",
    "Next.js",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Alex Schmaltz | Web Developer Portfolio",
    description:
      "Portfolio of Alex Schmaltz, a passionate Web Developer and Software Engineer.",
    url: "https://alexschmaltz.com",
    siteName: "Alex Schmaltz Portfolio",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Alex Schmaltz Portfolio Preview" }],
  },
  twitter: {
    title: "Alex Schmaltz | Web Developer Portfolio",
    card: "summary_large_image",
    creator: "@schmalaa",
  },
};

export const viewport = {
  themeColor: "#008080",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Tahoma is a system font — no Google Fonts import needed */}
      </head>
      <body>
        {/* Win2K teal desktop background */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            background: "#008080",
          }}
        />
        {/* Desktop icons on the left side */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            left: 8,
            top: 40,
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            pointerEvents: "none",
          }}
        >
          {[
            { label: "My Computer", icon: "💻" },
            { label: "Recycle Bin", icon: "🗑️" },
            { label: "My Documents", icon: "📁" },
            { label: "Internet\nExplorer", icon: "🌐" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 64,
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: 28, lineHeight: 1 }}>{item.icon}</span>
              <span style={{
                fontSize: 11,
                color: "#ffffff",
                textShadow: "1px 1px 2px rgba(0,0,0,0.9)",
                fontFamily: "'Tahoma','Arial',sans-serif",
                whiteSpace: "pre-wrap",
                marginTop: 2,
                lineHeight: 1.2,
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <Navbar />

        <main
          className="container"
          style={{
            marginTop: "38px",    /* below top taskbar */
            marginBottom: "38px", /* above bottom taskbar */
            padding: "8px 16px 8px 84px", /* 84px left to clear desktop icons */
            maxWidth: "1184px",   /* 1100 + 84px icon column */
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {children}
        </main>

        <footer
          style={{
            paddingBottom: "38px", /* clear the bottom taskbar */
            textAlign: "center",
            fontFamily: "'Tahoma','Arial',sans-serif",
            fontSize: "11px",
            color: "#ffffff",
            textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
          }}
        >
          <p>
            Built with{" "}
            <span style={{ color: "#ff6666" }}>&hearts;</span> by Alex &mdash; alexschmaltz.com &copy; {new Date().getFullYear()}
          </p>
        </footer>

        <Socials />
        <CommandMenu />
        <Analytics />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Alex Schmaltz",
              url: "https://alexschmaltz.com",
              jobTitle: "Software Engineer",
              sameAs: [
                "https://github.com/schmalaa",
                "https://www.linkedin.com/in/alex-schmaltz-12127139/",
                "https://medium.com/@schmalaa",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
