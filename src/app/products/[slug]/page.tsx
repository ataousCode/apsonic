import { notFound } from "next/navigation";

type Params = { slug: string };

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { slug } = params;
  const product = { name: "Sample Product", slug };
  if (!product) notFound();
  return (
    <div className="px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-semibold tracking-tight text-[#111111] dark:text-zinc-50">{product.name}</h1>
        <div className="mt-4 text-zinc-700 dark:text-zinc-300">Product details will be loaded from CMS.</div>
      </div>
    </div>
  );
}