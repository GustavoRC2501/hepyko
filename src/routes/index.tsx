import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { VideoSection } from "@/components/VideoSection";
import { HowItWorks } from "@/components/HowItWorks";
import { Partners } from "@/components/Partners";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { OnboardingDialog } from "@/components/OnboardingDialog";
import { CookieBanner } from "@/components/CookieBanner";
import { captureAttribution, trackEvent } from "@/lib/tracking";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hepyko — Upload your pitch. Grow your startup." },
      {
        name: "description",
        content:
          "Hepyko is where founders publish their startup or project, receive real feedback, and connect with the ecosystem. Upload your pitch in under 3 minutes.",
      },
      { property: "og:title", content: "Hepyko — Upload your pitch. Grow your startup." },
      {
        property: "og:description",
        content: "Real pitches. Real feedback. Real momentum. Where founders ship in public.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

function LandingPage() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    captureAttribution();
    trackEvent("landing_view");
  }, []);

  const openForm = () => setOpen(true);
  const closeForm = () => setOpen(false);
  const goCommunity = () => {
    document.getElementById("community")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onUpload={openForm} />
      <main>
        <Hero onUpload={openForm} onCommunity={goCommunity} />
        <VideoSection />
        <HowItWorks />
        <Partners />
        <FinalCTA onUpload={openForm} />
      </main>
      <Footer />
      <OnboardingDialog open={open} onClose={closeForm} />
      <CookieBanner />
    </div>
  );
}
