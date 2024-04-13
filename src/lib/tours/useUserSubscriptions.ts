import { useState, useEffect } from 'react';
import axios from 'axios';

import { SubscriptionData } from '@/types/common';

interface ApiResponse {
    message: string;
    page: number;
    result: SubscriptionData[];
}

const useUserSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchUserSubscriptions = async () => {
        setLoading(true);
        try {
            const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/subscription`, {
                headers: { token: localStorage.getItem('token') },
            });
            setSubscriptions(response.data.result);
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
    }, []);

    return { subscriptions, loading, error };
}

export default useUserSubscriptions;