import { useState, useEffect } from 'react';
import axios from 'axios';
import { TourType } from '@/types/homePageTours';
import Cookies from 'js-cookie';

interface ApiResponse {
    message: string;
    data: {
        page: number;
        result: TourType[];
    };
}

const useAllSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState<TourType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const token = Cookies.get('token');
    useEffect(() => {
        const fetchSubscriptions = async () => {
            setLoading(true);
            try {
                const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/subscription?page=1`, {
                    headers: { 

                        token, 
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                });
                setSubscriptions(response.data.data.result);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(err); // More specific error handling if needed
                } else if (err instanceof Error) {
                    setError(err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSubscriptions();
    }, []);

    return { subscriptions, loading, error };
}

export default useAllSubscriptions;
