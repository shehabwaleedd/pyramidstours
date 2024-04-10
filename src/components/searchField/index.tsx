import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi'
import { TourType } from '@/types/homePageTours';
import styles from "./styles.module.scss"
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface ApiResponse {
    message: string;
    data: {
        page: number;
        result: TourType[];
    };
}

const SearchField = ({ isNavbar }: { isNavbar: boolean }) => {
    const [destinations, setDestinations] = useState<string[]>([]);
    const [selectedDestination, setSelectedDestination] = useState<string>('');
    const [days, setDays] = useState<string[]>([]);
    const [selectedDay, setSelectedDay] = useState<string>('');
    const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
    const priceRanges = ['0-100', '101-200', '201-300', '301-400', '401+'];
    const router = useRouter()

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/tour`);
                const tours = response.data.data.result;
                const fetchedDestinations = tours.map(tour => tour.location.to);
                const fetchedRepeatDays = tours.flatMap(tour => tour.repeatDays);
                const uniqueDestinations = Array.from(new Set(fetchedDestinations));
                const uniqueDays = Array.from(new Set(fetchedRepeatDays));
                setDestinations(uniqueDestinations);
                setDays(uniqueDays);

            } catch (error) {
                console.error('Failed to fetch tours:', error);
            }
        };
        fetchTours();
    }, []);


    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Define your query parameters based on state
        const query: Record<string, string> = {};
        if (selectedDestination) query['location.to'] = selectedDestination;
        if (selectedDay) query['repeatDays'] = selectedDay;
        if (selectedPriceRange) query['priceRange'] = selectedPriceRange;

        // Use router.push to navigate with query parameters
        
    };

    return (
        <form onSubmit={handleSearch} className={isNavbar ? styles.navbarSearch : styles.landing__text_search}>
            <div className={isNavbar ? styles.navbarSearch__middle : styles.landing__middle}>
                <div className={styles.formField}>
                    <label>Destination</label>
                    <select value={selectedDestination} onChange={(e) => setSelectedDestination(e.target.value)}>
                        <option value="">Destination</option>
                        {destinations.map((dest, index) => (
                            <option key={index} value={dest}>{dest}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formField}>
                    <label>Days</label>
                    <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                        <option value="">Days</option>
                        {days.map((day, index) => (
                            <option key={index} value={day}>{day}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formField}>
                    <label>Price Range</label>
                    <select value={selectedPriceRange} onChange={(e) => setSelectedPriceRange(e.target.value)}>
                        <option value="">Price Range</option>
                        {priceRanges.map((range, index) => (
                            <option key={index} value={range}>{range}$</option>
                        ))}
                    </select>
                </div>
                <div className={isNavbar ? styles.navbarSearch__search : styles.landing__search}>
                    <button type="submit" className={styles.searchButton}><FiSearch /></button>
                </div>
            </div>
        </form>
    )
}

export default SearchField