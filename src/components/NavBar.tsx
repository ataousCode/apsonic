'use client'

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { distributorCta, primaryNavLinks } from "@/data/navigation";
import LanguageSelector from "@/components/LanguageSelector";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 z-30 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-full bg-white/5 px-4 py-2">
            <Image
              src="/assets/logos/logo.png"
              alt="APSONIC Logo"
              width={96}
              height={28}
              className="h-7 w-auto"
              priority
            />
            <span className="hidden text-xs font-semibold uppercase tracking-[0.4em] text-white/70 sm:inline">
              Mobility Systems
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-white/70 md:flex">
          {primaryNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            className="ml-4 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            <Link href={distributorCta.href}>{distributorCta.label}</Link>
          </Button>
          <LanguageSelector />
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full border border-white/20 p-2 text-white md:hidden"
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </Container>
      {isOpen ? (
        <div className="border-t border-white/10 bg-black/70 pb-6 md:hidden">
          <Container>
            <nav className="flex flex-col gap-4 pt-4 text-base text-white/80">
              {primaryNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-4 py-2 transition hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                asChild
                className="mt-2 w-full rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                <Link href={distributorCta.href} onClick={() => setIsOpen(false)}>
                  {distributorCta.label}
                </Link>
              </Button>
              <div className="mt-4 flex justify-center">
                <LanguageSelector />
              </div>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}