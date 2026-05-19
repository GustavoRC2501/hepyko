import { useEffect } from "react";

export function OnboardingDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 px-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
 


<div
  className="relative w-full max-w-3xl rounded-2xl border border-border bg-background p-3 shadow-2xl"
  onClick={(e) => e.stopPropagation()}
>
  <button
    onClick={onClose}
    className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white transition-opacity hover:opacity-80"
    aria-label="Close"
  >
    ✕
  </button>





      <div className="h-[85vh] overflow-y-auto rounded-xl">
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/jgKMVLk0OutByW4hpCE0"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "8px",
            }}
            id="inline-jgKMVLk0OutByW4hpCE0"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-activation-type="alwaysActivated"
            data-deactivation-type="neverDeactivate"
            data-form-name="Form 0"
            data-height="549"
            data-layout-iframe-id="inline-jgKMVLk0OutByW4hpCE0"
            data-form-id="jgKMVLk0OutByW4hpCE0"
            title="Onboarding Form"
          />
        </div>
      </div>
    </div>
  );
}