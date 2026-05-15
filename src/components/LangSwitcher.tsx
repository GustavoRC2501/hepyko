import { useI18n } from "@/lib/i18n";

export function LangSwitcher() {
  const { lang, setLang } = useI18n();
  const base = "px-2 py-1 text-xs font-medium tracking-wide transition-colors";
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-background/60 backdrop-blur">
      <button
        onClick={() => setLang("en")}
        className={`${base} rounded-full ${lang === "en" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        onClick={() => setLang("es")}
        className={`${base} rounded-full ${lang === "es" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
        aria-pressed={lang === "es"}
      >
        ES
      </button>
    </div>
  );
}
