// app/api/get/route.ts
import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';

export async function GET() {
    const value = await redis.get('greeting');
    return NextResponse.json({ message: value });
}
