import { useI18n } from "@/lib/i18n";
import { trackEvent } from "@/lib/tracking";
import { HeroMockup } from "./HeroMockup";

export function Hero({ onUpload, onCommunity }: { onUpload: () => void; onCommunity: () => void }) {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pt-8 pb-10 md:pt-14 md:pb-16">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {t("hero.eyebrow")}
            </span>
            <h1 className="mt-5 text-4xl leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              {t("hero.subtitle")}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                trackEvent("cta_click", { location: "hero_primary" });
                onUpload();
              }}
              className="rounded-full bg-sky-500 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-sky-600 hover:scale-[1.02]"
            >
              {t("hero.cta")}
            </button>

            {/*
            <button
              onClick={() => {
                trackEvent("cta_click", { location: "hero_secondary" });
                onCommunity();
              }}
              className="rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {t("hero.cta2")}
            </button>
            */}
          </div>
        

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
              <span>· {t("hero.note1")}</span>
              <span>· {t("hero.note2")}</span>
              <span>· {t("hero.note3")}</span>
            </div>
          </div>

          <div className="fade-up md:pl-4">
            <HeroMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
