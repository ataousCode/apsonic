/**
 * Product Utility Functions
 * Reusable functions for product operations following DRY principles
 */

import { type Product, type ProductCategory } from '@/data/products';

// ==================== FILTERING ====================

/**
 * Filter products by category
 */
export function filterByCategory(
    products: Product[],
    category: ProductCategory | 'all'
): Product[] {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
}

/**
 * Filter products by price range
 */
export function filterByPriceRange(
    products: Product[],
    minPrice: number,
    maxPrice: number
): Product[] {
    return products.filter(
        product => product.price.amount >= minPrice && product.price.amount <= maxPrice
    );
}

/**
 * Filter products by availability
 */
export function filterByAvailability(
    products: Product[],
    availability: Product['availability']
): Product[] {
    return products.filter(product => product.availability === availability);
}

/**
 * Filter featured products
 */
export function filterFeatured(products: Product[]): Product[] {
    return products.filter(product => product.featured);
}

/**
 * Search products by name or description
 */
export function searchProducts(products: Product[], query: string): Product[] {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return products;

    return products.filter(
        product =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.tagline.toLowerCase().includes(lowerQuery) ||
            product.description.short.toLowerCase().includes(lowerQuery) ||
            product.description.long.toLowerCase().includes(lowerQuery) ||
            product.targetUse.some(use => use.toLowerCase().includes(lowerQuery))
    );
}

/**
 * Filter products by engine size range
 */
export function filterByEngineSize(
    products: Product[],
    minCC: number,
    maxCC: number
): Product[] {
    return products.filter(product => {
        const engineSpec = product.specifications.find(spec => spec.label === 'Engine');
        if (!engineSpec) return false;

        const ccMatch = engineSpec.value.match(/(\d+)cc/i);
        if (!ccMatch) return false;

        const cc = parseInt(ccMatch[1], 10);
        return cc >= minCC && cc <= maxCC;
    });
}

// ==================== SORTING ====================

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'engine-asc' | 'engine-desc' | 'featured';

/**
 * Sort products by price
 */
export function sortByPrice(products: Product[], ascending = true): Product[] {
    return [...products].sort((a, b) => {
        const diff = a.price.amount - b.price.amount;
        return ascending ? diff : -diff;
    });
}

/**
 * Sort products by name
 */
export function sortByName(products: Product[], ascending = true): Product[] {
    return [...products].sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return ascending ? comparison : -comparison;
    });
}

/**
 * Sort products by engine size
 */
export function sortByEngineSize(products: Product[], ascending = true): Product[] {
    return [...products].sort((a, b) => {
        const getEngineCC = (product: Product): number => {
            const engineSpec = product.specifications.find(spec => spec.label === 'Engine');
            if (!engineSpec) return 0;
            const ccMatch = engineSpec.value.match(/(\d+)cc/i);
            return ccMatch ? parseInt(ccMatch[1], 10) : 0;
        };

        const diff = getEngineCC(a) - getEngineCC(b);
        return ascending ? diff : -diff;
    });
}

/**
 * Sort products with featured first
 */
export function sortByFeatured(products: Product[]): Product[] {
    return [...products].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
    });
}

/**
 * Generic sort function based on sort option
 */
export function sortProducts(products: Product[], sortOption: SortOption): Product[] {
    switch (sortOption) {
        case 'price-asc':
            return sortByPrice(products, true);
        case 'price-desc':
            return sortByPrice(products, false);
        case 'name-asc':
            return sortByName(products, true);
        case 'name-desc':
            return sortByName(products, false);
        case 'engine-asc':
            return sortByEngineSize(products, true);
        case 'engine-desc':
            return sortByEngineSize(products, false);
        case 'featured':
            return sortByFeatured(products);
        default:
            return products;
    }
}

// ==================== FORMATTING ====================

/**
 * Format price for display
 */
export function formatPrice(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Format engine size for display
 */
export function formatEngineSize(product: Product): string {
    const engineSpec = product.specifications.find(spec => spec.label === 'Engine');
    if (!engineSpec) return 'N/A';

    const ccMatch = engineSpec.value.match(/(\d+)cc/i);
    return ccMatch ? `${ccMatch[1]}cc` : engineSpec.value;
}

/**
 * Get engine power for display
 */
export function getEnginePower(product: Product): string {
    const powerSpec = product.specifications.find(spec => spec.label === 'Power');
    return powerSpec ? powerSpec.value : 'N/A';
}

/**
 * Get fuel economy for display
 */
export function getFuelEconomy(product: Product): string {
    const fuelSpec = product.specifications.find(spec => spec.label === 'Fuel Economy');
    return fuelSpec ? fuelSpec.value : 'N/A';
}

// ==================== PRODUCT RELATIONSHIPS ====================

/**
 * Get related products (same category, excluding current product)
 */
export function getRelatedProducts(
    allProducts: Product[],
    currentProduct: Product,
    limit: number = 3
): Product[] {
    return allProducts
        .filter(
            product =>
                product.category === currentProduct.category &&
                product.id !== currentProduct.id
        )
        .slice(0, limit);
}

/**
 * Get products in the same price range
 */
export function getSimilarPriceProducts(
    allProducts: Product[],
    currentProduct: Product,
    priceVariance: number = 500,
    limit: number = 3
): Product[] {
    const minPrice = currentProduct.price.amount - priceVariance;
    const maxPrice = currentProduct.price.amount + priceVariance;

    return allProducts
        .filter(
            product =>
                product.id !== currentProduct.id &&
                product.price.amount >= minPrice &&
                product.price.amount <= maxPrice
        )
        .slice(0, limit);
}

/**
 * Get alternative products (different category, similar use case)
 */
export function getAlternativeProducts(
    allProducts: Product[],
    currentProduct: Product,
    limit: number = 3
): Product[] {
    return allProducts
        .filter(product => {
            if (product.id === currentProduct.id) return false;
            if (product.category === currentProduct.category) return false;

            // Check if they share any target use cases
            return product.targetUse.some(use =>
                currentProduct.targetUse.includes(use)
            );
        })
        .slice(0, limit);
}

// ==================== STATISTICS ====================

/**
 * Get price range for a category
 */
export function getPriceRange(products: Product[]): { min: number; max: number } {
    if (products.length === 0) return { min: 0, max: 0 };

    const prices = products.map(p => p.price.amount);
    return {
        min: Math.min(...prices),
        max: Math.max(...prices),
    };
}

/**
 * Get engine size range for products
 */
export function getEngineSizeRange(products: Product[]): { min: number; max: number } {
    const engineSizes = products
        .map(product => {
            const engineSpec = product.specifications.find(spec => spec.label === 'Engine');
            if (!engineSpec) return 0;
            const ccMatch = engineSpec.value.match(/(\d+)cc/i);
            return ccMatch ? parseInt(ccMatch[1], 10) : 0;
        })
        .filter(size => size > 0);

    if (engineSizes.length === 0) return { min: 0, max: 0 };

    return {
        min: Math.min(...engineSizes),
        max: Math.max(...engineSizes),
    };
}

/**
 * Get product count by category
 */
export function getProductCountByCategory(products: Product[]): Record<ProductCategory | 'all', number> {
    const counts: Record<ProductCategory | 'all', number> = {
        all: products.length,
        cubs: 0,
        street: 0,
        tricycles: 0,
    };

    products.forEach(product => {
        counts[product.category]++;
    });

    return counts;
}

// ==================== AVAILABILITY ====================

/**
 * Check if product is in stock
 */
export function isInStock(product: Product): boolean {
    return product.availability === 'in-stock';
}

/**
 * Get availability badge text
 */
export function getAvailabilityBadge(product: Product): string {
    switch (product.availability) {
        case 'in-stock':
            return 'In Stock';
        case 'pre-order':
            return 'Pre-Order';
        case 'coming-soon':
            return 'Coming Soon';
        default:
            return 'Unavailable';
    }
}

/**
 * Get availability badge color
 */
export function getAvailabilityColor(product: Product): string {
    switch (product.availability) {
        case 'in-stock':
            return 'text-green-400 border-green-500/30 bg-green-500/10';
        case 'pre-order':
            return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
        case 'coming-soon':
            return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
        default:
            return 'text-white/40 border-white/10 bg-white/5';
    }
}

// ==================== CATEGORY HELPERS ====================

/**
 * Get category display name
 */
export function getCategoryName(category: ProductCategory): string {
    const names: Record<ProductCategory, string> = {
        cubs: 'Cubs',
        street: 'Street Bikes',
        tricycles: 'Tricycles',
    };
    return names[category];
}

/**
 * Get category description
 */
export function getCategoryDescription(category: ProductCategory): string {
    const descriptions: Record<ProductCategory, string> = {
        cubs: 'Reliable commuter motorcycles for daily transportation',
        street: 'Performance motorcycles for urban and highway riding',
        tricycles: 'Heavy-duty cargo solutions for commercial operations',
    };
    return descriptions[category];
}

/**
 * Get category icon
 */
export function getCategoryIcon(category: ProductCategory): string {
    const icons: Record<ProductCategory, string> = {
        cubs: '🏍️',
        street: '🏁',
        tricycles: '🚛',
    };
    return icons[category];
}
