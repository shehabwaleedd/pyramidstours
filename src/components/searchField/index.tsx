'use client'
import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi'
import { TourType } from '@/types/homePageTours';
import styles from "./styles.module.scss"
import { useRouter } from 'next/navigation';
import Destinations from './components/Destinations';
import Days from './components/Days';
import Price from './components/Price';


const SearchField = ({ isNavbar, tours }: { isNavbar: boolean, tours: TourType[] }) => {
    const [destinations, setDestinations] = useState<string[]>([]);
    const [selectedDestination, setSelectedDestination] = useState<string>('');
    const [days, setDays] = useState<string[]>([]);
    const [selectedDay, setSelectedDay] = useState<string>('');
    const [inputPrice, setInputPrice] = useState<string>(''); // Changed to use single price input
    const priceRanges = ['100', '200', '300', '400', '500', "600", "700", "800", "900", "1000", "1100", "1200", "1300", "1400", "1500"];
    const router = useRouter()

    useEffect(() => {
        if (tours && tours.length > 0) {
            const fetchedDestinations = tours.map(tour => tour.location.to);
            const fetchedRepeatDays = tours.flatMap(tour => tour.repeatDays);
            const uniqueDestinations = Array.from(new Set(fetchedDestinations));
            const uniqueDays = Array.from(new Set(fetchedRepeatDays));
            setDestinations(uniqueDestinations);
            setDays(uniqueDays);
        }
    }, [tours]);


    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const query: Record<string, string> = {};
        if (selectedDestination) query['location.to'] = selectedDestination;
        if (selectedDay) query['repeatDays'] = selectedDay;
        if (inputPrice) query['price'] = inputPrice; // Simpler format
        const queryString = new URLSearchParams(query).toString();
        router.push(`/search/results?${queryString}`);
    };


    return (
        <form onSubmit={handleSearch} className={isNavbar ? styles.navbarSearch : styles.landinSearch}>
            <div className={isNavbar ? styles.navbarSearch__middle : styles.landinSearch__middle}>
                <Destinations destinations={destinations} setSelectedDestination={setSelectedDestination} selectedDestination={selectedDestination} />
                <Days days={days} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
                <Price priceRanges={priceRanges} inputPrice={inputPrice} setInputPrice={setInputPrice} />
                <div className={isNavbar ? styles.navbarSearch__search : styles.landinSearch__search}>
                    <button type="submit" className={styles.searchButton} aria-label="Search Tours Button"><FiSearch /></button>
                </div>
            </div>
        </form>
    )
}

export default SearchField


