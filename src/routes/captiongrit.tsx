import { createFileRoute } from "@tanstack/react-router";
import CaptiongritPage from "@/components/captiongrit/pages/products/CaptiongritPage";

export const Route = createFileRoute("/captiongrit")({
  head: () => ({
    meta: [
      { title: "Captiongrit — Fast Captions for Regional Creators" },
      { name: "description", content: "Make captions way faster for Hindi, Telugu, Tamil, Kannada, and Malayalam." },
      { property: "og:title", content: "Captiongrit — Fast Captions for Regional Creators" },
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
