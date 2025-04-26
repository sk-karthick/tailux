import type { NextApiRequest, NextApiResponse } from 'next';
import { redis } from '@/lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, userId } = req.query;

    await redis.lpush(`recently_viewed:${userId}`, id);

    await redis.ltrim(`recently_viewed:${userId}`, 0, 9);

    res.status(200).json({ message: `Product ${id} added to recently viewed.` });
}
