import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

const BASE_URL = "https://aio.org.au";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Australian Indian Orchestra | Indian and Bollywood Symphony Music",
    template: "%s",
  },
  description: "The Australian Indian Orchestra performs Indian classical, Bollywood film and fusion music with symphonic arrangements in Sydney, Australia.",
  keywords: [
    "Australian Indian Orchestra",
    "AIO orchestra Sydney",
    "Indian orchestra Australia",
    "Bollywood symphony orchestra",
    "Bollywood orchestra Sydney",
    "Bollywood orchestra Australia",
    "Indian orchestra Sydney",
    "A.R. Rahman symphony concert",
    "A.R. Rahman tribute concert Australia",
    "Bollywood concert Sydney",
    "Indian classical fusion orchestra Australia",
    "Indian fusion music concert Sydney",
    "Bollywood live orchestra concert",
    "Bollywood symphony orchestra tour",
    "Indian music concert Sydney Conservatorium",
  ],
  authors: [{ name: "Australian Indian Orchestra" }],
  creator: "Australian Indian Orchestra",
  publisher: "Australian Indian Orchestra",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Australian Indian Orchestra",
    description: "The Australian Indian Orchestra performs Indian classical, Bollywood film and fusion music with symphonic arrangements in Sydney, Australia.",
    images: [
      {
        url: "/banner-1.webp",
        width: 1200,
        height: 630,
        alt: "Australian Indian Orchestra performing live on stage in Sydney",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    description: "The Australian Indian Orchestra performs Indian classical, Bollywood film and fusion music with symphonic arrangements in Sydney, Australia.",
    images: ["/banner-1.webp"],
    creator: "@ausindorchestra",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  verification: {
    google: "JzTAdkVJmRNTDSM4rC9tbTkugcHjETEg9uVP2-S0RyA",
  },
};

// Organization structured data (JSON-LD)
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  "@id": `${BASE_URL}/#organization`,
  name: "Australian Indian Orchestra",
  alternateName: "AIO",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "A Sydney-based orchestra performing Indian classical, Bollywood film and Indian fusion music with symphonic arrangements.",
  genre: ["Indian classical music", "Bollywood film music", "Indian fusion"],
  founders: [
    { "@type": "Person", name: "Sagar Nagaraj" },
    { "@type": "Person", name: "Suraj Nagaraj" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sydney",
    addressRegion: "NSW",
    addressCountry: "AU",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "ausindorchestra@gmail.com",
    url: `${BASE_URL}/contact`,
  },
  sameAs: [
    "https://www.facebook.com/101399399609487",
    "https://www.instagram.com/ausindorchestra/",
    "https://www.youtube.com/@ausindorchestra/videos",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Australian Indian Orchestra",
  url: BASE_URL,
  inLanguage: "en-AU",
  publisher: { "@id": `${BASE_URL}/#organization` },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema]).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="selection:bg-red-600 selection:text-white">
          {children}
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXK6WLSEM3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXK6WLSEM3');
          `}
        </Script>
      </body>
    </html>
  );
}
