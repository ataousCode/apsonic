'use client';

import { useState } from "react";
import { PageSection } from "@/components/ui/PageSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  contactHero,
  regionalOffices,
  contactReasons,
  corporateHQ,
  contactSocialLinks,
} from "@/data/contact";
import { SocialIcon } from "@/components/ui/SocialIcon";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    reason: "",
    message: "",
  });

  const [, setSelectedCountry] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Form submission logic here (integrate with API/email service)
    console.log("Form submitted:", formData);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const primaryOffices = regionalOffices.filter((office) => office.isPrimary);
  const secondaryOffices = regionalOffices.filter((office) => !office.isPrimary);

  return (
    <main className="flex flex-col gap-0 bg-[var(--apsonic-ink)] pt-20">
      {/* Hero Section */}
      <PageSection className="hero-gradient min-h-[50vh] flex items-center justify-center text-center">
        <div className="max-w-4xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-emerald-200">
            {contactHero.eyebrow}
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            {contactHero.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            {contactHero.description}
          </p>
        </div>
      </PageSection>

      {/* Primary Regional Offices */}
      <PageSection className="bg-[var(--apsonic-surface)]">
        <SectionHeader
          eyebrow="Primary Hubs"
          title="Regional Headquarters"
          description="Our flagship offices serving major African markets with full sales, service, and training capabilities."
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {primaryOffices.map((office) => (
            <div
              key={office.id}
              className="glass-panel cursor-pointer rounded-3xl border border-white/10 p-8 transition-all hover:border-[var(--apsonic-green)]/50"
              onClick={() => setSelectedCountry(office.id)}
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl">{office.flag}</span>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {office.country}
                  </h3>
                  <p className="text-sm text-white/60">{office.city}</p>
                </div>
              </div>
              <div className="mt-6 space-y-3 text-sm text-white/70">
                <p className="flex items-start gap-2">
                  <span className="text-white/50">📍</span>
                  {office.address}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-white/50">📞</span>
                  <a
                    href={`tel:${office.phone}`}
                    className="hover:text-[var(--apsonic-green)]"
                  >
                    {office.phone}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-white/50">✉️</span>
                  <a
                    href={`mailto:${office.email}`}
                    className="hover:text-[var(--apsonic-green)]"
                  >
                    {office.email}
                  </a>
                </p>
                <div className="flex gap-2 pt-2">
                  {office.languages.map((lang) => (
                    <span
                      key={lang}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      {/* Secondary Offices */}
      <PageSection className="section-gradient">
        <SectionHeader
          eyebrow="Expanding Coverage"
          title="Regional Service Centers"
          description="Additional service hubs and distributor networks across West & Central Africa."
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {secondaryOffices.map((office) => (
            <div
              key={office.id}
              className="glass-panel rounded-3xl border border-white/10 p-6"
            >
              <div className="flex items-center gap-2">
                <span className="text-3xl">{office.flag}</span>
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {office.country}
                  </h4>
                  <p className="text-xs text-white/60">{office.city}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-xs text-white/60">
                <p className="flex items-center gap-2">
                  <span>📞</span>
                  {office.phone}
                </p>
                <p className="flex items-center gap-2">
                  <span>✉️</span>
                  {office.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      {/* Contact Form */}
      <PageSection className="bg-[var(--apsonic-surface)]">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            eyebrow="Send Us a Message"
            title="Contact Form"
            description="Fill out the form below and our regional team will respond within 24 hours."
            align="center"
          />
          <form
            onSubmit={handleSubmit}
            className="glass-panel mt-12 rounded-[32px] border border-white/10 p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white/80"
                >
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 h-12 w-full rounded-full border border-white/15 bg-black/30 px-5 text-white placeholder:text-white/40 focus:border-[var(--apsonic-green)] focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white/80"
                >
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 h-12 w-full rounded-full border border-white/15 bg-black/30 px-5 text-white placeholder:text-white/40 focus:border-[var(--apsonic-green)] focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-white/80"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-2 h-12 w-full rounded-full border border-white/15 bg-black/30 px-5 text-white placeholder:text-white/40 focus:border-[var(--apsonic-green)] focus:outline-none"
                  placeholder="+233 XX XXX XXXX"
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-white/80"
                >
                  Country *
                </label>
                <select
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-2 h-12 w-full rounded-full border border-white/15 bg-black/30 px-5 text-white focus:border-[var(--apsonic-green)] focus:outline-none"
                >
                  <option value="">Select a country</option>
                  {regionalOffices.map((office) => (
                    <option key={office.id} value={office.country}>
                      {office.flag} {office.country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6">
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-white/80"
              >
                Reason for Contact *
              </label>
              <select
                id="reason"
                name="reason"
                required
                value={formData.reason}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-full border border-white/15 bg-black/30 px-5 text-white focus:border-[var(--apsonic-green)] focus:outline-none"
              >
                <option value="">Select a reason</option>
                {contactReasons.map((reason) => (
                  <option key={reason.value} value={reason.value}>
                    {reason.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-white/80"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="mt-2 w-full rounded-3xl border border-white/15 bg-black/30 px-5 py-4 text-white placeholder:text-white/40 focus:border-[var(--apsonic-green)] focus:outline-none"
                placeholder="Tell us about your inquiry..."
              />
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="h-12 w-full rounded-full bg-[var(--apsonic-green)] px-8 text-base font-semibold text-black transition hover:bg-[var(--apsonic-green-dark)] hover:text-white sm:w-auto"
              >
                Send Message
              </button>
            </div>
        </form>
        </div>
      </PageSection>

      {/* Corporate HQ & Social */}
      <PageSection className="section-gradient">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Corporate HQ */}
          <div className="glass-panel rounded-[32px] border border-white/10 p-10">
            <h3 className="text-2xl font-semibold text-white">
              {corporateHQ.title}
            </h3>
            <div className="mt-6 space-y-3 text-white/70">
              <p className="text-lg font-medium text-white">
                {corporateHQ.company}
              </p>
              <p className="flex items-start gap-2">
                <span className="text-white/50">📍</span>
                {corporateHQ.address}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-white/50">✉️</span>
                <a
                  href={`mailto:${corporateHQ.email}`}
                  className="hover:text-[var(--apsonic-green)]"
                >
                  {corporateHQ.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-white/50">🌐</span>
                <a
                  href={`https://${corporateHQ.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--apsonic-green)]"
                >
                  {corporateHQ.website}
                </a>
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="glass-panel rounded-[32px] border border-white/10 p-10">
            <h3 className="text-2xl font-semibold text-white">
              Connect on Social Media
            </h3>
            <p className="mt-2 text-sm text-white/60">Based in Kenya, engaging across Africa</p>
            <div className="mt-6 space-y-4">
              {contactSocialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-white/70 transition hover:text-[var(--apsonic-green)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5">
                    <SocialIcon icon={link.icon} className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{link.platform}</span>
                </a>
              ))}
            </div>
      </div>
    </div>
      </PageSection>
    </main>
  );
}
