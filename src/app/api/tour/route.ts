import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/tour`)
        return new NextResponse(JSON.stringify(response.data), {
            status: response.status,
            headers: { 'Content-Type': 'application/json' },
        })
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