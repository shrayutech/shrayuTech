import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import ClientProviders from '../src/components/ClientProviders';
import {
  SITE_METADATA_CONFIG,
  buildRobotsMetadata,
  buildLanguageAlternates
} from '../src/utils/seo/metadataBuilders';

// Self-hosted and preloaded by next/font, so text no longer waits on a fonts.googleapis.com
// stylesheet chain. Both are variable fonts, which covers every weight the site uses.
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  preload: false, // only used for small code/label text, keep it off the critical path
});

export const metadata = {
  metadataBase: new URL(SITE_METADATA_CONFIG.siteUrl),
  title: {
    default: SITE_METADATA_CONFIG.defaultTitle,
    template: SITE_METADATA_CONFIG.titleTemplate
  },
  description: SITE_METADATA_CONFIG.defaultDescription,
  applicationName: SITE_METADATA_CONFIG.brandName,
  authors: [{ name: SITE_METADATA_CONFIG.brandName, url: SITE_METADATA_CONFIG.siteUrl }],
  creator: SITE_METADATA_CONFIG.brandName,
  publisher: SITE_METADATA_CONFIG.brandName,
  alternates: buildLanguageAlternates('/'),
  robots: buildRobotsMetadata({ index: true, follow: true }),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '64x64' }
    ],
    apple: '/apple-touch-icon.png'
  },
  openGraph: {
    type: 'website',
    url: `${SITE_METADATA_CONFIG.siteUrl}/`,
    title: SITE_METADATA_CONFIG.defaultTitle,
    description: SITE_METADATA_CONFIG.defaultDescription,
    siteName: SITE_METADATA_CONFIG.brandName,
    locale: SITE_METADATA_CONFIG.locale,
    images: [
      {
        url: `${SITE_METADATA_CONFIG.siteUrl}/logo.png`,
        width: 800,
        height: 600,
        alt: `${SITE_METADATA_CONFIG.brandName} Logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE_METADATA_CONFIG.twitterHandle,
    creator: SITE_METADATA_CONFIG.twitterHandle,
    title: SITE_METADATA_CONFIG.defaultTitle,
    description: SITE_METADATA_CONFIG.defaultDescription,
    images: [`${SITE_METADATA_CONFIG.siteUrl}/logo.png`],
  },
};


export const viewport = {
  themeColor: '#1e293b',
  width: 'device-width',
  initialScale: 1,
};

const themeInitScript = `
  (function() {
    try {
      var saved = localStorage.getItem('shrayu_theme');
      var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = (saved === 'light' || saved === 'dark') ? saved : (prefersDark ? 'dark' : 'light');
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
  })();
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Shrayu Technologies",
  "url": "https://shrayutech.vercel.app/",
  "logo": "https://shrayutech.vercel.app/logo.png",
  "description": "Leading software development company providing premium web design, mobile apps, and enterprise solutions.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Chhatrapati Sambhajinagar",
    "addressRegion": "Maharashtra",
    "postalCode": "431001",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-7020041614",
    "contactType": "customer service",
    "email": "shrayutech@gmail.com",
    "availableLanguage": ["English", "Hindi"]
  },
  "sameAs": [
    "https://github.com/shrayutech"
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
        <noscript>
          <header>
            <img src="/logo.png" alt="Shrayu Technologies Logo - Custom Software Development & Web Design" width="200" height="60" />
            <nav>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/services">Software Services</a></li>
                <li><a href="/portfolio">Portfolio & Case Studies</a></li>
                <li><a href="/compare">Technical Comparisons</a></li>
                <li><a href="/locations">Engineering Locations & Hubs</a></li>
                <li><a href="/contact">Contact Us</a></li>
              </ul>
            </nav>
            <h1>Shrayu Technologies | Premium Software Development & Custom Web Design Services</h1>
            <p>Leading software development company providing premium web design, mobile apps, enterprise software, and cloud computing solutions.</p>
          </header>
          <main>
            <section>
              <h2>Custom Software Development & Engineering Services</h2>
              <p>
                Shrayu Technologies is a professional software development company specializing in custom web applications, mobile app development (iOS and Android), cloud infrastructure design, and tech consulting. We build secure, scalable, and high-performance digital solutions.
              </p>
            </section>
            <section>
              <h2>Our Core Expertise</h2>
              <p>
                We leverage industry-leading practices and technologies to build scalable platforms. Our developers design solutions aligned with web standards outlined by the <a href="https://www.w3.org" target="_blank" rel="noopener noreferrer">World Wide Web Consortium (W3C)</a> and deploy enterprise-grade infrastructure on cloud platforms like <a href="https://aws.amazon.com" target="_blank" rel="noopener noreferrer">Amazon Web Services (AWS)</a>.
              </p>
              <ul>
                <li><strong>Web Development:</strong> Custom web apps, progressive web apps, and interactive portal solutions.</li>
                <li><strong>Mobile Development:</strong> Native and cross-platform mobile app development.</li>
                <li><strong>Cloud Infrastructure:</strong> AWS, Azure, Google Cloud platform setup, migration, and DevOps automation.</li>
                <li><strong>Tech Consulting:</strong> IT strategy, software architecture design, and technical project management.</li>
              </ul>
            </section>
            <section>
              <h2>Enterprise Software Products</h2>
              <p>
                Explore our advanced software product ecosystem built to streamline business workflows, improve customer relations, and secure transactions:
              </p>
              <ul>
                <li><strong>Shrayu Nexus:</strong> AI-powered CRM (Customer Relationship Management) system designed to automate sales cycles.</li>
                <li><strong>Shrayu Ledger:</strong> Secure reconciliation engine and financial ledger for compliance mapping.</li>
              </ul>
            </section>
          </main>
        </noscript>
      </body>
    </html>
  );
}

