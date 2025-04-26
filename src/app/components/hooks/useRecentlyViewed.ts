import { useEffect } from "react";

interface Product {
    id: number;
    [key: string]: any;
}

export function useRecentlyViewed(product: Product) {
    useEffect(() => {
        const addRecentlyViewed = async () => {
            const getUserId = localStorage.getItem("user");
            if (!getUserId) return;

            const userId = JSON.parse(getUserId)?.id;
            if (!userId) return;

            await fetch("/api/recently-viewed", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, productId: product.id }),
            });
        };

        if (product?.id) {
            addRecentlyViewed();
        }
    }, [product]);
}
