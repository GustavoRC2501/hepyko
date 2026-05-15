import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Hepyko" },
      { name: "description", content: "The terms governing your use of Hepyko." },
      { property: "og:title", content: "Terms & Conditions — Hepyko" },
      { property: "og:description", content: "The terms governing your use of Hepyko." },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <LegalLayout title="Terms & Conditions" updated="May 2026">
      <p>Welcome to Hepyko. By accessing or using our platform you agree to these Terms.</p>
      <h2>1. Use of the platform</h2>
      <p>Hepyko provides a community where founders can publish pitches, receive feedback, and connect with the ecosystem. You agree to use the platform respectfully and in compliance with applicable laws.</p>
      <h2>2. Your content</h2>
      <p>You retain ownership of pitches and content you upload. By posting, you grant Hepyko a non-exclusive license to display and distribute that content on the platform.</p>
      <h2>3. Account</h2>
      <p>You are responsible for the accuracy of the information you provide and for keeping your account credentials secure.</p>
      <h2>4. Termination</h2>
      <p>We may suspend accounts that violate these Terms or harm the community.</p>
      <h2>5. Contact</h2>
      <p>Questions? Email hello@hepyko.com.</p>
    </LegalLayout>
  ),
});
