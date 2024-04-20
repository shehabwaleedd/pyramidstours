import { useState, useEffect } from 'react';
import axios from 'axios';
import { SubscriptionData } from '@/types/common';

interface ApiResponse {
    message: string;
    data: {
        page: number;
        totalPages: number;
        result: SubscriptionData[];
    };
}

const useUserSubscriptions = (page: number) => {
    const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchUserSubscriptions = async () => {
        setLoading(true);
        try {
            const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/subscription?page=${page}`, {
                headers: { token: localStorage.getItem('token') },
            });
            setSubscriptions(response.data.data.result);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err); 
            } else if (err instanceof Error) {
                setError(err);
            }
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchUserSubscriptions();
    }, [page]);

    return { subscriptions, loading, error }; // Return totalPages in the hook's output
}

export default useUserSubscriptions;