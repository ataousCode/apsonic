'use client';

import React from 'react';
import { type ProductCategory } from '@/data/products';
import { products, productCategories } from '@/data/products';
import { type SortOption } from '@/lib/productUtils';
import {
    filterByCategory,
    sortProducts,
    getProductCountByCategory,
} from '@/lib/productUtils';
import ProductHero from '@/components/ProductHero';
import ProductFilters from '@/components/ProductFilters';
import ProductGrid from '@/components/ProductGrid';
import { Container } from '@/components/ui/Container';
import { PageSection } from '@/components/ui/PageSection';

export default function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = React.useState<ProductCategory | 'all'>('all');
    const [selectedSort, setSelectedSort] = React.useState<SortOption>('featured');

    // Calculate product counts
    const productCounts = React.useMemo(() => {
        return getProductCountByCategory(products);
    }, []);

    // Filter and sort products
    const filteredAndSortedProducts = React.useMemo(() => {
        let result = filterByCategory(products, selectedCategory);
        result = sortProducts(result, selectedSort);
        return result;
    }, [selectedCategory, selectedSort]);

    // Get category info for section title
    const currentCategory = productCategories.find(cat => cat.id === selectedCategory);

    return (
        <main className="flex flex-col gap-0 bg-[var(--apsonic-ink)] pt-20">
            {/* Hero Section */}
            <ProductHero />

            {/* Products Section */}
            <PageSection className="bg-[var(--apsonic-surface)] py-16 md:py-24">
                <Container>
                    {/* Filters */}
                    <ProductFilters
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        selectedSort={selectedSort}
                        onSortChange={setSelectedSort}
                        productCounts={productCounts}
                    />

                    {/* Results Header */}
                    <div className="mt-12 flex items-baseline justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white md:text-3xl">
                                {currentCategory?.name || 'All Products'}
                            </h2>
                            <p className="mt-2 text-sm text-white/60">
                                {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'product' : 'products'} found
                            </p>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="mt-8">
                        <ProductGrid products={filteredAndSortedProducts} />
                    </div>

                    {/* Category Sections (when showing all products) */}
                    {selectedCategory === 'all' && (
                        <div className="mt-24 space-y-20">
                            {productCategories.slice(1).map((category) => {
                                const categoryProducts = filterByCategory(products, category.id as ProductCategory);
                                if (categoryProducts.length === 0) return null;

                                return (
                                    <div key={category.id} id={category.slug}>
                                        <div className="mb-8">
                                            <h2 className="text-3xl font-bold text-white">{category.name}</h2>
                                            <p className="mt-2 text-white/60">{category.description}</p>
                                        </div>
                                        <ProductGrid products={categoryProducts} priorityCount={0} />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Container>
            </PageSection>

            {/* CTA Section */}
            <PageSection className="bg-gradient-to-br from-apsonic-green/10 via-black to-black py-20">
                <Container>
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold text-white md:text-4xl">
                            Ready to find your perfect ride?
                        </h2>
                        <p className="mt-4 text-lg text-white/70">
                            Visit one of our 1,200+ certified dealers across 26 African countries to test ride
                            and purchase your APSONIC motorcycle.
                        </p>
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <a
                                href="/dealers"
                                className="inline-flex items-center justify-center rounded-full bg-apsonic-green px-8 py-4 text-base font-semibold text-black transition-all hover:bg-apsonic-green-dark hover:shadow-lg hover:shadow-apsonic-green/30"
                            >
                                Find a Dealer Near You
                                <svg
                                    className="ml-2 h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </a>
                            <a
                                href="/distributor"
                                className="inline-flex items-center justify-center rounded-full border border-apsonic-green/40 bg-apsonic-green/10 px-8 py-4 text-base font-semibold text-apsonic-green transition-all hover:bg-apsonic-green hover:text-black"
                            >
                                Become a Distributor
                            </a>
                        </div>
                    </div>
                </Container>
            </PageSection>
        </main>
    );
}
