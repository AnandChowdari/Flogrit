import { createFileRoute } from "@tanstack/react-router";
import { useFlow } from "@/lib/flow";
import { pillarOrder, type PillarKey } from "@/lib/data";
import { HeroSection } from "@/components/home/HeroSection";
import { StudioStrip } from "@/components/home/StudioStrip";
import { Gate } from "@/components/home/Gate";
import { PillarSection } from "@/components/home/PillarSection";
import { Proof } from "@/components/home/Proof";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

const BRIDGES: Record<PillarKey, string> = {
  attention: "Attention without conversion is noise. Here's what catches it.",
  conversion: "A funnel only works if there's traffic in it. Here's how we keep filling the top.",
  automation: "Once the pieces convert, the system has to run without you. Here's the operating layer.",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flogrit — turn attention into customers" },
      {
        name: "description",
        content:
          "Flogrit is a Growth Systems Company. We design and build connected systems for Attention, Conversion and Automation — so the parts of your business work together.",
      },
      { property: "og:title", content: "Flogrit — turn attention into customers" },
      {
        property: "og:description",
        content:
          "A Growth Systems Company. Connected systems for Attention, Conversion and Automation.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { flow, hasChosen } = useFlow();

  const lead: PillarKey = hasChosen ? flow : "attention";
  const ordered: PillarKey[] = [lead, ...pillarOrder.filter((p) => p !== lead)];

  return (
    <>
      <HeroSection />
      <StudioStrip />
      <Gate />

      {ordered.map((key, i) => (
        <PillarSection
          key={key}
          pillarKey={key}
          position={i + 1}
          bridge={i === 0 ? undefined : BRIDGES[key]}
        />
      ))}

      <Proof />
      <FAQ />
      <FinalCTA />
    </>
  );
}
