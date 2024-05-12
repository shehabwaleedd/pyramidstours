// middleware.ts (in your Next.js application root)
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = cookies()?.get('token')?.value;
    if (!token) {
        console.log('No token found')
        return NextResponse.redirect(new URL('/login', req.url));
    }

    console.log('Token found:', token)

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/authentication`, {
            method: 'GET',
            headers: {
                token,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Authentication failed with status: ${response.status}`);
        }

        const data = await response.json();

        if (data.message === "success") {
            console.log('Authentication successful:', data.data);
            return NextResponse.next();
        } else {
            throw new Error('Authentication failed: ' + data.message);
        }
    } catch (error) {
        console.error('Authentication error:', error);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/account/:path*']
};
