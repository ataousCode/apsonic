import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "APSONIC – Durable Performance Motorcycles for Africa",
        template: "%s | APSONIC",
    },
    description:
        "Professional motorcycles built strong for African roads. Explore models, service network, and distributor opportunities.",
    icons: { icon: "/favicon.ico" },
    openGraph: {
        title: "APSONIC – Durable Performance Motorcycles for Africa",
        description:
            "Explore APSONIC models, service advantages, and distributor opportunities.",
        url: "https://apsonic.example",
        siteName: "APSONIC",
        locale: "en",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "APSONIC – Durable Performance Motorcycles for Africa",
        description:
            "Explore APSONIC models, service advantages, and distributor opportunities.",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Layout>
                    <div className="min-h-screen">
                        {children}
                    </div>
                </Layout>
            </body>
        </html>
    );
}
