'use client';

import { useState } from "react";
import CloudImage from "./CloudImage";
import { SectionHeader } from "./ui/SectionHeader";
import {
  afconSponsorship,
  sponsorshipBenefits,
  sponsorshipTestimonial,
  sponsorshipCTA,
} from "@/data/sponsorships";

export default function AFCONSponsorship() {
  const [activeEdition, setActiveEdition] = useState(afconSponsorship.editions[0].id);

  const currentEdition = afconSponsorship.editions.find(
    (edition) => edition.id === activeEdition
  );

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-emerald-200">
          {afconSponsorship.eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          {afconSponsorship.title}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-white/70">
          {afconSponsorship.description}
        </p>
      </div>

      {/* Edition Tabs */}
      <div className="flex justify-center gap-4">
        {afconSponsorship.editions.map((edition) => (
          <button
            key={edition.id}
            onClick={() => setActiveEdition(edition.id)}
            className={`glass-panel rounded-full border px-6 py-3 text-sm font-semibold transition-all ${
              activeEdition === edition.id
                ? "border-[var(--apsonic-green)] bg-[var(--apsonic-green)]/20 text-white"
                : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"
            }`}
          >
            <span className="mr-2">{edition.flag}</span>
            AFCON {edition.year} • {edition.host}
          </button>
        ))}
      </div>

      {/* Active Edition Content */}
      {currentEdition && (
        <div className="space-y-12">
          {/* Highlights */}
          <div className="glass-panel rounded-[32px] border border-white/10 p-10">
            <h3 className="text-2xl font-semibold text-white">
              {currentEdition.status === "completed" ? "Highlights" : "What's Coming"}
            </h3>
            <ul className="mt-6 space-y-4">
              {currentEdition.highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-white/70"
                >
                  <span className="mt-1 text-[var(--apsonic-green)]">✓</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Photo Gallery */}
          <div>
            <h3 className="mb-6 text-center text-2xl font-semibold text-white">
              {currentEdition.status === "completed" ? "Event Gallery" : "Partnership Preview"}
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentEdition.gallery.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/10"
                >
                  <CloudImage
                    src={photo.src}
                    alt={photo.alt}
                    width={800}
                    height={600}
                    className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-sm font-semibold">{photo.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Benefits Grid */}
      <div>
        <SectionHeader
          eyebrow="Partnership Impact"
          title="Beyond the Pitch"
          description="How APSONIC's AFCON sponsorship drives community value and brand excellence."
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sponsorshipBenefits.map((benefit) => (
            <div
              key={benefit.title}
              className="glass-panel rounded-3xl border border-white/10 p-8 text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--apsonic-green)]/10 text-4xl">
                {benefit.icon}
              </div>
              <h4 className="mt-4 text-lg font-semibold text-white">
                {benefit.title}
              </h4>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="glass-panel mx-auto max-w-4xl rounded-[32px] border border-white/10 p-12 text-center">
        <svg
          className="mx-auto h-8 w-8 text-[var(--apsonic-green)]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <blockquote className="mt-6 text-lg italic text-white/80">
          &ldquo;{sponsorshipTestimonial.quote}&rdquo;
        </blockquote>
        <div className="mt-6">
          <p className="font-semibold text-white">
            {sponsorshipTestimonial.author}
          </p>
          <p className="text-sm text-white/60">{sponsorshipTestimonial.role}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="glass-panel mx-auto max-w-4xl rounded-[32px] border border-white/10 p-12 text-center">
        <h3 className="text-3xl font-semibold text-white">
          {sponsorshipCTA.title}
        </h3>
        <p className="mt-4 text-white/70">{sponsorshipCTA.description}</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href={sponsorshipCTA.primaryAction.href}
            className="rounded-full bg-[var(--apsonic-green)] px-8 py-3 text-base font-semibold text-black transition hover:bg-[var(--apsonic-green-dark)] hover:text-white"
          >
            {sponsorshipCTA.primaryAction.label}
          </a>
          <a
            href={sponsorshipCTA.secondaryAction.href}
            className="rounded-full border border-white/30 bg-white/5 px-8 py-3 text-base font-semibold text-white transition hover:bg-white/10"
          >
            {sponsorshipCTA.secondaryAction.label}
          </a>
        </div>
      </div>
    </div>
  );
}

