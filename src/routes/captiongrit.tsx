import { createFileRoute } from "@tanstack/react-router";
import CaptiongritPage from "@/components/captiongrit/pages/products/CaptiongritPage";

const TITLE =
  "Captiongrit — One-Click AI Captions for Premiere Pro & After Effects";
const DESCRIPTION =
  "Captiongrit is a one-time purchase Adobe plugin that generates accurate captions in 24 languages — including native + Roman script for Telugu, Hindi, Tamil, Kannada, and Malayalam. Works inside Premiere Pro and After Effects on Windows and Mac.";
const KEYWORDS =
  "captiongrit, caption grit, ai captions premiere pro, ai captions after effects, telugu captions plugin, hindi captions plugin, tamil captions plugin, malayalam captions plugin, kannada captions plugin, one-time caption plugin, srt generator premiere pro, phonetic romanization captions, tenglish captions, hinglish captions, flogrit captiongrit";

export const Route = createFileRoute("/captiongrit")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: KEYWORDS },
      { name: "author", content: "Flogrit" },
      { name: "robots", content: "index, follow" },
      { name: "application-name", content: "Captiongrit" },
      { name: "theme-color", content: "#C6FF34" },

      // Open Graph
      { property: "og:type", content: "product" },
      { property: "og:site_name", content: "Captiongrit" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://flogrit.com/captiongrit" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Captiongrit",
          alternateName: ["Caption Grit", "Flogrit Captiongrit"],
          applicationCategory: "MultimediaApplication",
          operatingSystem: "Windows, macOS",
          description: DESCRIPTION,
          brand: { "@type": "Brand", name: "Flogrit" },
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "INR",
            lowPrice: "399",
            highPrice: "999",
            offerCount: "3",
          },
          featureList: [
            "One-click AI captions inside Adobe Premiere Pro",
            "Works in Adobe After Effects",
            "24 languages including 10 Indian regional languages",
            "Native + Roman phonetic script (Tenglish, Hinglish)",
            "One-time purchase, no subscriptions",
          ],
        }),
      },
    ],
  }),
  component: CaptiongritWrapper,
});

function CaptiongritWrapper() {
  return (
    <div className="captiongrit-container">
      <CaptiongritPage />
    </div>
  );
}

