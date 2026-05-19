import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "es";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.how": "How it works",
  "nav.community": "Community",
  "nav.upload": "Upload My Pitch",

  "hero.eyebrow": "Built by entrepreneurs. For founders.",
  "hero.title": "Your startup shouldn't grow in silence.",
  "hero.subtitle":
    "Upload your pitch on Hepyko, get real feedback, visibility, and connect with founders building real startups.",
  "hero.cta": "Upload My Pitch",
  "hero.cta2": "Join the Community",
  "hero.note1": "Takes less than 3 minutes.",
  "hero.note2": "No perfect pitch required.",
  
  "video.eyebrow": "See ideas become startups",
  "video.title": "Pitches turning into opportunities.",
  "video.caption": "Founders turning ambition into momentum.",

  "how.eyebrow": "How it works",
  "how.title": "Three steps. That's it.",
  "how.1.title": "Upload your pitch",
  "how.1.body": "Share your startup in minutes.",
  "how.2.title": "Get feedback",
  "how.2.body": "Receive comments, votes, and visibility.",
  "how.3.title": "Grow your startup",
  "how.3.body": "Connect, improve, and participate in the ecosystem.",

  "how.final": "The most voted ideas and startups will gain visibility among investors, founders, and ecosystem partners.",


  "partners.title": "Trusted by communities & partners",

  "final.title": "The best startups don't wait to be perfect to be seen.",
  "final.cta": "Upload My Pitch Now",

  "footer.terms": "Terms",
  "footer.privacy": "Privacy",
  "footer.cookies": "Cookies",
  "footer.contact": "Contact",
  "footer.community": "Community",
  "footer.rights": "All rights reserved.",

  "form.title": "Let's get your pitch live",
  "form.subtitle": "Takes less than 3 minutes. We'll never spam you.",
  "form.name": "Your name",
  "form.email": "Email",
  "form.startup": "Startup name",
  "form.linkedin": "LinkedIn (optional)",
  "form.continue": "Continue with Google",
  "form.privacy": "By continuing you agree to our Terms and Privacy Policy.",

  "cookies.text":
    "We use cookies for analytics and to improve your experience. You're in control.",
  "cookies.accept": "Accept all",
  "cookies.reject": "Reject non-essential",
  "cookies.settings": "Settings",
};

const es: Dict = {
  "nav.how": "Cómo funciona",
  "nav.community": "Comunidad",
  "nav.upload": "Subir mi pitch",

  "hero.eyebrow": "Hecho por emprendedores. Para founders.",
  "hero.title": "Tu startup no debería crecer en silencio.",
  "hero.subtitle":
    "Sube tu pitch en Hepyko, recibe feedback real, gana visibilidad y conecta con founders construyendo startups reales.",
  "hero.cta": "Subir mi pitch",
  "hero.cta2": "Unirme a la comunidad",
  "hero.note1": "Toma menos de 3 minutos.",
  "hero.note2": "No se requiere un pitch perfecto.",


  "video.eyebrow": "Donde las ideas salen al mundo",
  "video.title": "Pitches que se convierten en oportunidades.",
  "video.caption": "Ideas reales. Feedback real. Momentum real.",

  "how.eyebrow": "Cómo funciona",
  "how.title": "Tres pasos. Eso es todo.",
  "how.1.title": "Sube tu pitch",
  "how.1.body": "Comparte tu startup en minutos.",
  "how.2.title": "Recibe feedback",
  "how.2.body": "Comentarios, votos y visibilidad.",
  "how.3.title": "Haz crecer tu startup",
  "how.3.body": "Conecta, mejora y participa del ecosistema.",

  "how.final": "Las ideas y startups más votadas obtendrán visibilidad frente a inversores, founders y partners del ecosistema.",

  "partners.title": "Comunidades y partners que confían en nosotros",

  "final.title": "Las mejores startups no esperan a ser perfectas para ser vistas.",
  "final.cta": "Subir mi pitch ahora",

  "footer.terms": "Términos",
  "footer.privacy": "Privacidad",
  "footer.cookies": "Cookies",
  "footer.contact": "Contacto",
  "footer.community": "Comunidad",
  "footer.rights": "Todos los derechos reservados.",

  "form.title": "Pongamos tu pitch en vivo",
  "form.subtitle": "Menos de 3 minutos. Nunca te enviaremos spam.",
  "form.name": "Tu nombre",
  "form.email": "Email",
  "form.startup": "Nombre de la startup",
  "form.linkedin": "LinkedIn (opcional)",
  "form.continue": "Continuar con Google",
  "form.privacy": "Al continuar aceptas nuestros Términos y Política de Privacidad.",

  "cookies.text":
    "Usamos cookies para analítica y mejorar tu experiencia. Tú decides.",
  "cookies.accept": "Aceptar todo",
  "cookies.reject": "Rechazar no esenciales",
  "cookies.settings": "Ajustes",
};

const dicts: Record<Lang, Dict> = { en, es };

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: keyof typeof en) => string;
}

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("hepyko_lang") as Lang | null;
    if (saved === "en" || saved === "es") setLangState(saved);
    else {
      const browser = navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
      setLangState(browser);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("hepyko_lang", l);
  };

  const t = (k: keyof typeof en) => dicts[lang][k] ?? en[k] ?? String(k);
  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
