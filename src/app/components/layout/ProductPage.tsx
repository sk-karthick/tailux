"use client";
import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string[];
}

interface ProductPageProps {
    searchValue?: string;
}

const ProductPage: React.FC<ProductPageProps> = ({ searchValue = "" }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await fetch("https://dummyjson.com/products");
            const json = await res.json();
            setProducts(json.products);
        } catch (err) {
            console.error("Error fetching products", err);
            setError("Failed to load products. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    const filteredProducts = useMemo(() => {
        if (!searchValue) return products;
        return products.filter(product =>
            product.title.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [products, searchValue]);

    return (
        <div className="px-4 py-6 pb-4 overflow-y-auto max-h-[91svh]">
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {loading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton
                            key={i}
                            className="h-[320px] w-full rounded-xl bg-gray-200"
                        />
                    ))
                    : filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            image={product.images[0]}
                            title={product.title}
                            description={product.description}
                            price={product.price}
                            discount={3}
                        />
                    ))}
            </div>
        </div>
    );
};

export default ProductPage;