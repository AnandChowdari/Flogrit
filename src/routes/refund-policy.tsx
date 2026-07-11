import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Flogrit" },
      { name: "description", content: "How Flogrit handles refunds for service engagements across Attention, Conversion and Automation." },
      { property: "og:title", content: "Refund Policy — Flogrit" },
      { property: "og:description", content: "Refund policy for Flogrit service engagements." },
    ],
  }),
  component: RefundPage,
});

// TODO(founder): review before public launch. Confirm the position on
// milestone-level refunds for each pillar matches how engagements are
// actually invoiced.

function RefundPage() {
  return (
    <LegalShell title="Refund Policy" updated="Last updated: July 2026">
      <p>
        This Refund Policy applies to services delivered by Flogrit
        ("Flogrit", "we", "our" or "us") under a written proposal or
        statement of work. It is separate from the terms of any product sold
        under the Captiongrit brand, which has its own refund terms.
      </p>

      <H2>Nature of our services</H2>
      <p>
        Flogrit provides bespoke, service-based work: strategy, creative,
        engineering and implementation hours delivered against an agreed
        scope. Once work begins, time and creative effort are committed to
        the engagement and generally cannot be recovered.
      </p>

      <H2>Baseline position</H2>
      <p>
        Fees for services already performed are non-refundable. This includes
        discovery, planning, strategy, design, production, engineering,
        implementation and delivery time that has been invested in the
        engagement.
      </p>

      <H2>Before work begins</H2>
      <p>
        If an engagement has been paid for but no work has yet started, a
        full refund of the applicable fee will be issued on written request.
      </p>

      <H2>Per-pillar delivery notes</H2>
      <ul>
        <li>
          <strong>Attention</strong> — content, editing and creative retainers
          are billed against a delivery cadence (for example, a number of
          videos or a monthly editorial cycle). Fees for cycles that have not
          yet started can be paused or refunded on written request; fees for
          cycles already in production are non-refundable.
        </li>
        <li>
          <strong>Conversion</strong> — websites, funnels, landing pages and
          copy are billed against milestones (for example, discovery, design,
          build, launch). Completed milestones are non-refundable; unstarted
          milestones can be cancelled on written request.
        </li>
        <li>
          <strong>Automation</strong> — implementation work is billed against
          the systems being wired up. Once a workflow, agent or integration
          has been built, that portion of the fee is non-refundable, even if
          the client later chooses not to run it.
        </li>
      </ul>

      <H2>Third-party costs</H2>
      <p>
        Fees paid on the client's behalf to third-party platforms (hosting,
        AI models, CRMs, telephony, ad spend, stock, software licences and
        similar) are non-refundable once those services have been provisioned
        or consumed.
      </p>

      <H2>Chargebacks</H2>
      <p>
        Please contact us before initiating a chargeback. Most disputes are
        resolved directly and faster over email than through a payment
        provider.
      </p>

      <H2>How to request a refund</H2>
      <p>
        Send a written request to{" "}
        <a href="mailto:hello@flogrit.com">hello@flogrit.com</a> that includes
        the engagement name, the invoice reference and a short description of
        what is being requested. Approved refunds are processed within 14
        business days to the original payment method, subject to any charges
        applied by the payment provider.
      </p>

      <H2>Changes to this policy</H2>
      <p>
        Any material change to this Refund Policy will be reflected on this
        page with an updated date. The policy that applies to an engagement
        is the one in effect when the engagement is signed.
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
