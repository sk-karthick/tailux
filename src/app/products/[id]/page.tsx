export const dynamic = "error";
export const dynamicParams = false;

import ProductDetails from "@/app/components/layout/ProductDetails";
import { notFound } from "next/navigation";
import { Product } from "@/types/product";


export async function generateStaticParams() {
    try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        return data.products.map((product: Product) => ({
            id: product.id.toString(),
        }));
    } catch (error) {
        console.error("Failed to generate static params:", error);
        return [];
    }
}

async function getProduct(id: string) {
    try {
        const res = await fetch(`https://dummyjson.com/products/${id}`, {
            next: { revalidate: 60 },
            signal: AbortSignal.timeout(3000)
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        return await res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
} 

export default async function ProductPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
        notFound();
    }

    try {
        const product = await getProduct(id);
        if (!product?.id) notFound();
        return <ProductDetails product={product} />;
    } catch (error) {
        console.error("Error in ProductPage:", error);
        notFound();
    }
}
