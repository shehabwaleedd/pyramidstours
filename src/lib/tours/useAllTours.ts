import { useState, useEffect } from "react";
import axios from "axios";
import { TourType } from "@/types/homePageTours";

export const useAllTours = (page: number) => {
    const [tours, setTours] = useState<TourType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchTour = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/tour?page=${page}`);
            if (response.status === 200) {
                setTours(prevTours => [...prevTours, ...response.data.data.result]);
                setTotalPages(response.data.data.pageNumber); // Assuming the API returns the total number of pages
            } else {
                throw new Error("Failed to fetch tours");
            }
        } catch (error) {
            console.error("Error fetching tours:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (page <= totalPages) {
            fetchTour();
        }
    }, [page]);

    return { tours, loading, totalPages };
};
