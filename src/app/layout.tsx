import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Kitchen Scraps & Food Waste Quiz | Master Composting",
  description: "Test your knowledge on food waste composting with our interactive quiz. Master Go/No-Go items, debunk myths, and become an eco-expert.",
  keywords: ["composting quiz", "food waste app", "kitchen scraps", "sustainable living", "eco-friendly quiz"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} antialiased font-sans text-gray-900 bg-[#FFFDD6]`}>
        {children}
      </body>
    </html>
  );
}