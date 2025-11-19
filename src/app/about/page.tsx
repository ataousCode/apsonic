import { PageSection } from "@/components/ui/PageSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import CloudImage from "@/components/CloudImage";
import {
  aboutHero,
  missionVision,
  coreValues,
  milestones,
  showcaseImages,
  leadership,
  impactStats,
} from "@/data/about";

export const metadata = {
  title: "About APSONIC",
  description:
    "Quality for Better Life. APSONIC delivers durable motorcycles engineered for African roads with localized service and support.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col gap-0 bg-[var(--apsonic-ink)] pt-20">
      {/* Hero Section */}
      <PageSection className="hero-gradient min-h-[60vh] flex items-center justify-center text-center">
        <div className="max-w-4xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-emerald-200">
            {aboutHero.eyebrow}
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            {aboutHero.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            {aboutHero.description}
          </p>
        </div>
      </PageSection>

      {/* Impact Stats */}
      <PageSection className="bg-[var(--apsonic-surface)]">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {impactStats.map((stat) => (
            <div
              key={stat.label}
              className="glass-panel rounded-3xl border border-white/10 p-6 text-center"
            >
              <p className="text-3xl font-semibold text-white">{stat.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/60">
                {stat.label}
              </p>
              <p className="mt-1 text-sm text-white/50">{stat.detail}</p>
            </div>
          ))}
        </div>
      </PageSection>

      {/* Mission & Vision */}
      <PageSection className="section-gradient">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="glass-panel rounded-[32px] border border-white/10 p-10">
            <h2 className="text-2xl font-semibold text-white">
              {missionVision.mission.title}
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              {missionVision.mission.body}
            </p>
          </div>
          <div className="glass-panel rounded-[32px] border border-white/10 p-10">
            <h2 className="text-2xl font-semibold text-white">
              {missionVision.vision.title}
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              {missionVision.vision.body}
            </p>
          </div>
        </div>
      </PageSection>

      {/* Core Values */}
      <PageSection className="bg-[var(--apsonic-surface)]">
        <SectionHeader
          eyebrow="What We Stand For"
          title="Core Values"
          description="The principles that guide every decision, partnership, and innovation at APSONIC."
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {coreValues.map((value) => (
            <div
              key={value.id}
              className="glass-panel rounded-3xl border border-white/10 p-8 text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--apsonic-green)]/10 text-3xl">
                {value.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </PageSection>

      {/* Showcase Images */}
      <PageSection className="bg-[var(--apsonic-surface-alt)]">
        <SectionHeader
          eyebrow="Visual Journey"
          title="APSONIC in Action"
          description="From bustling markets to rural corridors, see how our motorcycles power African mobility."
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {showcaseImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10"
            >
              <CloudImage
                src={image.src}
                alt={image.alt}
                width={600}
                height={400}
                className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-sm font-semibold">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      {/* Milestones Timeline */}
      <PageSection className="section-gradient">
        <SectionHeader
          eyebrow="Our Journey"
          title="Milestones"
          description="Key moments in APSONIC's growth across Africa."
          align="center"
        />
        <div className="mt-12 space-y-8">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.year}
              className="glass-panel relative rounded-3xl border border-white/10 p-8 lg:flex lg:items-start lg:gap-10"
            >
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--apsonic-green)] text-xl font-bold text-black">
                  {milestone.year}
                </div>
              </div>
              <div className="mt-4 lg:mt-0">
                <h3 className="text-xl font-semibold text-white">
                  {milestone.title}
                </h3>
                <p className="mt-2 text-white/70 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
              {index < milestones.length - 1 && (
                <div className="absolute left-8 top-24 h-8 w-0.5 bg-white/10 lg:left-8" />
              )}
            </div>
          ))}
        </div>
      </PageSection>

      {/* Leadership */}
      <PageSection className="bg-[var(--apsonic-surface)]">
        <div className="glass-panel mx-auto max-w-4xl rounded-[32px] border border-white/10 p-10 text-center">
          <h2 className="text-2xl font-semibold text-white">
            {leadership.title}
          </h2>
          <p className="mt-4 text-white/70 leading-relaxed">
            {leadership.body}
          </p>
        </div>
      </PageSection>

      {/* CTA */}
      <PageSection className="section-gradient">
        <div className="glass-panel mx-auto max-w-4xl rounded-[32px] border border-white/10 p-12 text-center">
          <h2 className="text-3xl font-semibold text-white">
            Join the APSONIC Network
          </h2>
          <p className="mt-4 text-white/70">
            Explore partnership opportunities, dealerships, and fleet solutions across Africa.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="/dealers"
              className="rounded-full bg-[var(--apsonic-green)] px-8 py-3 text-base font-semibold text-black transition hover:bg-[var(--apsonic-green-dark)] hover:text-white"
            >
              Find a Dealer
            </a>
            <a
              href="/contact"
              className="rounded-full border border-white/30 bg-white/5 px-8 py-3 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Contact Us
            </a>
      </div>
    </div>
      </PageSection>
    </main>
  );
}
