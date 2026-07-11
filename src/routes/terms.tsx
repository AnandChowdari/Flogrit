import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Flogrit" },
      { name: "description", content: "The terms under which Flogrit provides services and access to flogrit.com." },
      { property: "og:title", content: "Terms of Service — Flogrit" },
      { property: "og:description", content: "Service terms for Flogrit engagements and flogrit.com." },
    ],
  }),
  component: TermsPage,
});

// TODO(founder): review before public launch. Confirm governing-law
// jurisdiction and any specific engagement-level terms that override these
// general terms.

function TermsPage() {
  return (
    <LegalShell title="Terms of Service" updated="Last updated: July 2026">
      <p>
        These Terms of Service ("Terms") govern your use of flogrit.com and
        the services provided by Flogrit ("Flogrit", "we", "our" or "us").
        By using the site or engaging us to deliver services, you agree to
        these Terms.
      </p>

      <H2>Services</H2>
      <p>
        Flogrit designs and delivers growth-system services across three
        pillars: Attention, Conversion and Automation. The scope, deliverables,
        timelines and fees for any engagement are agreed in writing before
        work begins, in a proposal or statement of work.
      </p>

      <H2>Engagements and payment</H2>
      <ul>
        <li>Engagements begin only after a written scope and fee are agreed.</li>
        <li>
          Fees, payment schedule, milestones and any retainers are described
          in the applicable proposal or statement of work.
        </li>
        <li>
          Late payments may result in work being paused until the account is
          brought current.
        </li>
        <li>All fees are exclusive of applicable taxes unless stated otherwise.</li>
      </ul>

      <H2>Client responsibilities</H2>
      <p>
        Delivery depends on timely access to accounts, assets, brand
        information, approvals and points of contact. Delays caused by
        pending inputs may shift timelines and are not treated as missed
        commitments on our side.
      </p>

      <H2>Intellectual property</H2>
      <ul>
        <li>
          Final deliverables produced during an engagement transfer to the
          client on full payment of the applicable fees.
        </li>
        <li>
          Flogrit retains ownership of pre-existing tools, templates,
          workflows, prompts and internal methods used to deliver the work.
        </li>
        <li>
          Unless we agree otherwise in writing, Flogrit may reference the
          engagement (client name, high-level outcomes, non-confidential
          creative) in portfolios and case studies.
        </li>
      </ul>

      <H2>Confidentiality</H2>
      <p>
        Each party will treat non-public information received from the other
        as confidential and use it only to perform the engagement.
      </p>

      <H2>Warranties and liability</H2>
      <p>
        We deliver services with professional care but do not guarantee any
        specific business outcome (for example, leads, sales, rankings or
        revenue). To the maximum extent permitted by law, Flogrit's total
        liability under any engagement is limited to the fees paid for the
        specific deliverable that gave rise to the claim. We are not liable
        for indirect, consequential or incidental damages.
      </p>

      <H2>Termination</H2>
      <p>
        Either party may terminate an engagement in accordance with the
        applicable proposal or statement of work. Fees earned up to the date
        of termination remain payable. Refund treatment is described in our{" "}
        <a href="/refund-policy">Refund Policy</a>.
      </p>

      <H2>Site use</H2>
      <p>
        You agree to use flogrit.com only for lawful purposes and not to
        misuse the site, its content or its infrastructure. Content on the
        site is provided for general information and does not create a
        contractual commitment on its own.
      </p>

      <H2>Governing law</H2>
      <p>
        These Terms are governed by the laws of India. Any disputes will be
        subject to the exclusive jurisdiction of the courts of Hyderabad,
        India.
      </p>

      <H2>Contact</H2>
      <p>
        Questions about these Terms can be sent to{" "}
        <a href="mailto:hello@flogrit.com">hello@flogrit.com</a>.
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
        <div className="mt-10 text-foreground/85 [&_a]:text-primary [&_a:hover]:underline [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-2 [&_strong]:text-foreground">
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
