import { useI18n } from "@/lib/i18n";

const partners = [
  "Amazon Web Services", "BePro", "BCN Entrepreneurs", "Fase Uno Startups", 
  "DIT", "NVIDIA", "UNLAM", "CloudVisor", "Open KX",
];

export function Partners() {
  const { t } = useI18n();
  return (
    <section id="community" className="border-t border-border bg-secondary/20">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {t("partners.title")}
        </p>
        <div className="relative mt-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
          <div className="marquee-track flex w-max gap-12">
            {[...partners, ...partners].map((p, i) => (
              <div
                key={i}
                className="flex h-10 items-center whitespace-nowrap text-sm font-semibold tracking-tight text-muted-foreground/70 grayscale"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
