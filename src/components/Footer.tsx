import { Link } from "@tanstack/react-router";
import logo from "@/assets/hepyko-logo.png";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-10 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Hepyko" className="h-6 w-auto" />
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} Hepyko · {t("footer.rights")}</span>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link to="/terms" className="hover:text-foreground transition-colors">{t("footer.terms")}</Link>
          <Link to="/privacy" className="hover:text-foreground transition-colors">{t("footer.privacy")}</Link>
          <Link to="/cookies" className="hover:text-foreground transition-colors">{t("footer.cookies")}</Link>
          <a href="mailto:hello@hepyko.com" className="hover:text-foreground transition-colors">{t("footer.contact")}</a>
          <a href="#community" className="hover:text-foreground transition-colors">{t("footer.community")}</a>
        </nav>
      </div>
    </footer>
  );
}
