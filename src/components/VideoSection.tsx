import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { trackEvent } from "@/lib/tracking";

const VIDEO_SRC = "src/assets/stage1pitch.mp4";

export function VideoSection() {
  const { t } = useI18n();
  const ref = useRef<HTMLVideoElement>(null);
  const [played, setPlayed] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {/* autoplay blocked is fine */});
          if (!played) {
            trackEvent("video_play");
            setPlayed(true);
          }
        } else {
          el.pause();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [played]);

  return (
    <section className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {t("video.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl text-foreground sm:text-4xl">{t("video.title")}</h2>
          <p className="mt-3 text-sm text-muted-foreground">{t("video.caption")}</p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-foreground/95 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)]">
            {!failed ? (
              <video
                ref={ref}
                className="aspect-video w-full object-cover"
                src={VIDEO_SRC}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                onError={() => setFailed(true)}
              />
            ) : (
              <div className="grid aspect-video w-full place-items-center bg-gradient-to-br from-foreground to-zinc-700 text-background/80">
                <div className="text-center">
                  <div className="text-4xl">▶</div>
                  <div className="mt-2 text-sm opacity-80">Join Hepyko</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
