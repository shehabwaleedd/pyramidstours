import { useState, useEffect } from 'react';
import axios from 'axios';
import { TourType } from '@/types/homePageTours';
import { User } from '@/types/hooks';

interface ApiResponse {
    message: string;
    data: {
        page: number;
        result: TourType[];
    };
}

const useUserSubscriptions = ({ user }: { user: User}) => {
    const [subscriptions, setSubscriptions] = useState<TourType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchUserSubscriptions = async (user: User) => {
        setLoading(true);
        try {
            const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/subscription`, {
                headers: {token: localStorage.getItem('token')},
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
        fetchUserSubscriptions(user);
    }, []);

    return { subscriptions, loading, error };
}

export default useUserSubscriptions;