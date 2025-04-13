export const dynamic = "error";
export const dynamicParams = false;

import ProductDetails from "@/app/components/layout/ProductDetails";
import { notFound } from "next/navigation";

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
};

export async function generateStaticParams() {
    const res = await fetch("https://fakestoreapi.com/products");
    const products: Product[] = await res.json();

    return products.map((product) => ({
        id: product.id.toString(),
    }));
}

async function getProduct(id: string) {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch product");
    }

    return res.json();
}
export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
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
        console.error("Error fetching product:", error);
        notFound();
    }
}