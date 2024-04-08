import { useState, useEffect } from 'react';
import axios from 'axios';
import { TourType } from '@/types/homePageTours';

interface FetchToursResult {
    tours: TourType[];
    loading: boolean;
    error: Error | null;
    
}

const useToursByIds = (ids: string[]): FetchToursResult => {
    const [tours, setTours] = useState<TourType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchTours = async () => {
            setLoading(true);
            try {
                const toursData = await Promise.all(
                    ids.map(id =>
                        axios.get<TourType>(`${process.env.NEXT_PUBLIC_BASE_URL}/tour/${id}`)
                            .then(response => response.data.data)
                    )
                );
                setTours(toursData);
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

        if (ids.length > 0) {
            fetchTours();
        } else {
            setTours([]);
            setLoading(false);
        }
    }, [ids]);

    return { tours, loading, error };
};

export default useToursByIds;
