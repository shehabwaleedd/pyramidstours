import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
    try {
        const token = request.headers.get('token');

        if (!token) {
            return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, {
            headers: { token }
        });

        return new NextResponse(JSON.stringify(response.data), {
            status: 200,
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
