import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Hepyko" },
      { name: "description", content: "How Hepyko uses cookies and similar technologies." },
      { property: "og:title", content: "Cookie Policy — Hepyko" },
      { property: "og:description", content: "How Hepyko uses cookies and similar technologies." },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: () => (
    <LegalLayout title="Cookie Policy" updated="May 2026">
      <p>We use a small set of cookies to make Hepyko work and to understand how it's used. You can change your choices any time by clearing the cookie banner consent in your browser storage.</p>
      <h2>Categories</h2>
      <p><strong>Essential:</strong> required for the site to function (always on).</p>
      <p><strong>Analytics:</strong> aggregated usage to improve the product (GA4 / GTM) — only with consent.</p>
      <p><strong>Tracking:</strong> attribution and conversion measurement (UTM, partner referral) — only with consent.</p>
      <p><strong>Marketing:</strong> ads measurement (Meta Pixel) — only with consent.</p>
      <h2>Manage</h2>
      <p>Use the cookie banner to accept or reject non-essential cookies. Browser settings can also block cookies entirely.</p>
    </LegalLayout>
  ),
});
