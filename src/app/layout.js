import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Socials from "@/components/Socials";
import DynamicBackgroundWrapper from "@/components/DynamicBackgroundWrapper";
import { Analytics } from "@vercel/analytics/react";

const bodyFont = Plus_Jakarta_Sans({ subsets: ["latin"], variable: '--font-body', display: 'swap' });
const headingFont = Space_Grotesk({ subsets: ["latin"], weight: ['400', '600', '700'], variable: '--font-heading', display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://alexschmaltz.com'),
  title: "Alex Schmaltz | Web Developer & Software Engineer Portfolio",
  description: "Portfolio of Alex Schmaltz, a passionate Web Developer and Software Engineer showcasing modern, responsive, and dynamic web applications.",
  keywords: ["Alex Schmaltz", "Web Developer", "Software Engineer", "Frontend Developer", "Full Stack Developer", "Portfolio", "React", "Next.js"],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Alex Schmaltz | Web Developer Portfolio",
    description: "Portfolio of Alex Schmaltz, a passionate Web Developer and Software Engineer.",
    url: "https://alexschmaltz.com",
    siteName: "Alex Schmaltz Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alex Schmaltz Portfolio Preview',
      },
    ],
  },
  twitter: {
    title: "Alex Schmaltz | Web Developer Portfolio",
    card: "summary_large_image",
    creator: "@schmalaa",
  }
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
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Alex Schmaltz',
              url: 'https://alexschmaltz.com',
              jobTitle: 'Software Engineer',
              sameAs: [
                'https://github.com/schmalaa',
                'https://www.linkedin.com/in/alex-schmaltz-12127139/',
                'https://medium.com/@schmalaa'
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
