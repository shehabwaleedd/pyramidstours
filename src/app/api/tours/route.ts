import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { TourType } from '@/types/homePageTours';

let cache: Record<string, TourType[]> = {};
let cacheExpiry: number = Date.now() + 2 * 60 * 60 * 1000; // Cache expiry set to 2 hours

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get('results') || '';

    if (Date.now() > cacheExpiry) {
        cache = {};
        cacheExpiry = Date.now() + 2 * 60 * 60 * 1000; // Reset cache expiry to 2 hours from now after clearing
    }
    if (cache[query]) {
        return NextResponse.json(cache[query]);
    }

    try {
        const questionAndQuery = query ? `?${query}` : "";
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/tour${questionAndQuery}`);
        const data: { data: { result: TourType[] } } = response.data;
        cache[query] = data.data.result;
        cacheExpiry = Date.now() + 24 * 60 * 60 * 1000; // Cache for 24 hours

        return NextResponse.json(data.data.result);
    } catch (error) {
        console.error("Error fetching tours:", error);
        return NextResponse.json({ error: 'Failed to fetch tours' }, { status: 500 });
    }
}
