import axios from 'axios';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const token = req.headers.get('token');
        const tourId = body.tourId; // Ensure the tour ID is passed in the request body
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/subscription/${tourId}`, body, {
            headers: { token }
        });
        return new Response(JSON.stringify(response.data), {
            status: response.status,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        if (error.response) {
            return new Response(JSON.stringify(error.response.data), {
                status: error.response.status,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    }
}
