import { serviceAdvantages } from "@/data/home";

export default function ServiceAdvantages() {
  return (
    <div className="space-y-10">
      <div className="space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-200">Service Grid</p>
        <h2 className="text-3xl font-semibold text-white">Operational assurance across the continent</h2>
        <p className="text-white/70">
          A hybrid network of OEM command centers, certified workshops, and mobile service pods keeps APSONIC fleets
          delivering across Africa.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {serviceAdvantages.map((item) => (
          <article
            key={item.title}
            className="glass-panel flex flex-col gap-4 rounded-3xl border border-white/10 p-6 text-left"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--apsonic-green)]/20 text-white">
              <span className="text-lg font-semibold">✦</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/70">{item.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
