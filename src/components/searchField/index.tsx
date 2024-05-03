'use client'
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
    const [inputPrice, setInputPrice] = useState<string>(''); // Changed to use single price input
    const priceRanges = ['100', '200', '300', '400', '500', "600", "700", "800", "900", "1000", "1100", "1200", "1300", "1400", "1500"];
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
        const query: Record<string, string> = {};
        if (selectedDestination) query['location.to'] = selectedDestination;
        if (selectedDay) query['repeatDays'] = selectedDay;
        if (inputPrice) query['adultPricing.price'] = inputPrice;
        const queryString = new URLSearchParams(query).toString();
        router.push(`/search/results?${queryString}`);

    };

    return (
        <form onSubmit={handleSearch} className={isNavbar ? styles.navbarSearch : styles.landinSearch}>
            <div className={isNavbar ? styles.navbarSearch__middle : styles.landinSearch__middle}>
                <div className={styles.formField}>
                    <label htmlFor="destination-select">Destination</label>
                    <select id="destination-select" value={selectedDestination} onChange={e => setSelectedDestination(e.target.value)}>
                        <option value="">Destination</option>
                        {destinations.map((dest, index) => (
                            <option key={index} value={dest}>{dest}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="days-select">Days</label>
                    <select id="days-select" value={selectedDay} onChange={e => setSelectedDay(e.target.value)}>
                        <option value="">Days</option>
                        {days.map((day, index) => (
                            <option key={index} value={day}>{day}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="price-select">Price From $</label>
                    <select id="price-select" value={inputPrice} onChange={e => setInputPrice(e.target.value)}>
                        <option value="">Price From $</option>
                        {priceRanges.map((range, index) => (
                            <option key={index} value={range}>{range}$</option>
                        ))}
                    </select>
                </div>
                <div className={isNavbar ? styles.navbarSearch__search : styles.landinSearch__search}>
                    <button type="submit" className={styles.searchButton} aria-label="Search Tours Button"><FiSearch /></button>
                </div>
            </div>
        </form>
    )
}

export default SearchField


