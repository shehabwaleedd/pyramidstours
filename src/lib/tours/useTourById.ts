import { useState, useEffect } from "react";
import axios from "axios";
import { TourType } from "@/types/homePageTours";

export const useTourById = (id: string) => {
    const [tour, setTour] = useState<TourType | null>(null); 
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchTour = async () => {
            setLoading(true);
            try {
                const response = await axios.get<TourType>(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/tour/${id}`,
                );
                if (response.status === 200 && response.data) {
                    setTour(response.data.data);
                } else {
                    throw new Error("Failed to fetch event");
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Error fetching event:", error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTour();
    }, [id]); // Added id as a dependency to re-fetch when the id changes

    return { tour, loading };
};
