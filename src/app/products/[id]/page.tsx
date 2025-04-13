// app/products/[id]/page.tsx
import ProductDetails from "@/app/components/layout/ProductDetails";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();

    return products.map((product: any) => ({
        id: product.id.toString(),
    }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${params.id}`, {
            next: { revalidate: 60 },
        });

        const product = await res.json();

        if (!product || !product.id) {
            notFound();
        }

        return <ProductDetails product={product} />;
    } catch (error) {
        notFound();
    }
}