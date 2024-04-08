import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi'
import { TourType } from '@/types/homePageTours';
import styles from "../landing/style.module.scss"
import axios from 'axios';

interface apiResponse {
    data: TourType[];
}

const SearchField = ({ }) => {
    const [destinations, setDestinations] = useState<string[]>([]);
    const [selectedDestination, setSelectedDestination] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
    const priceRanges = ['0-100', '101-200', '201-300', '301-400', '401+']; // Manual preset for price ranges




    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axios.get<apiResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/tour`);
                if (Array.isArray(response.data)) {
                    const fetchedDestinations = response.data.map(tour => tour.location.from);
                    const uniqueDestinations = Array.from(new Set(fetchedDestinations)); // Remove duplicates
                    setDestinations(uniqueDestinations);
                } else {
                    console.error('Expected an array but received:', response.data);
                }
            } catch (error) {
                console.error('Failed to fetch tours:', error);
            }
        };
        fetchTours();
    }, []);

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const queryParams = new URLSearchParams({
            ...(selectedDestination && { destination: selectedDestination }),
            ...(selectedDate && { date: selectedDate }),
            ...(selectedPriceRange && { priceRange: selectedPriceRange }),
        }).toString();

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/tour/?=${queryParams}`);
            console.log(response.data);
        } catch (error) {
            console.error('Search failed:', error);
        }
    };
    return (
        <form onSubmit={handleSearch} className={styles.landing__text_search}>
            <div className={styles.landing__middle}>
                <div className={styles.formGroup}>
                    <label>Destination</label>
                    <select value={selectedDestination} onChange={(e) => setSelectedDestination(e.target.value)}>
                        <option value="">Select Destination</option>
                        {destinations.map((dest, index) => (
                            <option key={index} value={dest}>{dest}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label>Date</label>
                    <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
                </div>
                <div className={styles.formGroup}>
                    <label>Price Range</label>
                    <select value={selectedPriceRange} onChange={(e) => setSelectedPriceRange(e.target.value)}>
                        <option value="">Select Price Range</option>
                        {priceRanges.map((range, index) => (
                            <option key={index} value={range}>{range}$</option>
                        ))}
                    </select>
                </div>
                <div className={styles.landing__search}>
                    <button type="submit" className={styles.searchButton}><FiSearch /></button>
                </div>
            </div>
        </form>
    )
}

export default SearchField