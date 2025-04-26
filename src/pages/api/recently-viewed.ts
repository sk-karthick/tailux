// pages/api/recently-viewed.ts
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

        await redis.lrem(`recently_viewed:${userId}`, 0, productId);
        await redis.lpush(`recently_viewed:${userId}`, productId);
        await redis.ltrim(`recently_viewed:${userId}`, 0, 9);

        res.status(200).json({ message: "OK" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
