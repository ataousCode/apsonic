import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Products',
    description:
        'Explore APSONIC motorcycles built for African roads. Cubs, street bikes, and tricycles designed for durability, performance, and reliability.',
    openGraph: {
        title: 'APSONIC Products – Motorcycles Built for Africa',
        description:
            'Discover our complete range of motorcycles: Cubs for daily commuting, street bikes for performance, and tricycles for commercial operations.',
        url: 'https://apsonic.example/products',
    },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
