'use client';

import React from 'react';
import { type ProductCategory } from '@/data/products';
import { type SortOption } from '@/lib/productUtils';
import { cn } from '@/lib/utils';

type ProductFiltersProps = {
    selectedCategory: ProductCategory | 'all';
    onCategoryChange: (category: ProductCategory | 'all') => void;
    selectedSort: SortOption;
    onSortChange: (sort: SortOption) => void;
    productCounts: Record<ProductCategory | 'all', number>;
    className?: string;
};

const categories = [
    { id: 'all' as const, name: 'All Products', icon: '🏍️' },
    { id: 'cubs' as const, name: 'Cubs', icon: '🛵' },
    { id: 'street' as const, name: 'Street Bikes', icon: '🏁' },
    { id: 'tricycles' as const, name: 'Tricycles', icon: '🚛' },
];

const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'featured', label: 'Featured First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
    { value: 'engine-asc', label: 'Engine: Small to Large' },
    { value: 'engine-desc', label: 'Engine: Large to Small' },
];

export default function ProductFilters({
    selectedCategory,
    onCategoryChange,
    selectedSort,
    onSortChange,
    productCounts,
    className,
}: ProductFiltersProps) {
    return (
        <div className={cn('space-y-6', className)}>
            {/* Category Filters */}
            <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">
                    Categories
                </h3>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {categories.map((category) => {
                        const isSelected = selectedCategory === category.id;
                        const count = productCounts[category.id] || 0;

                        return (
                            <button
                                key={category.id}
                                onClick={() => onCategoryChange(category.id)}
                                className={cn(
                                    'group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300',
                                    isSelected
                                        ? 'border-apsonic-green bg-apsonic-green/10 shadow-lg shadow-apsonic-green/20'
                                        : 'border-white/10 bg-white/5 hover:border-apsonic-green/50 hover:bg-white/10'
                                )}
                            >
                                {/* Icon */}
                                <div className="mb-2 text-3xl">{category.icon}</div>

                                {/* Name */}
                                <div className="flex items-baseline justify-between">
                                    <h4
                                        className={cn(
                                            'text-sm font-semibold transition-colors',
                                            isSelected ? 'text-apsonic-green' : 'text-white group-hover:text-apsonic-green'
                                        )}
                                    >
                                        {category.name}
                                    </h4>
                                    <span
                                        className={cn(
                                            'text-xs font-medium',
                                            isSelected ? 'text-apsonic-green' : 'text-white/50'
                                        )}
                                    >
                                        {count}
                                    </span>
                                </div>

                                {/* Selection Indicator */}
                                {isSelected && (
                                    <div className="absolute top-2 right-2">
                                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-apsonic-green">
                                            <svg
                                                className="h-3 w-3 text-black"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={3}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Sort Options */}
            <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">
                    Sort By
                </h3>
                <div className="relative">
                    <select
                        value={selectedSort}
                        onChange={(e) => onSortChange(e.target.value as SortOption)}
                        className="w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 pr-10 text-sm text-white transition-all hover:border-apsonic-green/50 focus:border-apsonic-green focus:outline-none focus:ring-2 focus:ring-apsonic-green/20"
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value} className="bg-black text-white">
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                        <svg
                            className="h-4 w-4 text-white/50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
