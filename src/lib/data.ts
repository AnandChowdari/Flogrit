export type Reel = {
  id: string;
  title: string;
  client: string;
  views: string;
  watch: string;
  hue: number; // for placeholder gradient
};

export const reels: Reel[] = [
  { id: "r1", title: "Cold open / SaaS launch", client: "Lumen AI", views: "2.4M", watch: "00:42", hue: 124 },
  { id: "r2", title: "Founder POV", client: "Northbeam DTC", views: "812K", watch: "01:08", hue: 295 },
  { id: "r3", title: "Product teardown", client: "Ridgeway", views: "1.1M", watch: "00:51", hue: 90 },
  { id: "r4", title: "Reaction reel", client: "Atlas Fit", views: "3.6M", watch: "00:23", hue: 160 },
  { id: "r5", title: "Testimonial cut", client: "Hearth & Co.", views: "418K", watch: "01:24", hue: 30 },
  { id: "r6", title: "Ad creative — variant 7", client: "Pebble Health", views: "920K", watch: "00:38", hue: 210 },
  { id: "r7", title: "Long-form essay", client: "Quay Studio", views: "286K", watch: "08:12", hue: 270 },
  { id: "r8", title: "Storyboard tease", client: "Mira Labs", views: "1.9M", watch: "00:29", hue: 110 },
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

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  bullets: string[];
};

export const contentServices: Service[] = [
  {
    slug: "video-editing",
    title: "Video editing",
    blurb: "Hook-first cuts engineered for retention. Short-form and long-form, every platform.",
    bullets: ["Reels, Shorts, TikTok", "YouTube long-form", "Ad creatives & variants"],
  },
  {
    slug: "content-strategy",
    title: "Content strategy",
    blurb: "A 90-day editorial system mapped to the buyer's actual questions.",
    bullets: ["Pillar + cluster mapping", "Hook library", "Posting cadence"],
  },
  {
    slug: "branding",
    title: "Branding",
    blurb: "Identity that survives a feed scroll — colour, type, motion principles.",
    bullets: ["Visual identity", "Motion guidelines", "Templates & kits"],
  },
];

export const systemsServices: Service[] = [
  {
    slug: "meta-ads",
    title: "Meta ads",
    blurb: "Creative-first ads that compound. Test, learn, scale without burning budget.",
    bullets: ["Creative testing matrix", "Audience + retargeting", "Weekly scale reports"],
  },
  {
    slug: "ai-automation",
    title: "AI automation systems",
    blurb: "WhatsApp, Instagram, and Messenger flows that qualify and route every lead 24/7.",
    bullets: ["Meta → WhatsApp", "Instagram DM automations", "Facebook Messenger"],
  },
  {
    slug: "chatbots",
    title: "Website chatbots",
    blurb: "Qualify the visitor, answer the FAQ, book the call — before they bounce.",
    bullets: ["Lead qualification", "Calendar booking", "CRM hand-off"],
  },
  {
    slug: "voice-agents",
    title: "Voice agents",
    blurb: "Inbound and outbound voice AI that sounds human and never sleeps.",
    bullets: ["24/7 inbound", "Outbound follow-ups", "Multilingual"],
  },
  {
    slug: "seo",
    title: "SEO ranking",
    blurb: "Technical, content, and local SEO that compounds into a moat.",
    bullets: ["Technical audit", "Content programme", "Local + GMB"],
  },
  {
    slug: "websites",
    title: "Websites that convert",
    blurb: "Fast, tracked, lead-routed. Built to turn ad clicks into booked calls.",
    bullets: ["Performance > 95", "Event tracking", "A/B-ready"],
  },
];

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  industry: string;
  pillar: "content" | "systems";
  metric: { label: string; value: string }[];
  summary: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "lumen-ai",
    client: "Lumen AI",
    title: "From silent launch to 2.4M organic views in 90 days",
    industry: "B2B SaaS",
    pillar: "content",
    metric: [
      { label: "Organic views", value: "2.4M" },
      { label: "Qualified demos", value: "318" },
      { label: "Cost / demo", value: "₹0" },
    ],
    summary:
      "Built the founder POV channel from zero, shipped 12 reels in 6 weeks, three went viral and seeded an inbound demo pipeline that outperformed paid.",
  },
  {
    slug: "atlas-fit",
    client: "Atlas Fit",
    title: "WhatsApp + voice agents replaced a 6-person SDR team",
    industry: "D2C fitness",
    pillar: "systems",
    metric: [
      { label: "Lead → call rate", value: "41%" },
      { label: "Response time", value: "8s" },
      { label: "Monthly cost saved", value: "₹4.2L" },
    ],
    summary:
      "Routed every Meta-ad lead into a WhatsApp qualification flow with a voice-agent fallback. Booked calls jumped 3.6× and the SDR team got redeployed to closing.",
  },
  {
    slug: "ridgeway",
    client: "Ridgeway",
    title: "Re-platformed the site, doubled CVR in one quarter",
    industry: "B2B services",
    pillar: "systems",
    metric: [
      { label: "Conversion rate", value: "+112%" },
      { label: "Page LCP", value: "0.9s" },
      { label: "Pipeline / mo", value: "₹38L" },
    ],
    summary:
      "Tracked every event end-to-end, rebuilt the funnel pages around a single CTA, plugged a chatbot into the price page. Pipeline doubled with the same ad spend.",
  },
];

export const faqs = [
  {
    q: "What's the engagement model?",
    a: "Month-to-month after a 90-day initial sprint. We never lock you in — if it isn't working we'd rather know fast.",
  },
  {
    q: "Do you only work with founders?",
    a: "We work best with founders or marketing leads who can make calls in the room. If approvals take three weeks we're not the right fit.",
  },
  {
    q: "How fast do you ship?",
    a: "First reel goes live within 7 days. AI automation flow within 14. Full system in 30.",
  },
  {
    q: "Do you guarantee results?",
    a: "We guarantee process, cadence, and reporting. Anyone guaranteeing leads is selling something else.",
  },
  {
    q: "Where are you based?",
    a: "Hyderabad, working with clients across India, the US, and the UK.",
  },
];
