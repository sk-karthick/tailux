// app/products/[id]/page.tsx
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
        console.log("Error fetching product details:", error);
        notFound();
    }
}