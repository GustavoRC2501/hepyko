import { useI18n } from "@/lib/i18n";
import { trackEvent } from "@/lib/tracking";

export function FinalCTA({ onUpload }: { onUpload: () => void }) {
  const { t } = useI18n();
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-5 py-24 text-center md:py-32">
        <h2 className="text-3xl text-foreground sm:text-4xl md:text-5xl">{t("final.title")}</h2>
        <div className="mt-8">
          <button
            onClick={() => { trackEvent("cta_click", { location: "final" }); onUpload(); }}
            className="rounded-full bg-sky-500 px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-sky-600 hover:scale-[1.02]"
          >
            {t("final.cta")}
          </button>
        </div>
       
      </div>
    </section>
  );
}

