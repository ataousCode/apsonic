'use client';

import CloudImage from "./CloudImage";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

type Item = { id: string; name: string; imageSrc: string; specs: string; slug: string };

export default function ModelsCarousel({ items }: { items: Item[] }) {
  return (
    <div className="mt-10 flex gap-6 overflow-x-auto pb-6">
      {items.map((item) => (
        <article
          key={item.id}
          className="glass-panel relative w-[320px] shrink-0 rounded-3xl border border-white/5 p-6"
        >
          <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-gradient-to-tr from-white/10 to-white/5">
            <CloudImage
              src={item.imageSrc}
              alt={item.name}
              width={512}
              height={320}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="mt-6 space-y-3">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/60">Category</p>
              <h3 className="text-2xl font-semibold text-white">{item.name}</h3>
            </div>
            <p className="text-sm text-white/70">{item.specs}</p>
            <Button
              asChild
              className="w-full rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/20"
            >
              <Link href={`/products/${item.slug}`}>View platform</Link>
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}