import { useEffect, useState } from 'react';

export function useProductsByIds(ids: string[]) {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        if (ids.length === 0) return;

        const fetchProducts = async () => {
            try {
                const promises = ids.map(id =>
                    fetch(`https://dummyjson.com/products/${id}`).then(res => res.json())
                );
                const results = await Promise.all(promises);
                setProducts(results.filter(Boolean));
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, [ids]);

    return products;
}
