import type { Metadata } from "next";
import DownloadPage from "@/components/DownloadPage";

export const metadata: Metadata = {
  title: "Download Kitchen Scraps APK - Free Android App",
  description:
    "Download the zero-permission Kitchen Scraps composting app for Android. Secure, verified by VirusTotal, and completely safe to install.",
  robots: "noindex, follow",
};

export default function Download() {
  return <DownloadPage />;
}
