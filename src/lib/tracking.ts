/**
 * Tracking + attribution utilities for Hepyko.
 *
 * - First-touch UTM / partner attribution stored in localStorage.
 * - Event dispatch to GA4 (gtag), GTM (dataLayer), and Meta Pixel (fbq).
 * - Hooks ready: set window.GA4_ID, window.GTM_ID, window.META_PIXEL_ID before load
 *   or wire them at deploy time. Calls are no-ops if providers aren't installed.
 */

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  ref?: string;
  partner_id?: string;
  landing_version?: string;
  first_touch_at?: string;
  landing_path?: string;
  referrer?: string;
};

const STORAGE_KEY = "hepyko_attribution";
const LANDING_VERSION = "v1";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const url = new URL(window.location.href);
  const params = url.searchParams;

  const incoming: Attribution = {
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    utm_term: params.get("utm_term") ?? undefined,
    utm_content: params.get("utm_content") ?? undefined,
    ref: params.get("ref") ?? undefined,
    partner_id: params.get("partner_id") ?? params.get("ref") ?? undefined,
    landing_version: LANDING_VERSION,
    landing_path: url.pathname,
    referrer: document.referrer || undefined,
  };

  // First-touch: only write if nothing stored yet
  const existingRaw = localStorage.getItem(STORAGE_KEY);
  if (!existingRaw) {
    const payload = { ...incoming, first_touch_at: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return payload;
  }

  try {
    const existing = JSON.parse(existingRaw) as Attribution;
    // Merge non-destructively: keep first-touch values, only fill missing keys
    const merged: Attribution = { ...incoming, ...existing };
    return merged;
  } catch {
    const payload = { ...incoming, first_touch_at: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return payload;
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") as Attribution;
  } catch {
    return {};
  }
}

export type EventName =
  | "landing_view"
  | "video_play"
  | "cta_click"
  | "form_started"
  | "form_completed"
  | "google_login"
  | "onboarding_completed"
  | "pitch_uploaded";

export function trackEvent(name: EventName, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const payload = { event: name, ...props, attribution: getAttribution() };

  // GTM
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  // GA4
  if (typeof window.gtag === "function") {
    window.gtag("event", name, props as Record<string, unknown>);
  }

  // Meta Pixel — map a few key events
  if (typeof window.fbq === "function") {
    if (name === "form_completed" || name === "onboarding_completed") {
      window.fbq("track", "Lead");
    } else if (name === "pitch_uploaded") {
      window.fbq("track", "CompleteRegistration");
    } else {
      window.fbq("trackCustom", name, props);
    }
  }

  // Always log in dev for visibility
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log("[track]", name, payload);
  }
}
