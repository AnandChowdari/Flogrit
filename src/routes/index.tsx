import { createFileRoute } from "@tanstack/react-router";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useFlow } from "@/lib/flow";
import { HeroSection } from "@/components/home/HeroSection";
import { StudioStrip } from "@/components/home/StudioStrip";
import { SystemSelector } from "@/components/home/SystemSelector";
import { SystemJourney } from "@/components/home/SystemJourney";
import { CaptiongritPopup } from "@/components/home/CaptiongritPopup";

const searchSchema = z.object({
  // ?system= is primary. ?flow= is kept back-compat (also read by FlowProvider).
  system: fallback(z.string().optional(), undefined).optional(),
  flow: fallback(z.string().optional(), undefined).optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Flogrit — turn attention into customers" },
      {
        name: "description",
        content:
          "Flogrit is a Growth Systems Company. Choose the system that's breaking — Attention, Conversion or Automation — and the homepage becomes about that one thing.",
      },
      { property: "og:title", content: "Flogrit — turn attention into customers" },
      {
        property: "og:description",
        content:
          "Choose where the system is breaking. Flogrit designs Attention, Conversion and Automation as one connected growth system.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { system } = useFlow();

  return (
    <>
      <HeroSection />
      <StudioStrip />
      <SystemSelector />
      {system && <SystemJourney key={system} system={system} />}
      <CaptiongritPopup />
    </>
  );
}
