'use client'

import { useRef, useState } from "react";
import Image from "next/image";

export default function BikeViewer({ frames }: { frames: string[] }) {
  const [index, setIndex] = useState(0);
  const dragging = useRef(false);
  const lastX = useRef(0);

  function onPointerDown(e: React.PointerEvent) {
    dragging.current = true;
    lastX.current = e.clientX;
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    if (Math.abs(dx) > 5) {
      setIndex((prev) => {
        const next = dx > 0 ? prev - 1 : prev + 1;
        const len = frames.length;
        return ((next % len) + len) % len;
      });
    }
  }

  function onPointerUp() {
    dragging.current = false;
  }

  const src = frames[index];

  return (
    <div className="glass-panel rounded-[32px] border border-white/10 p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="space-y-4 md:w-2/5">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-200">360° Viewer</p>
          <h3 className="text-3xl font-semibold text-white">Inspect the ADV 200 in ultra detail.</h3>
          <p className="text-white/70">
            Drag horizontally to orbit through the Cloudinary frame stack. Every screenshot is tuned
            for fast delivery through our CDN edge.
          </p>
          <div className="rounded-2xl border border-white/15 bg-black/30 px-5 py-3 text-sm text-white/70">
            Tip: hold shift for precision scrubbing on desktop.
          </div>
        </div>
        <div
          className="mt-6 flex-1 select-none rounded-[28px] border border-white/10 bg-black/40 p-6"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <Image src={src} alt="Bike frame" width={900} height={600} className="mx-auto h-[22rem] w-full object-contain" />
        </div>
      </div>
    </div>
  );
}