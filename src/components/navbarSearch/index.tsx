import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi'
import { TourType } from '@/types/homePageTours';
import styles from "./styles.module.scss"
import axios from 'axios';
import { motion, useAnimation } from 'framer-motion';

interface ApiResponse {
    message: string;
    data: {
        page: number;
        result: TourType[];
    };
}


const NavbarSearch = () => {
    const [destinations, setDestinations] = useState<string[]>([]);
    const [selectedDestination, setSelectedDestination] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
    const priceRanges = ['0-100', '101-200', '201-300', '301-400', '401+']; // Manual preset for price ranges
    const controls = useAnimation();


    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/tour`);
                const tours = response.data.data.result; 
                const fetchedDestinations = tours.map(tour => tour.location.from);
                const uniqueDestinations = Array.from(new Set(fetchedDestinations));
                setDestinations(uniqueDestinations);
            } catch (error) {
                console.error('Failed to fetch tours:', error);
            }
        };
        fetchTours();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.pageYOffset;
            if (position > window.innerHeight * 0.7) {
                controls.start({ opacity: 1 });
            } else {
                controls.start({ opacity: 0 });
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [controls]);

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
        <motion.form onSubmit={handleSearch} className={styles.navbarSearch}
            initial={{ opacity: 0 }}
            animate={controls}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.navbarSearch__middle}>
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
                    <label>Date</label>
                    <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
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
                <div className={styles.navbarSearch__search}>
                    <button type="submit" className={styles.searchButton}><FiSearch /></button>
                </div>
            </div>
        </motion.form>
    )
}

export default NavbarSearch