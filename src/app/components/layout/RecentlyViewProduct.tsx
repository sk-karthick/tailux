"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useRecentlyViewedProducts } from "../hooks/useRecentlyViewedProducts";
import { useProductsByIds } from "../hooks/useProductsByIds";
import { useRouter } from "next/navigation";

const RecentlyViewProduct = () => {
    const recentlyViewedRaw: { id: string }[] = useRecentlyViewedProducts();
    const recentlyViewed = Array.isArray(recentlyViewedRaw) ? recentlyViewedRaw : [];
    const productIds = recentlyViewed.map(item => item.id);
    const products = useProductsByIds(productIds);
    const rounter = useRouter();

    const viewedItemClick = (id: number) => {
        rounter.push(`/products/${id}`);
    };

    return products.length > 0 && (
        <section className="py-5 mb-4 bg-[#bf1f321a] rounded-2xl">
            <div className="flex justify-between items-center mb-6 px-4">
                <h2 className="text-xl font-bold">✨ Just For You: Recently Browsed</h2>
            </div>

            <div className="flex gap-6 overflow-x-auto px-4 custom-scrollbar">
                {products.map((product, idx) => (
                    <Card key={`${product.id}-${idx}`} onClick={() => viewedItemClick(product.id)} className="min-w-[200px] max-w-[200px] flex-shrink-0 hover:shadow-lg transition-shadow rounded-2xl">
                        <CardContent className="p-1 flex flex-col items-center text-center cursor-pointer">
                            <div className="relative w-20 h-20 mb-4">
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
                            <h3 className="font-semibold text-sm">{product.title}</h3>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

    );
}

export default RecentlyViewProduct;
