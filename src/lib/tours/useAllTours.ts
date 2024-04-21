import { useState, useEffect } from "react";
import axios from "axios";
import { TourType } from "@/types/homePageTours";

export const useAllTours = (page: number) => {
    const [tours, setTours] = useState<TourType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchTour = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/tour?page=${page}`);
            if (response.status === 200 && response.data) {
                setTours(response.data.data.result);
            } else {
                throw new Error("Failed to fetch event");
            }
        } catch (error) {
            console.error("Error fetching event:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchTour();
    }, [page]);

    return { tours, loading, setTours };
};
