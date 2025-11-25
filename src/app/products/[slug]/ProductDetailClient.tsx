'use client';

import React from 'react';
import Link from 'next/link';
import { type Product } from '@/data/products';
import { products } from '@/data/products';
import CloudImage from '@/components/CloudImage';
import { Container } from '@/components/ui/Container';
import { PageSection } from '@/components/ui/PageSection';
import { Button } from '@/components/ui/Button';
import ProductGrid from '@/components/ProductGrid';
import { cn } from '@/lib/utils';
import {
    formatPrice,
    getAvailabilityBadge,
    getAvailabilityColor,
    isInStock,
    getRelatedProducts,
    getCategoryName,
} from '@/lib/productUtils';

type ProductDetailClientProps = {
    product: Product;
};

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const [selectedImage, setSelectedImage] = React.useState(0);
    const relatedProducts = getRelatedProducts(products, product, 3);

    return (
        <main className="flex flex-col gap-0 bg-[var(--apsonic-ink)] pt-20">
            {/* Breadcrumb */}
            <PageSection className="bg-[var(--apsonic-surface)] py-6">
                <Container>
                    <nav className="flex items-center gap-2 text-sm text-white/60">
                        <Link href="/" className="hover:text-apsonic-green transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/products" className="hover:text-apsonic-green transition-colors">
                            Products
                        </Link>
                        <span>/</span>
                        <Link
                            href={`/products#${product.category}`}
                            className="hover:text-apsonic-green transition-colors"
                        >
                            {getCategoryName(product.category)}
                        </Link>
                        <span>/</span>
                        <span className="text-white">{product.name}</span>
                    </nav>
                </Container>
            </PageSection>

            {/* Product Detail */}
            <PageSection className="bg-[var(--apsonic-surface)] py-12 md:py-20">
                <Container>
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        {/* Image Gallery */}
                        <div>
                            {/* Main Image */}
                            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-black/40">
                                <CloudImage
                                    src={product.images.gallery[selectedImage]}
                                    alt={`${product.name} - Image ${selectedImage + 1}`}
                                    width={800}
                                    height={600}
                                    priority
                                    className="h-full w-full object-cover"
                                />

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {product.badge && (
                                        <span className="rounded-full border border-apsonic-green/30 bg-apsonic-green/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-apsonic-green">
                                            {product.badge}
                                        </span>
                                    )}
                                    <span
                                        className={cn(
                                            'rounded-full border backdrop-blur-sm px-3 py-1.5 text-xs font-semibold uppercase tracking-wider',
                                            getAvailabilityColor(product)
                                        )}
                                    >
                                        {getAvailabilityBadge(product)}
                                    </span>
                                </div>
                            </div>

                            {/* Thumbnail Gallery */}
                            <div className="mt-4 grid grid-cols-4 gap-4">
                                {product.images.gallery.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={cn(
                                            'relative aspect-square overflow-hidden rounded-xl border-2 transition-all',
                                            selectedImage === index
                                                ? 'border-apsonic-green'
                                                : 'border-white/10 hover:border-white/30'
                                        )}
                                    >
                                        <CloudImage
                                            src={image}
                                            alt={`${product.name} thumbnail ${index + 1}`}
                                            width={200}
                                            height={200}
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div>
                            {/* Category */}
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-apsonic-green">
                                {getCategoryName(product.category)}
                            </p>

                            {/* Name */}
                            <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">{product.name}</h1>
                            <p className="mt-2 text-xl text-white/70">{product.tagline}</p>

                            {/* Description */}
                            <p className="mt-6 text-white/80 leading-relaxed">{product.description.long}</p>

                            {/* Price */}
                            <div className="mt-8 rounded-2xl border border-apsonic-green/30 bg-apsonic-green/10 p-6">
                                <p className="text-sm uppercase tracking-wider text-white/70">Starting at</p>
                                <p className="mt-2 text-4xl font-bold text-apsonic-green">
                                    {formatPrice(product.price.amount, product.price.currency)}
                                </p>
                                {product.price.note && (
                                    <p className="mt-2 text-sm text-white/60">{product.price.note}</p>
                                )}
                            </div>

                            {/* CTAs */}
                            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                                {isInStock(product) ? (
                                    <>
                                        <Button
                                            asChild
                                            className="flex-1 rounded-full bg-white px-8 py-4 text-base font-semibold text-black hover:bg-white/90 transition-all shadow-lg shadow-white/10"
                                        >
                                            <Link href="/dealers">Find a Dealer</Link>
                                        </Button>
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="flex-1 rounded-full border-apsonic-green/40 bg-apsonic-green/10 px-8 py-4 text-base font-semibold text-apsonic-green hover:bg-apsonic-green hover:text-black transition-all"
                                        >
                                            <Link href="/contact">Request Quote</Link>
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="w-full rounded-full border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white hover:bg-white/10"
                                    >
                                        <Link href="/contact">Get Notified</Link>
                                    </Button>
                                )}
                            </div>

                            {/* Target Use */}
                            <div className="mt-8">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">
                                    Perfect For
                                </h3>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {product.targetUse.map((use) => (
                                        <span
                                            key={use}
                                            className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white"
                                        >
                                            {use}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold text-white">Technical Specifications</h2>
                        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {product.specifications.map((spec) => (
                                <div
                                    key={spec.label}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                                >
                                    <p className="text-sm uppercase tracking-wider text-white/50">{spec.label}</p>
                                    <p className="mt-2 text-lg font-semibold text-white">{spec.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold text-white">Key Features</h2>
                        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                            {product.features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="text-4xl">{feature.icon}</div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                                            <p className="mt-2 text-sm text-white/70">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </PageSection>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <PageSection className="bg-[var(--apsonic-surface-alt)] py-16 md:py-24">
                    <Container>
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-white">More {getCategoryName(product.category)}</h2>
                            <p className="mt-2 text-white/60">Explore other motorcycles in this category</p>
                        </div>
                        <ProductGrid products={relatedProducts} priorityCount={0} />
                    </Container>
                </PageSection>
            )}

            {/* CTA Section */}
            <PageSection className="bg-gradient-to-br from-apsonic-green/10 via-black to-black py-20">
                <Container>
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold text-white md:text-4xl">
                            Ready to experience the {product.name}?
                        </h2>
                        <p className="mt-4 text-lg text-white/70">
                            Visit your nearest APSONIC dealer for a test ride and expert consultation.
                        </p>
                        <div className="mt-8">
                            <Button
                                asChild
                                className="rounded-full bg-apsonic-green px-8 py-4 text-base font-semibold text-black hover:bg-apsonic-green-dark hover:shadow-lg hover:shadow-apsonic-green/30"
                            >
                                <Link href="/dealers">
                                    Find a Dealer Near You
                                    <svg
                                        className="ml-2 inline h-5 w-5"
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
                                </Link>
                            </Button>
                        </div>
                    </div>
                </Container>
            </PageSection>
        </main>
    );
}
