import type { Flow } from "./flow";

export type SystemKey = Flow;

export type CapabilityGroup = {
  label: string;
  blurb: string;
  items: string[];
};

export type ProcessStep = {
  n: string;
  title: string;
  body: string;
};

export type NextDirection = {
  toSystem: SystemKey;
  label: string;
};

export type AutomationFramework = {
  id: string;
  n: string;
  title: string;
  painScenario: string;
  /** Node labels for the inline flow diagram. */
  systemFlow: string[];
};

export type AttentionContent = {
  problem: { headline: string; body: string };
  capabilityGroups: CapabilityGroup[];
  process: ProcessStep[];
  proof: { headlineStat: string; label: string; body: string };
  ctaLabels: { pricing: string; primary: string };
  nextDirections: [NextDirection, NextDirection];
};

export type ConversionContent = {
  problem: { headline: string; body: string };
  capabilityGroups: CapabilityGroup[];
  process: ProcessStep[];
  caseStudy: { caseSlug: "gurujyoth"; academyName: "Horizon Pilot Academy"; framing: string };
  ctaLabels: { pricing: string; primary: string };
  nextDirections: [NextDirection, NextDirection];
};

export type AutomationContent = {
  problem: { headline: string; body: string };
  frameworks: AutomationFramework[];
  capabilities: string[];
  process: ProcessStep[];
  ctaLabels: { pricing: string; primary: string };
  nextDirections: [NextDirection, NextDirection];
};

export type SystemJourneys = {
  attention: AttentionContent;
  conversion: ConversionContent;
  automation: AutomationContent;
};

export const systemJourneys: SystemJourneys = {
  attention: {
    problem: {
      headline: "Your content isn't the only thing people see.",
      body: "Every scroll is a competition for a second of attention. You don't need more posts — you need a brand system that earns the room before the pitch even starts.",
    },
    capabilityGroups: [
      {
        label: "Brand foundation",
        blurb: "The visual language people recognise before they read the caption.",
        items: [
          "Positioning + narrative",
          "Visual identity system",
          "Typography + motion principles",
          "Thumbnail + cover systems",
        ],
      },
      {
        label: "Content direction",
        blurb: "A 90-day editorial system mapped to what your buyers actually search and ask.",
        items: [
          "Pillar + cluster planning",
          "Hook library",
          "Publishing cadence",
          "Series formats + repeatable frames",
        ],
      },
      {
        label: "Content execution",
        blurb: "Short-form, long-form, and ad creative engineered around the first 1.5 seconds.",
        items: [
          "Reels / Shorts / YouTube",
          "Ad creative variants",
          "Motion graphics + VFX",
          "Color, sound design, pacing",
        ],
      },
    ],
    process: [
      { n: "01", title: "Diagnose", body: "Audit the current content ecosystem — what's actually landing, what's noise, what's missing." },
      { n: "02", title: "Design", body: "Lock the visual system, the editorial pillars, and the hook logic in one document." },
      { n: "03", title: "Ship", body: "First measurable output in the first week. Weekly cadence from day one." },
      { n: "04", title: "Compound", body: "Monthly review — kill the formats that stall, double down on the ones that pull." },
    ],
    proof: {
      headlineStat: "50M+",
      label: "views generated across founder-led brands we've directed",
      body: "Real numbers from the operators we work with — not vanity metrics on the studio's own feed.",
    },
    ctaLabels: {
      pricing: "Explore Attention plans",
      primary: "Discuss your brand",
    },
    nextDirections: [
      { toSystem: "conversion", label: "Turn attention into customers" },
      { toSystem: "automation", label: "Automate the boring work" },
    ],
  },
  conversion: {
    problem: {
      headline: "Attention is unpredictable. Your conversion path shouldn't be.",
      body: "Views don't pay bills. If interest isn't turning into calls, replies or checkouts, the leak is in the path — not the traffic.",
    },
    capabilityGroups: [
      {
        label: "Journey design",
        blurb: "Map the exact steps between a first click and a signed customer.",
        items: [
          "Buyer research + positioning",
          "Journey mapping across channels",
          "CTA architecture",
          "Objection sequencing",
        ],
      },
      {
        label: "Landing pages + funnels",
        blurb: "Purpose-built pages and flows that move strangers to scheduled calls without friction.",
        items: [
          "Single-decision landing pages",
          "Lead capture + routing",
          "Appointment booking",
          "A/B-ready structure",
        ],
      },
      {
        label: "Foundations",
        blurb: "Copy, tracking and content that keep the system searchable and measurable.",
        items: [
          "Sales-first copywriting",
          "Event + funnel analytics",
          "SEO foundations for high-intent search",
          "Email + WhatsApp follow-up sequences",
        ],
      },
    ],
    process: [
      { n: "01", title: "Audit", body: "Walk the current journey step by step and mark every place attention drops out." },
      { n: "02", title: "Rebuild", body: "One page, one decision. Rewrite copy, tighten the path, instrument the funnel." },
      { n: "03", title: "Prove", body: "Ship, measure, iterate — the funnel is treated as an experiment, not a launch." },
    ],
    caseStudy: {
      caseSlug: "gurujyoth",
      academyName: "Horizon Pilot Academy",
      framing: "Gurujyoth × Horizon Pilot Academy — turning educational content into 50+ qualified admissions.",
    },
    ctaLabels: {
      pricing: "Explore Conversion plans",
      primary: "Build your conversion path",
    },
    nextDirections: [
      { toSystem: "attention", label: "Fill the top of the funnel" },
      { toSystem: "automation", label: "Automate follow-up so nothing slips" },
    ],
  },
  automation: {
    problem: {
      headline: "Every process that depends on someone remembering is a leak waiting to happen.",
      body: "Once the pieces convert, the system has to run without you. Automation is the connective tissue between marketing, sales and operations — the layer that keeps the wheels turning while you sleep.",
    },
    frameworks: [
      {
        id: "inbound-response",
        n: "01",
        title: "Inbound response engine",
        painScenario: "Enquiries come in at midnight, on weekends, in the middle of another meeting — by the time you reply, the prospect has already found someone else.",
        systemFlow: ["Inbound message", "AI qualifier", "CRM entry", "Instant reply", "Human handoff"],
      },
      {
        id: "voice-reception",
        n: "02",
        title: "Voice reception + booking",
        painScenario: "Missed calls become missed customers. A voice agent answers instantly, qualifies the call, books the slot and logs the CRM entry.",
        systemFlow: ["Inbound call", "Voice agent", "Qualification", "Calendar booking", "CRM sync"],
      },
      {
        id: "follow-up-sequences",
        n: "03",
        title: "Follow-up sequences",
        painScenario: "Most deals die between reply #1 and reply #4. Automated sequences make sure the follow-up never depends on someone remembering.",
        systemFlow: ["Lead stage change", "Sequence trigger", "Multi-channel touch", "Reply detection", "Auto-pause"],
      },
      {
        id: "ops-reporting",
        n: "04",
        title: "Operations + reporting",
        painScenario: "You're pulling numbers out of five different tools every Monday. A single dashboard reflects marketing, sales and delivery in one place — updated continuously.",
        systemFlow: ["Data sources", "Sync layer", "Warehouse", "Dashboard", "Weekly review"],
      },
      {
        id: "internal-agents",
        n: "05",
        title: "Internal AI agents",
        painScenario: "Your team answers the same questions all day. Internal agents handle repetitive requests — customer support, onboarding, internal Q&A — and escalate only what needs a human.",
        systemFlow: ["Knowledge base", "Agent layer", "Task router", "Human escalation", "Feedback loop"],
      },
    ],
    capabilities: [
      "AI agents (chat, voice, inbox)",
      "CRM setup + pipeline design",
      "Multi-channel follow-up sequences",
      "Workflow automation across tools",
      "Custom internal dashboards + reporting",
      "Integrations with the tools you already pay for",
    ],
    process: [
      { n: "01", title: "Map", body: "Walk the current operations end-to-end — mark every manual handoff and every place work waits on a human." },
      { n: "02", title: "Wire", body: "Build the smallest useful automation first. Ship it. Then extend the graph." },
      { n: "03", title: "Own", body: "You keep the accounts, the credentials and the workflows. We hand over documentation, not a black box." },
    ],
    ctaLabels: {
      pricing: "Explore Automation engagements",
      primary: "Discuss your workflow",
    },
    nextDirections: [
      { toSystem: "attention", label: "Feed the system with attention" },
      { toSystem: "conversion", label: "Design the conversion path first" },
    ],
  },
};
