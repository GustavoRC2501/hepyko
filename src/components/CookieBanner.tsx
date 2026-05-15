import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

type Consent = { analytics: boolean; tracking: boolean; marketing: boolean; at: string };
const KEY = "hepyko_consent";

export function CookieBanner() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);

  const save = (c: Omit<Consent, "at">) => {
    const payload: Consent = { ...c, at: new Date().toISOString() };
    localStorage.setItem(KEY, JSON.stringify(payload));
    // Notify any listeners (GA/GTM bootstrap could read this)
    window.dispatchEvent(new CustomEvent("hepyko:consent", { detail: payload }));
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-xl border border-border bg-background/95 p-4 shadow-xl backdrop-blur fade-up">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted-foreground">
          {t("cookies.text")}{" "}
          <Link to="/cookies" className="underline hover:text-foreground">
            {t("footer.cookies")}
          </Link>
        </p>
        <div className="flex flex-shrink-0 gap-2">
          <button
            onClick={() => save({ analytics: false, tracking: false, marketing: false })}
            className="rounded-full border border-border px-3 py-1.5 text-xs text-foreground hover:bg-secondary"
          >
            {t("cookies.reject")}
          </button>
          <button
            onClick={() => save({ analytics: true, tracking: true, marketing: true })}
            className="rounded-full bg-foreground px-3 py-1.5 text-xs text-background hover:opacity-90"
          >
            {t("cookies.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
