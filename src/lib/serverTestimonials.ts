import axios from 'axios';


interface Testimonial {
    avatar: {
        url: string;
        public_id: string;
    };
    _id: string;
    userName: string;
    description: string;
    rate: number;
    email: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ApiResponse {
    message: string;
    data: Testimonial[];
}

export async function serverUseTestimonials() {
    try {
        const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/testimonial`);
        const data = response.data.data;
        return data;
    }
    catch (error) {
        console.error('Failed to fetch testimonials:', error);
        return null;
    }

}