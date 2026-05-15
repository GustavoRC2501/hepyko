import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useI18n } from "@/lib/i18n";
import { getAttribution, trackEvent } from "@/lib/tracking";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  startup: z.string().trim().min(1).max(120),
  linkedin: z.string().trim().max(255).optional().or(z.literal("")),
});

export function OnboardingDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      trackEvent("form_started");
      setTimeout(() => firstFieldRef.current?.focus(), 50);
      const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [open, onClose]);

  if (!open) return null;

  const onChangeAny = () => { if (!touched) setTouched(true); };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      startup: String(fd.get("startup") || ""),
      linkedin: String(fd.get("linkedin") || ""),
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      for (const issue of parsed.error.issues) map[issue.path[0] as string] = issue.message;
      setErrors(map);
      return;
    }
    setErrors({});
    const attribution = getAttribution();
    trackEvent("form_completed", { ...parsed.data, attribution });

    // Persist lead locally as a fallback (backend can be wired later)
    try {
      const leads = JSON.parse(localStorage.getItem("hepyko_leads") || "[]");
      leads.push({ ...parsed.data, attribution, at: new Date().toISOString() });
      localStorage.setItem("hepyko_leads", JSON.stringify(leads));
    } catch { /* ignore */ }

    // Continue to Google login step
    trackEvent("google_login", { method: "google" });
    // Placeholder: in production, route to /auth/google or trigger Supabase OAuth
    alert("Continuing with Google… (connect Lovable Cloud auth to enable real login)");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 px-4 backdrop-blur-sm fade-up"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5">
          <h3 className="text-xl text-foreground">{t("form.title")}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t("form.subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} onChange={onChangeAny} className="space-y-3">
          <Field name="name" label={t("form.name")} ref={firstFieldRef} error={errors.name} required />
          <Field name="email" label={t("form.email")} type="email" error={errors.email} required />
          <Field name="startup" label={t("form.startup")} error={errors.startup} required />
          <Field name="linkedin" label={t("form.linkedin")} placeholder="https://linkedin.com/in/…" />

          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <GoogleG />
            {t("form.continue")}
          </button>

          <p className="pt-1 text-center text-[11px] leading-relaxed text-muted-foreground">
            {t("form.privacy")}
          </p>
        </form>
      </div>
    </div>
  );
}

const Field = ({
  name, label, type = "text", placeholder, error, required, ...rest
}: {
  name: string; label: string; type?: string; placeholder?: string;
  error?: string; required?: boolean;
} & React.RefAttributes<HTMLInputElement>) => {
  const Input = (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      maxLength={255}
      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
      {...rest}
    />
  );
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-foreground">{label}</span>
      {Input}
      {error && <span className="mt-1 block text-[11px] text-destructive">{error}</span>}
    </label>
  );
};

function GoogleG() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.3 0-11.5-5.2-11.5-11.5S17.7 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.6 6.4 29.1 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.6 6.4 29.1 4.5 24 4.5 16.3 4.5 9.7 8.8 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 43.5c5 0 9.6-1.9 13.1-5l-6-5.1c-2 1.4-4.5 2.2-7.1 2.2-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.6 39.1 16.2 43.5 24 43.5z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4 5.3l6 5.1c-.4.4 6.7-4.9 6.7-14.4 0-1.2-.1-2.3-.4-3.5z"/>
    </svg>
  );
}
