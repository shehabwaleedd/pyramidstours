'use client'
import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi'
import { TourType } from '@/types/homePageTours';
import styles from "./style.module.scss"
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface ApiResponse {
    message: string;
    data: {
        page: number;
        result: TourType[];
    };
}

const SearchBar = () => {
    const [destinations, setDestinations] = useState<string[]>([]);
    const [selectedDestination, setSelectedDestination] = useState<string>('');
    const [days, setDays] = useState<string[]>([]);
    const [selectedDay, setSelectedDay] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [selectedTag, setSelectedTag] = useState<string>('');
    const [time, setTime] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [category, setCategory] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
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
                const fetchedRepeatTime = tours.flatMap(tour => tour.repeatTime);
                const fetchedTags = tours.flatMap(tour => tour.tags);
                const fetchedCategory = tours.map(tour => tour.category);
                const uniqueDestinations = Array.from(new Set(fetchedDestinations));
                const uniqueDays = Array.from(new Set(fetchedRepeatDays));
                const uniqueTime = Array.from(new Set(fetchedRepeatTime));
                const uniqueTags = Array.from(new Set(fetchedTags));
                const uniqueCategory = Array.from(new Set(fetchedCategory));

                setDestinations(uniqueDestinations);
                setDays(uniqueDays);
                setTags(uniqueTags);
                setCategory(uniqueCategory);
                setTime(uniqueTime);
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

        const queryString = new URLSearchParams(query).toString();
        router.push(`/tours?${queryString}`);

    };

    return (
        <form onSubmit={handleSearch} className={styles.toursSearch}>
            <div className={styles.toursSearch__middle}>
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
                    <label>Time</label>
                    <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                        <option value="">Time</option>
                        {time.map((time, index) => (
                            <option key={index} value={time}>{time}:00</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formField}>
                    <label>Tags</label>
                    <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
                        <option value="">Tags</option>
                        {tags.map((tag, index) => (
                            <option key={index} value={tag}>{tag}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formField}>
                    <label>Category</label>
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="">Category</option>
                        {category.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
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
                <div className={styles.toursSearch__search}>
                    <button type="submit" className={styles.searchButton}><FiSearch /></button>
                </div>
            </div>
        </form>
    )
}

export default SearchBar