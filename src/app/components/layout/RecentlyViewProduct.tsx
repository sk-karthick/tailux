"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useRecentlyViewedProducts } from "../hooks/useRecentlyViewedProducts";
import { useProductsByIds } from "../hooks/useProductsByIds";

const RecentlyViewProduct= () => {
    const recentlyViewedRaw: { id: string }[] = useRecentlyViewedProducts();
    const recentlyViewed = Array.isArray(recentlyViewedRaw) ? recentlyViewedRaw : [];
    const productIds = recentlyViewed.map(item => item.id);
    const products = useProductsByIds(productIds);

    return (
        <section className="my-12">
            <div className="flex justify-between items-center mb-6 px-4">
                <h2 className="text-2xl font-bold">Recently Viewed</h2>
            </div>

            <div className="flex gap-6 overflow-x-auto px-4 no-scrollbar">
                {products.map((product, idx) => (
                    <Card key={`${product.id}-${idx}`} className="min-w-[200px] max-w-[200px] flex-shrink-0 hover:shadow-lg transition-shadow rounded-2xl">
                        <CardContent className="p-4 flex flex-col items-center text-center cursor-pointer">
                            <div className="relative w-32 h-32 mb-4">
                                {product.thumbnail ? (
                                    <Image
                                        src={product.thumbnail}
                                        alt={product.title}
                                        layout="fill"
                                        objectFit="contain"
                                        className="rounded-xl"
                                        priority
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-xl text-gray-500 text-xs">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <h3 className="font-semibold text-lg">{product.title}</h3>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}

export default RecentlyViewProduct;
