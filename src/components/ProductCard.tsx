'use client';

import React from 'react';
import Link from 'next/link';
import { type Product } from '@/data/products';
import CloudImage from './CloudImage';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';
import {
    formatPrice,
    formatEngineSize,
    getEnginePower,
    getAvailabilityBadge,
    getAvailabilityColor,
    isInStock,
} from '@/lib/productUtils';

type ProductCardProps = {
    product: Product;
    className?: string;
    priority?: boolean;
};

export default function ProductCard({ product, className, priority = false }: ProductCardProps) {
    const cardRef = React.useRef<HTMLElement>(null);

    return (
        <article
            ref={cardRef}
            className={cn(
                'group relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 transition-all duration-300 hover:border-apsonic-green/50 hover:shadow-lg hover:shadow-apsonic-green/10',
                className
            )}
        >
            {/* Product Image */}
            <Link href={`/products/${product.slug}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                    <CloudImage
                        src={product.images.hero}
                        alt={product.name}
                        width={600}
                        height={450}
                        priority={priority}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.badge && (
                            <span className="rounded-full border border-apsonic-green/30 bg-apsonic-green/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-apsonic-green">
                                {product.badge}
                            </span>
                        )}
                        {product.featured && (
                            <span className="rounded-full border border-yellow-500/30 bg-yellow-500/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-400">
                                Featured
                            </span>
                        )}
                    </div>

                    {/* Availability Badge */}
                    <div className="absolute top-4 right-4">
                        <span
                            className={cn(
                                'rounded-full border backdrop-blur-sm px-3 py-1.5 text-xs font-semibold uppercase tracking-wider',
                                getAvailabilityColor(product)
                            )}
                        >
                            {getAvailabilityBadge(product)}
                        </span>
                    </div>

                    {/* Category */}
                    <div className="absolute bottom-4 left-4">
                        <span className="rounded-full border border-white/20 bg-black/40 backdrop-blur-sm px-3 py-1 text-xs uppercase tracking-wider text-white/70">
                            {product.category}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Content */}
            <div className="p-6">
                {/* Header */}
                <Link href={`/products/${product.slug}`} className="block">
                    <h3 className="text-2xl font-semibold text-white transition-colors group-hover:text-apsonic-green">
                        {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-white/60">{product.tagline}</p>
                </Link>

                {/* Description */}
                <p className="mt-3 text-sm text-white/70 line-clamp-2">{product.description.short}</p>

                {/* Specifications */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <p className="text-xs uppercase tracking-wider text-white/50">Engine</p>
                        <p className="mt-1 text-sm font-semibold text-white">{formatEngineSize(product)}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <p className="text-xs uppercase tracking-wider text-white/50">Power</p>
                        <p className="mt-1 text-sm font-semibold text-white">{getEnginePower(product)}</p>
                    </div>
                </div>

                {/* Price */}
                <div className="mt-4 flex items-baseline justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-wider text-white/50">Starting at</p>
                        <p className="mt-1 text-2xl font-bold text-apsonic-green">
                            {formatPrice(product.price.amount, product.price.currency)}
                        </p>
                        {product.price.note && (
                            <p className="mt-0.5 text-xs text-white/40">{product.price.note}</p>
                        )}
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="mt-5 flex gap-2">
                    <Button
                        asChild
                        className="flex-1 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90 transition-all shadow-md shadow-white/10"
                    >
                        <Link href={`/products/${product.slug}`}>View Details</Link>
                    </Button>
                    {isInStock(product) && (
                        <Button
                            asChild
                            variant="outline"
                            className="rounded-full border-apsonic-green/40 bg-apsonic-green/10 px-4 py-2.5 text-sm font-semibold text-apsonic-green hover:bg-apsonic-green hover:text-black transition-all"
                        >
                            <Link href="/dealers">Find Dealer</Link>
                        </Button>
                    )}
                </div>

                {/* Target Use Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                    {product.targetUse.slice(0, 3).map((use) => (
                        <span
                            key={use}
                            className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/50 transition-colors hover:border-apsonic-green/50 hover:text-apsonic-green"
                        >
                            {use}
                        </span>
                    ))}
                    {product.targetUse.length > 3 && (
                        <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/50">
                            +{product.targetUse.length - 3} more
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
}
