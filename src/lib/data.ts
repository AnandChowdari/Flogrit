import type { Flow } from "./flow";

export type PillarKey = Flow; // "attention" | "conversion" | "automation"

export type PillarService = {
  slug: string;
  title: string;
  blurb: string;
  bullets: string[];
};

export type Pillar = {
  key: PillarKey;
  index: number; // 01 / 02 / 03
  label: string;
  oneLine: string; // customer-facing promise
  problem: string; // the customer quote / pain
  headline: string;
  body: string;
  href: string;
  services: PillarService[];
};

export const pillars: Record<PillarKey, Pillar> = {
  attention: {
    key: "attention",
    index: 1,
    label: "Attention",
    oneLine: "Help the right audience find you.",
    problem: "We're invisible. Nothing we post lands.",
    headline: "Make the right people stop scrolling.",
    body: "Content strategy, short and long-form video, brand systems and creative direction — built to compound, not to chase trends.",
    href: "/services/attention",
    services: [
      {
        slug: "content-strategy",
        title: "Content strategy",
        blurb: "A 90-day editorial system mapped to what your buyers actually search, ask, and share.",
        bullets: ["Pillar + cluster planning", "Hook library", "Publishing cadence"],
      },
      {
        slug: "video",
        title: "Video editing & motion",
        blurb: "Short-form, long-form, and ad creative engineered around the first 1.5 seconds.",
        bullets: ["Reels, Shorts, YouTube", "Ad creative variants", "Motion graphics"],
      },
      {
        slug: "branding",
        title: "Brand & creative direction",
        blurb: "An identity that holds up in a feed — typography, motion principles, and templates that scale.",
        bullets: ["Visual identity", "Motion guidelines", "Reusable templates"],
      },
    ],
  },
  conversion: {
    key: "conversion",
    index: 2,
    label: "Conversion",
    oneLine: "Turn visitors into customers.",
    problem: "We get views but no customers.",
    headline: "Close the gap between interest and action.",
    body: "Websites, landing pages, copy and customer journeys engineered so attention becomes opportunity — and opportunity becomes revenue.",
    href: "/services/conversion",
    services: [
      {
        slug: "websites",
        title: "Websites that convert",
        blurb: "Fast, tracked, lead-routed. Built around the one decision you want a visitor to make.",
        bullets: ["Performance > 95", "Event tracking", "A/B-ready"],
      },
      {
        slug: "funnels",
        title: "Landing pages & funnels",
        blurb: "Purpose-built pages and flows that move strangers to scheduled calls without friction.",
        bullets: ["Lead capture", "Appointment booking", "Funnel analytics"],
      },
      {
        slug: "copy",
        title: "Copywriting",
        blurb: "Plain, confident copy that explains what you do and why it's worth their time.",
        bullets: ["Positioning", "Site & email copy", "Sales messaging"],
      },
    ],
  },
  automation: {
    key: "automation",
    index: 3,
    label: "Automation",
    oneLine: "Scale without scaling the team.",
    problem: "Everything depends on us. Follow-ups slip.",
    headline: "Run the business while the system runs the work.",
    body: "AI agents, CRM workflows, qualification, follow-up, reporting — the connective tissue between marketing, sales, and operations.",
    href: "/services/automation",
    services: [
      {
        slug: "ai-agents",
        title: "AI agents & assistants",
        blurb: "Chat, voice and inbox agents that qualify, route and respond — trained on your business.",
        bullets: ["Website & WhatsApp chat", "Voice agents", "Inbox triage"],
      },
      {
        slug: "crm-workflows",
        title: "CRM & workflow automation",
        blurb: "Pipelines, follow-ups and handoffs that don't depend on someone remembering.",
        bullets: ["Lead qualification", "Follow-up sequences", "Calendar & CRM sync"],
      },
      {
        slug: "ops-reporting",
        title: "Internal ops & reporting",
        blurb: "One source of truth across marketing, sales and delivery — quietly running in the background.",
        bullets: ["Dashboards", "Internal automations", "Customer support flows"],
      },
    ],
  },
};

export const pillarOrder: PillarKey[] = ["attention", "conversion", "automation"];

// Video reels — kept as supporting "Attention" proof on the homepage.
export type Reel = {
  id: string;
  title: string;
  client: string;
  views: string;
  watch: string;
  hue: number;
};

export const reels: Reel[] = [
  { id: "r1", title: "Founder POV — SaaS launch", client: "Lumen", views: "2.4M", watch: "00:42", hue: 124 },
  { id: "r2", title: "Quiet product walkthrough", client: "Northbeam", views: "812K", watch: "01:08", hue: 220 },
  { id: "r3", title: "Behind the build", client: "Ridgeway", views: "1.1M", watch: "00:51", hue: 90 },
  { id: "r4", title: "Customer story", client: "Atlas Fit", views: "3.6M", watch: "00:23", hue: 160 },
  { id: "r5", title: "Cold open — testimonial", client: "Hearth & Co.", views: "418K", watch: "01:24", hue: 30 },
  { id: "r6", title: "Ad variant — winner", client: "Pebble Health", views: "920K", watch: "00:38", hue: 200 },
  { id: "r7", title: "Long-form essay", client: "Quay", views: "286K", watch: "08:12", hue: 270 },
  { id: "r8", title: "Storyboard release", client: "Mira", views: "1.9M", watch: "00:29", hue: 110 },
];

export type Plan = { label: string; videos: number; price: string; per: string };
export const simplePlans: Plan[] = [
  { label: "Starter", videos: 4, price: "₹16,000", per: "₹4,000 / video" },
  { label: "Growth", videos: 8, price: "₹30,400", per: "₹3,800 / video" },
  { label: "Scale", videos: 12, price: "₹42,000", per: "₹3,500 / video" },
];
export const precisePlans: Plan[] = [
  { label: "Starter", videos: 4, price: "₹28,000", per: "₹7,000 / video" },
  { label: "Growth", videos: 8, price: "₹54,400", per: "₹6,800 / video" },
  { label: "Scale", videos: 12, price: "₹78,000", per: "₹6,500 / video" },
];

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  industry: string;
  pillar: PillarKey;
  metric: { label: string; value: string }[];
  summary: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "lumen-ai",
    client: "Lumen",
    title: "From a silent launch to 2.4M qualified views in a quarter",
    industry: "B2B SaaS",
    pillar: "attention",
    metric: [
      { label: "Organic views", value: "2.4M" },
      { label: "Qualified demos", value: "318" },
      { label: "Paid spend", value: "₹0" },
    ],
    summary:
      "We built a founder-led content engine — twelve reels in six weeks, a hook library, a publishing cadence — and replaced a paid pipeline that wasn't compounding.",
  },
  {
    slug: "ridgeway",
    client: "Ridgeway",
    title: "Rebuilt the site around one decision. Conversion doubled.",
    industry: "B2B services",
    pillar: "conversion",
    metric: [
      { label: "Conversion rate", value: "+112%" },
      { label: "Page LCP", value: "0.9s" },
      { label: "Pipeline / mo", value: "₹38L" },
    ],
    summary:
      "Stripped the funnel pages to a single call-to-action, instrumented every event end-to-end, and rebuilt the pricing page around the question buyers were actually asking.",
  },
  {
    slug: "atlas-fit",
    client: "Atlas Fit",
    title: "An always-on system replaced a 6-person follow-up team",
    industry: "D2C fitness",
    pillar: "automation",
    metric: [
      { label: "Lead → call rate", value: "41%" },
      { label: "Avg. response", value: "Under 1 min" },
      { label: "Monthly cost saved", value: "₹4.2L" },
    ],
    summary:
      "Every ad lead lands in a qualification flow with a voice-agent fallback. Booked calls jumped 3.6×, and the team was redeployed to closing instead of chasing.",
  },
];

export const faqs = [
  {
    q: "How is Flogrit different from a marketing or AI agency?",
    a: "Agencies sell isolated services — videos, ads, automations. We design the system those services run inside, so the parts of your business actually work together.",
  },
  {
    q: "Do we have to start with all three pillars?",
    a: "No. We start where the bottleneck is. Most engagements begin with one pillar — Attention, Conversion or Automation — and extend as the system proves itself.",
  },
  {
    q: "How fast do you ship?",
    a: "First measurable output within 7 days. A working automation in 14. A full pillar in 30. We optimise for cadence, not for plans.",
  },
  {
    q: "Do you guarantee results?",
    a: "We guarantee the process, the cadence, and the reporting. Anyone guaranteeing leads is selling something else.",
  },
  {
    q: "Who do you work with?",
    a: "Founders, coaches, consultants, SaaS, agencies, D2C and service businesses that already have something worth selling and want predictable growth around it.",
  },
];
