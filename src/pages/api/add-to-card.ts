import { redis } from "@/lib/redis";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ message: "Missing userId or productId" });
        }

        await redis.lrem(`add_to_cart:${userId}`, 0, productId);
        await redis.lpush(`add_to_cart:${userId}`, productId);
        await redis.ltrim(`add_to_cart:${userId}`, 0, 9);

        res.status(200).json({ message: "OK" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
