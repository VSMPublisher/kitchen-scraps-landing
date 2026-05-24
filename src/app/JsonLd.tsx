const siteUrl = "https://kitchen-scraps.web.app";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kitchen Scraps & Food Waste Quiz",
  url: siteUrl,
  description:
    "Confused about composting? Take our free, fun quiz to master food waste rules, learn science-backed facts, and build sustainable habits today!",
  sameAs: [
    "https://www.youtube.com/@KitchenScrapsQuiz",
    "https://www.instagram.com/kitchenscrapsquiz/",
    "https://www.pinterest.com/kitchenscrapsquiz/",
    "https://linktr.ee/kitchenscrapsquiz",
  ],
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kitchen Scraps & Food Waste Quiz",
  url: "https://kitchen-scraps-quiz.web.app",
  description:
    "Confused about composting? Take our free, fun quiz to master food waste rules, learn science-backed facts, and build sustainable habits today!",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web, Android",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const sanitize = (obj: unknown) =>
  JSON.stringify(obj).replace(/</g, "\\u003c");

export default function JsonLd() {
  return (
    <>
      <script
        key="jsonld-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitize(organizationJsonLd) }}
      />
      <script
        key="jsonld-webapp"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitize(webAppJsonLd) }}
      />
    </>
  );
}
