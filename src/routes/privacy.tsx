import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Flogrit" },
      { name: "description", content: "How Flogrit collects, uses and protects information shared while using flogrit.com and engaging our services." },
      { property: "og:title", content: "Privacy Policy — Flogrit" },
      { property: "og:description", content: "Privacy practices for flogrit.com and Flogrit engagements." },
    ],
  }),
  component: PrivacyPage,
});

// TODO(founder): review copy before public launch. Adjust the contact email
// and any jurisdiction-specific language if operations move outside India.

function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="Last updated: July 2026">
      <p>
        Flogrit ("Flogrit", "we", "our" or "us") operates the website{" "}
        <a href="https://flogrit.com">flogrit.com</a> and provides
        growth-system services to clients. This Privacy Policy explains what
        information we collect, how we use it, and the choices you have.
      </p>

      <H2>Information we collect</H2>
      <ul>
        <li>
          <strong>Information you give us:</strong> your name, email, phone
          number, company details and anything you share in a form, email or
          message while enquiring about or engaging our services.
        </li>
        <li>
          <strong>Information collected automatically:</strong> standard
          server and analytics data such as IP address, device type, browser,
          referring URL and pages viewed on flogrit.com. This is used to
          understand aggregate usage, not to identify individual visitors.
        </li>
        <li>
          <strong>Client project information:</strong> during an engagement
          we may receive access to accounts, assets, analytics and internal
          data you provide. This is used only to deliver the agreed work.
        </li>
      </ul>

      <H2>How we use information</H2>
      <ul>
        <li>To respond to enquiries and schedule discovery conversations.</li>
        <li>To scope, deliver and support the services you've engaged us for.</li>
        <li>To improve flogrit.com and understand what content is useful.</li>
        <li>To send occasional service-related updates. We do not run a marketing drip.</li>
      </ul>

      <H2>Sharing</H2>
      <p>
        We do not sell personal information. We share information only with
        service providers we use to operate our business (for example, hosting,
        analytics, email, scheduling and payment processors), and only to the
        extent necessary for them to provide those services. We may disclose
        information where required by law.
      </p>

      <H2>Data retention</H2>
      <p>
        We keep enquiry and project information for as long as reasonably
        necessary to run our business and meet legal obligations. Client
        project data is handled according to the engagement agreement and can
        be deleted on request once the engagement is closed.
      </p>

      <H2>Security</H2>
      <p>
        We take reasonable technical and organisational measures to protect
        the information we hold. No method of transmission or storage is 100%
        secure; we work to limit access to what is needed and to remove data
        that is no longer required.
      </p>

      <H2>Your choices</H2>
      <p>
        You can ask us to access, correct or delete information we hold about
        you by writing to <a href="mailto:flogrit.com@gmail.com">flogrit.com@gmail.com</a>.
        You can also opt out of any non-essential communications at any time.
      </p>

      <H2>Contact</H2>
      <p>
        Questions about this policy can be sent to{" "}
        <a href="mailto:flogrit.com@gmail.com">flogrit.com@gmail.com</a>.
      </p>
    </LegalShell>
  );
}

function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-3xl px-5 py-24 lg:px-8 lg:py-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Legal
        </p>
        <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.02em] md:text-6xl">
          {title}
        </h1>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {updated}
        </p>
        <div className="prose prose-invert mt-10 max-w-none text-foreground/85 [&_a]:text-primary [&_a:hover]:underline [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-2 [&_strong]:text-foreground">
          {children}
        </div>
      </div>
    </section>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 font-display text-2xl font-semibold text-foreground">
      {children}
    </h2>
  );
}
