'use client';

import React from 'react';
import { type Product } from '@/data/products';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';
import { useStaggerOnScroll } from '@/hooks/useScrollAnimation';

type ProductGridProps = {
    products: Product[];
    className?: string;
    emptyMessage?: string;
    priorityCount?: number;
};

export default function ProductGrid({
    products,
    className,
    emptyMessage = 'No products found matching your criteria.',
    priorityCount = 3,
}: ProductGridProps) {
    const gridRef = useStaggerOnScroll<HTMLDivElement>(0.1, true);

    if (products.length === 0) {
        return (
            <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-white/10 bg-black/20 p-12">
                <div className="text-center">
                    <div className="mb-4 text-6xl">🏍️</div>
                    <h3 className="text-xl font-semibold text-white">{emptyMessage}</h3>
                    <p className="mt-2 text-sm text-white/60">
                        Try adjusting your filters or search criteria.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={gridRef}
            className={cn(
                'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3',
                className
            )}
        >
            {products.map((product, index) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    priority={index < priorityCount}
                />
            ))}
        </div>
    );
}
