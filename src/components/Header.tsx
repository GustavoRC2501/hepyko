import { Link } from "@tanstack/react-router";
import logo from "@/assets/hepyko-logo.png";
import { LangSwitcher } from "./LangSwitcher";
import { useI18n } from "@/lib/i18n";
import { trackEvent } from "@/lib/tracking";

export function Header({ onUpload }: { onUpload: () => void }) {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Hepyko" className="h-7 w-auto" />
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#how" className="hover:text-foreground transition-colors">{t("nav.how")}</a>
          <a href="#community" className="hover:text-foreground transition-colors">{t("nav.community")}</a>
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitcher />
          <button
            onClick={() => { trackEvent("cta_click", { location: "header" }); onUpload(); }}
            className="hidden rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 sm:inline-flex"
          >
            {t("nav.upload")}
          </button>
        </div>
      </div>
    </header>
  );
}
