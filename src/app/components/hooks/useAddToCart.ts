import { Product } from '@/types/product';
import { useState } from 'react';

const useAddToCart = () => {
    const [isLoading, setIsLoading] = useState(false);

    const addToCart = async (product: Product) => {
        try {
            setIsLoading(true);

            localStorage.setItem("cart_product", JSON.stringify(product));

            const getUser = localStorage.getItem("user");
            if (!getUser) throw new Error("User not found");

            const user = JSON.parse(getUser).id;
            if (!user) throw new Error("User ID not found");

            const response = await fetch("/api/add-to-card", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user,
                    productId: product.id,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add product to cart");
            }

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { addToCart, isLoading };
}

export default useAddToCart;
