import { useEffect, useState } from "react";
import { Product } from '@/types/product';

interface ProductAPIResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await fetch("https://dummyjson.com/products");
            const json: ProductAPIResponse = await res.json();
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

    return { products, loading, error };
};
