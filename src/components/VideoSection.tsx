import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { trackEvent } from "@/lib/tracking";

import VIDEO_SRC from "../assets/stage1pitch.mp4?url";
import VIDEO_POSTER from "../assets/stage1pitch.png?url";

export function VideoSection() {
  const { t } = useI18n();
  const ref = useRef<HTMLVideoElement>(null);
  const [played, setPlayed] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const startPlayback = async () => {
    const el = ref.current;
    if (!el) return;

    try {
      await el.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
      return;
    }

    if (!played) {
      trackEvent("video_play");
      setPlayed(true);
    }
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void startPlayback();
        } else {
          el.pause();
          setIsPlaying(false);
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
              <>
                <video
                  ref={ref}
                  className="aspect-video w-full object-cover"
                  src={VIDEO_SRC}
                  poster={VIDEO_POSTER}
                  muted
                  defaultMuted
                  loop
                  playsInline
                  autoPlay
                  preload="auto"
                  onLoadedMetadata={() => {
                    void startPlayback();
                  }}
                  onCanPlay={() => {
                    void startPlayback();
                  }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onError={() => setFailed(true)}
                />
                {!isPlaying ? (
                  <button
                    type="button"
                    onClick={() => {
                      void startPlayback();
                    }}
                    className="absolute inset-0 grid place-items-center bg-black/18 text-white transition-colors hover:bg-black/26"
                    aria-label="Play video"
                  >
                    <span className="grid h-16 w-16 place-items-center rounded-full border border-white/30 bg-white/15 text-2xl shadow-lg backdrop-blur-sm">
                      ▶
                    </span>
                  </button>
                ) : null}
              </>
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
