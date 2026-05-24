import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import JsonLd from "./JsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

const siteUrl = "https://kitchen-scraps.web.app";

export const metadata: Metadata = {
  title: "Composting Quiz — Know What Goes In Your Bin (Free, 60 Questions)",
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
    icon: "/app-icon.png",
    apple: "/app-icon.png",
  },
  metadataBase: new URL(siteUrl),
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
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} antialiased font-sans text-gray-900 bg-[#FCFEF9]`}
      >
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
      </body>
    </html>
  );
}