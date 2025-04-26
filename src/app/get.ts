// app/api/set/route.ts
import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';

export async function GET() {
    await redis.set('greeting', 'Hello from Redis!');
    return NextResponse.json({ message: 'Value set in Redis' });
}
