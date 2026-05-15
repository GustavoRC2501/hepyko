import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Hepyko" },
      { name: "description", content: "How Hepyko collects, uses, and protects your data." },
      { property: "og:title", content: "Privacy Policy — Hepyko" },
      { property: "og:description", content: "How Hepyko collects, uses, and protects your data." },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <LegalLayout title="Privacy Policy" updated="May 2026">
      <p>This Privacy Policy explains how Hepyko ("we") handles your personal data in line with the EU GDPR and similar regulations.</p>
      <h2>Data we collect</h2>
      <p>Account data (name, email, startup name, optional LinkedIn), usage data (pages viewed, events), and attribution data (UTM parameters, partner referrals).</p>
      <h2>How we use it</h2>
      <p>To operate the platform, improve the product, communicate with you, and measure marketing effectiveness — only with your consent for non-essential purposes.</p>
      <h2>Your rights</h2>
      <p>Access, rectification, deletion, portability, and objection. Email privacy@hepyko.com to exercise them.</p>
      <h2>Retention</h2>
      <p>We retain data only as long as necessary for the purposes described or as required by law.</p>
      <h2>Contact</h2>
      <p>privacy@hepyko.com</p>
    </LegalLayout>
  ),
});
