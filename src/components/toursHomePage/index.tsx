'use client'
import React, { useRef } from 'react';
import styles from './style.module.scss';
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import useWindowWidth from '@/hooks/useWindowWidth';
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { useAllTours } from '@/lib/tours/useAllTours';
import { TourGroup, TourType } from '@/types/homePageTours';
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import TourCard from '../card';
import Skeleton from '@/animation/skeleton';

SwiperCore.use([Navigation, Pagination]);



const ToursHomePage: React.FC = () => {
    const { tours, loading } = useAllTours();
    const swiperRefs = useRef<SwiperCore[]>([]);
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth ? windowWidth < 555 : false;
    const isTablet = windowWidth ? windowWidth < 777 : false;
    const isBigScreen = windowWidth ? windowWidth < 1500 : false;
    const locationOrder: { [key: string]: string } = {
        "Cairo": "Cairo Tours",
        "Giza": "Giza Tours",
        "Luxor": "Luxor Tours",
        "Aswan": "Aswan Tours",
        "Alexandria": "Alexandria Tours",
        "Sharm Al-Sheikh": "Sharm Al-Sheikh Tours",
        "Dahab": "Dahab Tours",
        "Hurghada": "Hurghada Tours"
    };

    const sortAndGroupTours = (tours: TourType[]): TourGroup[] => {
        return Object.entries(locationOrder).map(([key, title]) => {
            const filteredTours = tours.filter(tour => tour.location.from === key);
            return { mainTitle: title, tours: filteredTours };
        }).filter(group => group.tours.length > 0);
    };


    const sortedAndGroupedTours = tours ? sortAndGroupTours(tours) : [];


    const handleNextSlide = (index: number) => {
        swiperRefs.current[index]?.slideNext();
    };

    const handlePrevSlide = (index: number) => {
        swiperRefs.current[index]?.slidePrev();
    };


    if (loading) {
        return (
            <motion.section className={styles.testimonials}>
                <Skeleton />
            </motion.section>
        );
    }


    return (
        <motion.section className={styles.testimonials}>
            {sortedAndGroupedTours?.map((group, index) => (
                group?.tours?.length > 0 && (
                    <div key={index}>
                        <div className={styles.testimonials__upper}>
                            <h2>{group.mainTitle}</h2>
                            <div className={styles.testimonials_btns}>
                                <button onClick={() => handlePrevSlide(index)} aria-label="Previous slide"><GoArrowLeft /></button>
                                <button onClick={() => handleNextSlide(index)} aria-label="Next slide"><GoArrowRight /></button>                            </div>
                        </div>
                        <Swiper
                            slidesPerView={isMobile ? 1 : isTablet ? 2 : isBigScreen ? 3 : 4}
                            className={styles.testimonials__slide}
                            onSwiper={(swiper) => swiperRefs.current[index] = swiper}
                            spaceBetween={isMobile ? 20 : 50}
                            navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}>
                            {group?.tours?.map((tour: TourType) => (
                                <SwiperSlide key={tour._id}>
                                    <TourCard tour={tour} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )
            ))}
        </motion.section>
    );
};

export default ToursHomePage;


