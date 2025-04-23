"use client";
import React, { useMemo } from "react";
import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "../hooks/useProducts";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

interface ProductPageProps {
    searchValue?: string;
}

const ProductPage: React.FC<ProductPageProps> = () => {
    const { products, loading, error } = useProducts();
    const searchValue = useSelector((state: RootState) => state.app.searchValue);

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
                            products={product}
                        />
                    ))}
            </div>
        </div>
    );
};

export default ProductPage;
