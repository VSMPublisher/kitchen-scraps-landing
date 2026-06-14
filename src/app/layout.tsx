import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import JsonLd from "./JsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

const siteUrl = "https://kitchen-scraps.web.app";

export const metadata: Metadata = {
  title: "Composting Quiz — Know What Goes In Your Bin | Kitchen Scraps & Food Waste Quiz",
  description:
    "Not sure if coffee grounds belong in compost? Take our free 60-question quiz across 6 categories and finally learn what to compost — and what to toss.",
  keywords: [
    "composting quiz",
    "food waste app",
    "kitchen scraps",
    "sustainable living",
    "backyard composting",
    "bokashi guide",
    "eco-friendly quiz",
  ],
  icons: {
    icon: [
      { url: "/app-icon.png", sizes: "192x192", type: "image/png" }
    ],
    shortcut: "/app-icon.png",
    apple: [
      { url: "/app-icon.png", sizes: "180x180", type: "image/png" }
    ],
  },
  metadataBase: new URL(siteUrl),

  // Google Search Console Site Verification:
  verification: {
    google: "ymeXpfXiEZQw3VqV-iDF0TpCT31QwCyTlcUOsbQlpAY",
  },

  openGraph: {
    title: "Composting Quiz — Know What Goes In Your Bin (Free, 60 Questions)",
    description:
      "Not sure if coffee grounds belong in compost? Take our free 60-question quiz across 6 categories and finally learn what to compost — and what to toss.",
    url: siteUrl,
    siteName: "Kitchen Scraps & Food Waste Quiz",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/app-icon.png",
        width: 400,
        height: 320,
        alt: "Composting illustration showing a growing plant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Composting Quiz — Know What Goes In Your Bin (Free, 60 Questions)",
    description:
      "Not sure if coffee grounds belong in compost? Take our free 60-question quiz across 6 categories and finally learn what to compost — and what to toss.",
    images: ["/app-icon.png"],
  },
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // FIX 1: Added suppressHydrationWarning to ignore extension conflicts in the browser
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} antialiased font-sans`}>
        <JsonLd />
        {children}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}

        {/* impeccable-live-start */}
        {/* FIX 2: Optimized using Next.js Script component to prevent execution sync errors */}
        <Script
          src="http://localhost:8400/live.js"
          strategy="afterInteractive"
        />
        {/* impeccable-live-end */}
      </body>
    </html>
  );
}