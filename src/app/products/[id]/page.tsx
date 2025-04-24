export const dynamic = "error";
export const dynamicParams = false;

import ProductDetails from "@/app/components/layout/ProductDetails";
import { notFound } from "next/navigation";
import { Product } from "@/types/product";


export async function generateStaticParams(): Promise<{ id: string }[]> {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    return data.products.map((product: Product) => ({
        id: product.id.toString(),
    }));
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
export default async function ProductPage({
    params,
}: {
    params: { id: string };
}) {
    const productId = parseInt(params.id, 10);

    if (isNaN(productId)) {
        notFound();
    }

    const product = await getProduct(params.id);

    if (!product?.id) {
        notFound();
    }

    return <ProductDetails product={product} />;
}
