import { redis } from "@/lib/redis";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { userId } = req.query; 

        if (!userId) {
            return res.status(400).json({ message: "Missing userId" });
        }

        const recentlyViewedProductIds = await redis.lrange(`recently_viewed:${userId}`, 0, 9);
        console.log(recentlyViewedProductIds);
        if (!recentlyViewedProductIds || recentlyViewedProductIds.length === 0) {
            return res.status(404).json({ message: "No recently viewed products found" });
        }

        const products = await Promise.all(
            recentlyViewedProductIds.map(async (productId) => {
                const productRes = await fetch(`https://dummyjson.com/products/${productId}`);
                if (productRes.ok) {
                    return await productRes.json();
                } else {
                    return null;
                }
            })
        );

        const validProducts = products.filter((product) => product !== null);

        res.status(200).json(validProducts);
    } catch (error) {
        console.error("Error fetching recently viewed products:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
