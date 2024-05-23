import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const tourId = searchParams.get('tourId');
        const body = await req.json();
        const token = req.headers.get('token');

        if (!tourId) {
            return new NextResponse(JSON.stringify({ message: 'tourId is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/subscription/${tourId}`, body, {
            headers: { token }
        });

        return new NextResponse(JSON.stringify(response.data), {
            status: response.status,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        if (error.response) {
            return new NextResponse(JSON.stringify(error.response.data), {
                status: error.response.status,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    }
}
