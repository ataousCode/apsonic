import { impactHighlights } from "@/data/home";

export default function ImpactHighlights() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {impactHighlights.map((highlight) => (
        <article key={highlight.title} className="glass-panel rounded-3xl border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-200">Impact</p>
          <h3 className="mt-3 text-xl font-semibold text-white">{highlight.title}</h3>
          <p className="mt-2 text-sm text-white/70">{highlight.description}</p>
        </article>
      ))}
    </div>
  );
}

