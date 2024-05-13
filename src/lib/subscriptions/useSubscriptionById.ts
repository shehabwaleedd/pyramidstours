import { useState, useEffect } from 'react';
import axios from 'axios';
import { SubscriptionData } from '@/types/common';
import Cookies from 'js-cookie';

interface ApiResponse {
    message: string;
    data: SubscriptionData[]
}

const useSubscriptionById = (id: string) => {
    const [subscription, setSubscription] = useState<SubscriptionData | null>(null); // State now expects a single object or null
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null); // Using string for error to simplify error handling

    const fetchUserSubscriptions = async () => {
        setLoading(true);
        try {
            const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/subscription/${id}`, {
                headers: { token: Cookies.get('token') },
            });
            if (response.data.data.length > 0) {
                setSubscription(response.data.data[0]);  // Now correctly setting a single SubscriptionData object
            } else {
                setError('No subscription data found');  // Handling the case where no data is returned
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError('Failed to fetch subscription data');  // Simplifying the error message
            } else {
                setError('An unexpected error occurred');  // Catching unexpected errors
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserSubscriptions();
    }, [id]);

    return { subscription, loading, error };
}

export default useSubscriptionById;