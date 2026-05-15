/**
 * Lightweight CSS mockup of the Hepyko app — pitch cards + activity feed.
 * Pure markup, no external assets, looks alive without being noisy.
 */
export function HeroMockup() {
  return (
    <div className="relative w-full">
      <div className="absolute -inset-8 -z-10 bg-soft-grid" aria-hidden />
      <div className="rounded-2xl border border-border bg-card shadow-[0_24px_60px_-20px_rgba(15,23,42,0.18)]">
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand pulse-dot" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            hepyko.app / feed
          </div>
          <div className="text-[11px] text-muted-foreground">⌘K</div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-5">
          {/* Pitch cards column */}
          <div className="md:col-span-3 space-y-3">
            <PitchCard
              name="Lia Moreno"
              role="Founder · Sintra Health"
              title="AI scribe for solo doctors in LATAM"
              tag="HealthTech"
              votes={142}
              comments={28}
              trending
            />
            <PitchCard
              name="Marco Vidal"
              role="Founder · Trello-for-trades"
              title="Job-site coordination for contractors"
              tag="Vertical SaaS"
              votes={87}
              comments={14}
            />
            <PitchCard
              name="Aisha Khan"
              role="Founder · Quanta"
              title="On-device LLM router for mobile apps"
              tag="DevTools"
              votes={203}
              comments={41}
            />
          </div>

          {/* Activity feed */}
          <aside className="md:col-span-2 rounded-xl border border-border bg-secondary/40 p-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wide text-foreground">Activity</span>
              <span className="text-[10px] text-muted-foreground">live</span>
            </div>
            <ul className="space-y-3 text-xs">
              <FeedItem who="Diego" did="upvoted" what="Sintra Health" />
              <FeedItem who="Camila" did="commented on" what="Quanta" />
              <FeedItem who="Tomás" did="joined" what="the community" />
              <FeedItem who="Sara" did="shared" what="Trello-for-trades" />
              <FeedItem who="Noor" did="followed" what="Lia Moreno" />
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}

function PitchCard({
  name, role, title, tag, votes, comments, trending,
}: {
  name: string; role: string; title: string; tag: string;
  votes: number; comments: number; trending?: boolean;
}) {
  return (
    <div className="group rounded-xl border border-border bg-background p-4 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-xs font-semibold text-foreground">
            {name.split(" ").map(s => s[0]).join("")}
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">{name}</div>
            <div className="text-[11px] text-muted-foreground">{role}</div>
          </div>
        </div>
        <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">{tag}</span>
      </div>
      <p className="mt-3 text-sm text-foreground">{title}</p>
      <div className="mt-3 flex items-center gap-4 text-[11px] text-muted-foreground">
        <span>▲ {votes}</span>
        <span>💬 {comments}</span>
        {trending && <span className="text-brand">• trending</span>}
      </div>
    </div>
  );
}

function FeedItem({ who, did, what }: { who: string; did: string; what: string }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/70" />
      <span className="text-muted-foreground">
        <span className="text-foreground font-medium">{who}</span> {did}{" "}
        <span className="text-foreground">{what}</span>
      </span>
    </li>
  );
}
