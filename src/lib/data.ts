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

export type TechStackItem = {
  name: string;
  category: "Creative" | "AI & Automation" | "Development" | "Analytics & Marketing" | "CRM & Communication";
  iconSlug?: string;
};

export type SectionBlock = {
  title: string;
  description?: string;
  bullets?: string[];
  quote?: string;
};

export type ClientLinks = {
  website?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  industry: string;
  pillar: PillarKey;
  status: "Real Client" | "Implementation Framework";
  oneLine: string;
  context: string;
  links?: ClientLinks;
  portrait?: string;
  logo?: string;
  challenge: {
    description: string;
    bullets: string[];
  };
  sections: SectionBlock[];
  techStack: TechStackItem[];
  metric: {
    value: string;
    label: string;
  }[];
};

export const cases: CaseStudy[] = [
  {
    slug: "gurujyoth",
    client: "Gurujyoth",
    title: "Converting Social Attention into 50+ Qualified Student Leads",
    industry: "Education / Aviation",
    pillar: "conversion",
    status: "Real Client",
    oneLine: "Helping a Pilot Academy convert educational content into qualified admissions.",
    links: {
      instagram: "https://www.instagram.com/pilot.gurujyoth/",
    },
    context: "Gurujyoth operates a Pilot Training Academy in Hyderabad. His expertise was never the problem—he already had years of experience helping aspiring pilots. The challenge was that his online content generated attention, but almost none of that attention turned into enquiries. The marketing funnel effectively stopped at 'views.'",
    challenge: {
      description: "After auditing the content ecosystem, we identified several bottlenecks.",
      bullets: [
        "Videos educated people but didn't create curiosity.",
        "There was no structured lead-generation funnel.",
        "Every piece of content ended without a clear next action.",
        "Visual presentation looked similar to hundreds of educational creators.",
        "High-intent search traffic wasn't being captured.",
        "Students had recurring questions that were never converted into reusable content."
      ]
    },
    sections: [
      {
        title: "Our Strategy",
        description: "Instead of producing more content, we redesigned the entire acquisition pipeline."
      },
      {
        title: "Visual Identity Upgrade",
        description: "We rebuilt the visual language using:",
        bullets: ["AI-generated cinematic sequences", "High-end VFX", "Motion graphics", "Branded typography", "Consistent thumbnail system", "Educational graphics"]
      },
      {
        title: "Hook Engineering",
        description: "Every video was rebuilt around one principle:",
        quote: "Answer the exact question a future student is already searching for.",
        bullets: ["Salary breakdowns", "Pilot career myths", "CPL roadmap", "Medical eligibility", "Cost analysis", "Airline hiring insights"]
      },
      {
        title: "Q&A Content Engine",
        description: "We launched a dedicated series answering real student questions. Instead of producing random videos, each episode removed one objection preventing enrollment. This naturally built authority while creating evergreen content."
      },
      {
        title: "Organic Search Layer",
        description: "To extend reach beyond Instagram and YouTube, we published SEO-focused blogs around high-intent keywords such as: How to become a commercial pilot, Pilot course fees, DGCA requirements, CPL eligibility. This allowed the academy to attract students actively searching for solutions."
      }
    ],
    techStack: [
      { name: "Premiere Pro", category: "Creative", iconSlug: "adobepremierepro" },
      { name: "After Effects", category: "Creative", iconSlug: "adobeaftereffects" },
      { name: "AI Video", category: "AI & Automation", iconSlug: "openai" },
      { name: "CRM", category: "CRM & Communication", iconSlug: "salesforce" },
      { name: "Blog", category: "Development", iconSlug: "wordpress" },
      { name: "Instagram", category: "Analytics & Marketing", iconSlug: "instagram" },
      { name: "YouTube", category: "Analytics & Marketing", iconSlug: "youtube" }
    ],
    metric: [
      { value: "50+", label: "Qualified Leads" },
      { value: "Higher", label: "Watch Time" },
      { value: "Stronger", label: "Authority" }
    ]
  },
  {
    slug: "hazil-lifestyle",
    client: "Husain Basha",
    title: "Building a Business Guru Brand from Scratch to 16M+ Views",
    industry: "Business & Lifestyle",
    pillar: "attention",
    status: "Real Client",
    oneLine: "Transforming an offline entrepreneur into a recognizable digital business authority.",
    links: {
      website: "https://www.huslelifestyle.com/",
      youtube: "https://www.youtube.com/@ThinkBigwithHussain",
      instagram: "https://www.instagram.com/_hussain___basha/",
    },
    context: "Husain Basha is the founder of Husle Lifestyle, a business generating approximately ₹10–20 lakh in monthly recurring revenue. Despite building a successful offline business, his digital presence lacked authority. His experience wasn't visible online.",
    challenge: {
      description: "When we entered the project, the content suffered from several structural issues. The audience couldn't instantly understand who he was or why they should follow him.",
      bullets: [
        "No consistent visual identity",
        "No recognizable brand language",
        "Long-form videos with poor discoverability",
        "Weak opening hooks",
        "No clear positioning",
        "Content that educated but failed to retain viewers"
      ]
    },
    sections: [
      {
        title: "Brand Positioning",
        description: "Before touching editing, we answered one question: Who should Husain become online? The answer:",
        quote: "The Business Guru."
      },
      {
        title: "Visual Brand System",
        description: "We designed:",
        bullets: ["Brand color palette", "Typography hierarchy", "Motion graphics language", "Thumbnail system", "Intro sequences", "Editing rhythm", "Visual consistency guidelines"]
      },
      {
        title: "Content Strategy Pivot",
        description: "Our first experiment focused on long-form educational videos. The quality was high. The growth wasn't. Instead of forcing the strategy, we analyzed performance and rebuilt the system around short-form distribution. We developed:",
        bullets: ["High-retention hooks", "Business storytelling", "Trend-based execution", "Repeatable reel formats", "Faster pacing", "Platform-native editing"]
      },
      {
        title: "Creative Production",
        description: "Our team handled:",
        bullets: ["Creative direction", "Video editing", "Motion graphics", "Brand execution", "Content optimization", "Publishing workflow"]
      }
    ],
    techStack: [
      { name: "Premiere Pro", category: "Creative", iconSlug: "adobepremierepro" },
      { name: "After Effects", category: "Creative", iconSlug: "adobeaftereffects" },
      { name: "Photoshop", category: "Creative", iconSlug: "adobephotoshop" },
      { name: "Instagram", category: "Analytics & Marketing", iconSlug: "instagram" },
      { name: "YouTube", category: "Analytics & Marketing", iconSlug: "youtube" }
    ],
    metric: [
      { value: "10M+", label: "Instagram Views" },
      { value: "10K+", label: "Followers in 2 mos" },
      { value: "6M+", label: "YT Shorts Views" },
      { value: "6K+", label: "Subscribers in 1 mo" }
    ]
  },
  {
    slug: "atlas-fit",
    client: "Atlas Fit",
    title: "Replacing Manual Lead Follow-Up with an AI Operations Layer",
    industry: "Service Businesses",
    pillar: "automation",
    status: "Implementation Framework",
    oneLine: "Introducing an AI-first operations layer to never miss an inbound enquiry.",
    context: "Many gyms, clinics, coaching businesses, and service companies lose qualified leads for one simple reason: Nobody responds fast enough. Potential customers often enquire late at night, during weekends, or outside office hours. By the time a salesperson responds, the prospect has already contacted competitors.",
    challenge: {
      description: "A typical operational audit reveals severe inefficiencies in manual handling.",
      bullets: [
        "Slow response times",
        "Missed calls",
        "Manual lead qualification",
        "Staff repeatedly answering identical questions",
        "CRM updated manually",
        "High payroll dedicated to repetitive follow-up"
      ]
    },
    sections: [
      {
        title: "Proposed Solution",
        description: "Instead of hiring more sales representatives, we introduce an AI-first operations layer."
      },
      {
        title: "AI Voice Reception",
        description: "Every inbound enquiry is answered instantly by an AI voice assistant. The assistant can:",
        bullets: ["Answer FAQs", "Qualify prospects", "Collect contact details", "Book appointments", "Escalate urgent enquiries"]
      },
      {
        title: "Workflow Automation",
        description: "The voice agent connects to the business ecosystem. Every interaction automatically updates:",
        bullets: ["CRM", "Calendar", "Sales pipeline", "Follow-up tasks"]
      }
    ],
    techStack: [
      { name: "OpenAI", category: "AI & Automation", iconSlug: "openai" },
      { name: "n8n", category: "AI & Automation", iconSlug: "n8n" },
      { name: "Make", category: "AI & Automation", iconSlug: "make" },
      { name: "Twilio", category: "CRM & Communication", iconSlug: "twilio" },
      { name: "GoHighLevel", category: "CRM & Communication", iconSlug: "gohighlevel" },
      { name: "Google Calendar", category: "CRM & Communication", iconSlug: "googlecalendar" }
    ],
    metric: [
      { value: "< 1m", label: "Response Time" },
      { value: "Higher", label: "Booking Rates" },
      { value: "Lower", label: "Overhead" }
    ]
  },
  {
    slug: "ridgeway",
    client: "Ridgeway",
    title: "Rebuilding a Website Around One Conversion Goal",
    industry: "B2B SaaS / Services",
    pillar: "conversion",
    status: "Implementation Framework",
    oneLine: "Removing decision fatigue to double conversion rates.",
    context: "Many websites receive healthy traffic but still struggle to generate customers. The problem usually isn't traffic. It's decision fatigue. Visitors land on pages filled with multiple CTAs, unnecessary sections, inconsistent messaging, and confusing navigation. Every extra decision reduces conversions.",
    challenge: {
      description: "A typical audit often reveals:",
      bullets: [
        "Multiple competing buttons",
        "Weak hero messaging",
        "No trust-building sequence",
        "Pricing pages that create new objections",
        "No analytics tracking",
        "No visibility into user behaviour"
      ]
    },
    sections: [
      {
        title: "Proposed Solution",
        description: "We redesign the customer journey from first click to purchase. Every page is built around a single objective."
      },
      {
        title: "UX Simplification",
        description: "We strip the interface to focus entirely on the core action.",
        bullets: ["Single CTA", "Simplified navigation", "Improved page hierarchy", "Better mobile experience", "Faster loading"]
      },
      {
        title: "Conversion Optimization",
        description: "We rebuild the content to systematically remove buying objections.",
        bullets: ["Buyer-focused copywriting", "Objection handling", "Social proof placement", "Strong pricing explanation", "Event tracking"]
      },
      {
        title: "Analytics Layer",
        description: "Every important interaction becomes measurable.",
        bullets: ["CTA clicks", "Scroll depth", "Form completion", "Drop-off points", "Funnel progression"]
      }
    ],
    techStack: [
      { name: "Figma", category: "Creative", iconSlug: "figma" },
      { name: "React", category: "Development", iconSlug: "react" },
      { name: "Next.js", category: "Development", iconSlug: "nextdotjs" },
      { name: "Tailwind CSS", category: "Development", iconSlug: "tailwindcss" },
      { name: "PostHog", category: "Analytics & Marketing", iconSlug: "posthog" },
      { name: "Vercel", category: "Development", iconSlug: "vercel" }
    ],
    metric: [
      { value: "+112%", label: "Conversion Rate" },
      { value: "Lower", label: "Bounce Rates" },
      { value: "Faster", label: "Acquisition" }
    ]
  }
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

// =============================================================
// Per-pillar dynamic pricing — drives <PricingMatrix /> cards.
// Prices are indicative INR; tweak in one place.
// =============================================================
export type PricingOption = {
  label: string;        // segmented control label, e.g. "8 videos"
  qty: number;          // numeric value driving per-unit math
  unit: string;         // "video" | "page" | "month" | "channel" | "mins"
  price: number;        // total INR
  note?: string;        // optional under-price line
};

export type PricingTier = {
  id: string;
  name: string;
  tagline: string;
  highlight?: boolean;
  features: string[];
  cta: string;
  options: PricingOption[];
};

export const pillarPricing: Record<PillarKey, { heading: string; sub: string; tiers: PricingTier[] }> = {
  attention: {
    heading: "Pricing — Attention",
    sub: "Pick the cadence. Pricing scales with how much we ship, not how loud the deck is.",
    tiers: [
      {
        id: "simple",
        name: "Simple Edits",
        tagline: "Fast turnaround. Clean cuts. Hook-led.",
        cta: "Start simple",
        features: ["Reels / Shorts format", "Captions + SFX", "2 revisions", "48-hr turnaround"],
        options: [
          { label: "4 videos", qty: 4, unit: "video", price: 16000, note: "₹4,000 / video" },
          { label: "8 videos", qty: 8, unit: "video", price: 30400, note: "₹3,800 / video" },
          { label: "12 videos", qty: 12, unit: "video", price: 42000, note: "₹3,500 / video" },
          { label: "20 videos", qty: 20, unit: "video", price: 64000, note: "₹3,200 / video" },
        ],
      },
      {
        id: "precise",
        name: "Precise Edits",
        tagline: "Cinematic. Color-graded. Story-led.",
        highlight: true,
        cta: "Go precise",
        features: ["Color grade + sound design", "Motion graphics", "Founder-led direction", "3 revisions"],
        options: [
          { label: "4 videos", qty: 4, unit: "video", price: 28000, note: "₹7,000 / video" },
          { label: "8 videos", qty: 8, unit: "video", price: 54400, note: "₹6,800 / video" },
          { label: "12 videos", qty: 12, unit: "video", price: 78000, note: "₹6,500 / video" },
        ],
      },
      {
        id: "engine",
        name: "Content Engine",
        tagline: "Strategy + shooting direction + posting — a whole retainer.",
        cta: "Build the engine",
        features: ["90-day editorial plan", "Hook library", "Weekly publishing", "Analytics review"],
        options: [
          { label: "1 month", qty: 1, unit: "month", price: 85000, note: "Pilot sprint" },
          { label: "3 months", qty: 3, unit: "month", price: 230000, note: "₹76,600 / month" },
          { label: "6 months", qty: 6, unit: "month", price: 420000, note: "₹70,000 / month" },
        ],
      },
    ],
  },
  conversion: {
    heading: "Pricing — Conversion",
    sub: "Sites, landers and funnels — scoped to the decision you want the visitor to make.",
    tiers: [
      {
        id: "lander",
        name: "Landing Page",
        tagline: "One page. One decision. Built to convert.",
        cta: "Ship a lander",
        features: ["Custom design + copy", "Event tracking", "A/B-ready", "1-week delivery"],
        options: [
          { label: "1 page", qty: 1, unit: "page", price: 35000, note: "₹35,000 / page" },
          { label: "3 pages", qty: 3, unit: "page", price: 96000, note: "₹32,000 / page" },
          { label: "5 pages", qty: 5, unit: "page", price: 140000, note: "₹28,000 / page" },
        ],
      },
      {
        id: "site",
        name: "Full Site",
        tagline: "Brand-grade site, instrumented end-to-end.",
        highlight: true,
        cta: "Build the site",
        features: ["Design system", "CMS-ready", "Performance > 95", "Lead routing"],
        options: [
          { label: "5 pages", qty: 5, unit: "page", price: 120000, note: "₹24,000 / page" },
          { label: "8 pages", qty: 8, unit: "page", price: 180000, note: "₹22,500 / page" },
          { label: "12 pages", qty: 12, unit: "page", price: 240000, note: "₹20,000 / page" },
        ],
      },
      {
        id: "funnel",
        name: "Funnel + Copy",
        tagline: "Full sales funnel with research-backed copy.",
        cta: "Design a funnel",
        features: ["Buyer research", "Funnel architecture", "Email sequences", "Booking flow"],
        options: [
          { label: "1 funnel", qty: 1, unit: "funnel", price: 65000, note: "Single offer" },
          { label: "2 funnels", qty: 2, unit: "funnel", price: 120000, note: "₹60,000 / funnel" },
          { label: "3 funnels", qty: 3, unit: "funnel", price: 165000, note: "₹55,000 / funnel" },
        ],
      },
    ],
  },
  automation: {
    heading: "Pricing — Automation",
    sub: "AI agents and workflows priced by surface area, not seat count.",
    tiers: [
      {
        id: "chatbot",
        name: "AI Chatbot",
        tagline: "Trained on your business. Lives on web + WhatsApp.",
        cta: "Deploy a chatbot",
        features: ["Knowledge base + RAG", "Lead capture + CRM sync", "Handoff to humans", "Monthly tuning"],
        options: [
          { label: "1 channel", qty: 1, unit: "channel", price: 45000, note: "Web OR WhatsApp" },
          { label: "2 channels", qty: 2, unit: "channel", price: 72000, note: "Web + WhatsApp" },
          { label: "3 channels", qty: 3, unit: "channel", price: 95000, note: "+ Instagram DM" },
        ],
      },
      {
        id: "voice",
        name: "Voice AI Agent",
        tagline: "Answers, qualifies, books — 24/7.",
        highlight: true,
        cta: "Get the voice agent",
        features: ["Inbound + outbound", "CRM logging", "Call transcripts", "Live escalation"],
        options: [
          { label: "500 mins / mo", qty: 500, unit: "min", price: 25000, note: "₹50 / min" },
          { label: "1,500 mins / mo", qty: 1500, unit: "min", price: 52000, note: "₹35 / min" },
          { label: "3,000 mins / mo", qty: 3000, unit: "min", price: 88000, note: "₹29 / min" },
        ],
      },
      {
        id: "ops",
        name: "CRM + Workflow",
        tagline: "Pipelines, follow-ups, reporting — quietly running.",
        cta: "Wire the ops layer",
        features: ["CRM setup", "Workflow automations", "Dashboards", "Weekly review"],
        options: [
          { label: "Starter", qty: 1, unit: "month", price: 35000, note: "Up to 3 workflows" },
          { label: "Growth", qty: 1, unit: "month", price: 75000, note: "Up to 8 workflows" },
          { label: "Engine", qty: 1, unit: "month", price: 140000, note: "Unlimited + reporting" },
        ],
      },
    ],
  },
};

// =============================================================
// Testimonials
// =============================================================
export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  metric?: { label: string; value: string };
  pillar: PillarKey;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Husain Basha",
    role: "Founder",
    company: "Husle Lifestyle",
    quote: "Flogrit turned my successful business into a recognized personal brand. Their strategy generated over 16 million views across Instagram and YouTube in just weeks.",
    metric: { label: "Total Views", value: "16M+" },
    pillar: "attention",
  },
  {
    id: "t2",
    name: "Nivas",
    role: "Content Manager",
    company: "Husain Basha Team",
    quote: "Anand, I genuinely love working with you. Every project feels like you breathe a completely new life into the edit. Your creativity, fresh visual style, and ability to transform ideas into engaging content make a huge difference. You're technically very strong, incredibly reliable, and always bring something unique to the table. It's been an absolute pleasure collaborating with you, and I'm looking forward to many more projects together.",
    pillar: "attention",
  },
  {
    id: "t3",
    name: "Charan",
    role: "Content Strategist",
    company: "Husain Basha Team",
    quote: "Finding an editor who truly understands a content team's vision is incredibly rare. Anand doesn't just execute edits—he actively contributes creative ideas that elevate every video beyond expectations. His expertise in After Effects, motion design, sound design, pacing, and visual storytelling consistently improves the final product. Over the past six months, every discussion has felt collaborative rather than transactional. If you're looking for someone who combines technical excellence with genuine creative thinking, Anand is the kind of editor every content team wants.",
    pillar: "attention",
  }
];
