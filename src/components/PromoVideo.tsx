'use client';

import { useState } from "react";
import CloudImage from "./CloudImage";

export default function PromoVideo() {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="glass-panel rounded-[32px] border border-white/10 p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="space-y-4 lg:w-2/5">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-200">Promo Film</p>
          <h3 className="text-3xl font-semibold text-white">Africa In Motion</h3>
          <p className="text-white/70">
            An immersive short film capturing riders, distributors, and engineers powering African cities and
            corridors with APSONIC motorcycles.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20"
          >
            Play film
          </button>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="group relative mt-4 flex-1 overflow-hidden rounded-[28px] border border-white/10 bg-black/40"
        >
          <CloudImage
            src="/assets/images/home/img3.png"
            alt="Africa In Motion - APSONIC Promo Film"
            width={800}
            height={450}
            className="h-64 w-full object-cover opacity-70 transition duration-300 group-hover:opacity-100"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/40 bg-black/50 backdrop-blur-sm transition-transform group-hover:scale-110">
              <svg
                className="h-6 w-6 translate-x-0.5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </button>
      </div>
      {open && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={() => setOpen(false)}
        >
          <div 
            className="w-full max-w-5xl rounded-3xl border border-white/15 bg-black/70 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/S-pUpk_yjZo?autoplay=1&rel=0"
                title="Africa In Motion - APSONIC"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="text-white">
                <h4 className="text-lg font-semibold">Africa In Motion</h4>
                <p className="text-sm text-white/60">APSONIC Official Film</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-medium text-white hover:bg-white/20"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}