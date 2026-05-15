import { useI18n } from "@/lib/i18n";

export function HowItWorks() {
  const { t } = useI18n();
  const steps = [
    { n: "01", title: t("how.1.title"), body: t("how.1.body") },
    { n: "02", title: t("how.2.title"), body: t("how.2.body") },
    { n: "03", title: t("how.3.title"), body: t("how.3.body") },
  ];
  return (
    <section id="how" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {t("how.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl text-foreground sm:text-4xl">{t("how.title")}</h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-secondary/50">
              <div className="text-xs font-mono text-muted-foreground">{s.n}</div>
              <h3 className="mt-4 text-lg text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
