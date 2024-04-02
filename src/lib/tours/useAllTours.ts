import { useState, useEffect } from "react";
import axios from "axios";
import { Tour } from "@/types/hooks";

export const useAllTours = () => {
    const [tours, setTours] = useState<Tour | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchTour = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/tour`);
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

        fetchTour();
    }, []); 

    return { tours, loading, setTours };
};
