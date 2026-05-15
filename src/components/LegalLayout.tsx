import { Header } from "./Header";
import { Footer } from "./Footer";
import type { ReactNode } from "react";

export function LegalLayout({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header onUpload={() => { window.location.href = "/"; }} />
      <main className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <h1 className="text-3xl text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-2 text-xs text-muted-foreground">Last updated: {updated}</p>
        <article className="prose prose-sm mt-8 max-w-none text-sm leading-relaxed text-foreground/90 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_p]:mt-3 [&_p]:text-muted-foreground">
          {children}
        </article>
      </main>
      <Footer />
    </div>
  );
}
