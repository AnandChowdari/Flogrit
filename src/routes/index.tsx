import { createFileRoute } from "@tanstack/react-router";
import { useFlow } from "@/lib/flow";
import { HeroSection } from "@/components/home/HeroSection";
import { StudioStrip } from "@/components/home/StudioStrip";
import { Gate } from "@/components/home/Gate";
import { PillarContent } from "@/components/home/PillarContent";
import { PillarSystems } from "@/components/home/PillarSystems";
import { Proof } from "@/components/home/Proof";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "flow/studio — attention to leads, by design" },
      {
        name: "description",
        content:
          "Video and content that earns reach. AI systems that turn it into booked calls. One studio, two pillars.",
      },
      { property: "og:title", content: "flow/studio — attention to leads, by design" },
      {
        property: "og:description",
        content:
          "Video and content that earns reach. AI systems that turn it into booked calls.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { flow } = useFlow();

  const contentLeading = flow === "A";
  const bridgeA = "Cool — you've got eyes on you. Now the harder part: turning watchers into buyers.";
  const bridgeB = "Funnels only work if there's traffic in them. Here's how we keep filling the top.";

  return (
    <>
      <HeroSection />
      <StudioStrip />
      <Gate />

      {contentLeading ? (
        <>
          <PillarContent leading bridge={undefined} />
          <PillarSystems leading={false} bridge={bridgeA} />
        </>
      ) : (
        <>
          <PillarSystems leading bridge={undefined} />
          <PillarContent leading={false} bridge={bridgeB} />
        </>
      )}

      <Proof />
      <FAQ />
      <FinalCTA />
    </>
  );
}
