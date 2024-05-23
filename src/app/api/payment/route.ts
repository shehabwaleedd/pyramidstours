import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const subscriptionId = searchParams.get('subscriptionId');
        const body = await req.json();
        const token = req.headers.get('token');

        if (!subscriptionId) {
            return new NextResponse(JSON.stringify({ message: 'subscriptionId is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const response = await axios.post(`https://tours-b5zy.onrender.com/payment/checkout-session/${subscriptionId}`, body, {
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
