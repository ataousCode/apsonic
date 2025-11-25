import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { products, getProductBySlug } from '@/data/products';
import ProductDetailClient from '@/app/products/[slug]/ProductDetailClient';

type Params = { slug: string };

// Generate static params for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Generate metadata for each product
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} – ${product.tagline}`,
    description: product.description.long,
    openGraph: {
      title: `${product.name} | APSONIC`,
      description: product.description.short,
      url: `https://apsonic.example/products/${product.slug}`,
      images: [
        {
          url: product.images.hero,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}