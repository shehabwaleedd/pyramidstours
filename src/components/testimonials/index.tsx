'use client'
import React, { useRef, useEffect, useState } from 'react';
import styles from './style.module.scss';
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import useWindowWidth from '@/hooks/useWindowWidth';
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { useAllTours } from '@/lib/tours/useAllTours';
import { TourGroup, TourType } from '@/types/homePageTours';
import { useAuth } from '@/context/AuthContext';
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiHeart } from "react-icons/fi";

SwiperCore.use([Navigation, Pagination]);



const Testimonials: React.FC = () => {
    const { tours, loading } = useAllTours();
    const swiperRef = useRef<SwiperRef | null>(null);
    const swiperRefs = useRef<SwiperCore[]>([]);
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth ? windowWidth < 555 : false;
    const isTablet = windowWidth ? windowWidth < 777 : false;
    const isBigScreen = windowWidth ? windowWidth < 1900 : false;
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





    return (
        <motion.section className={styles.testimonials}>
            {sortedAndGroupedTours?.map((group, index) => (
                group?.tours?.length > 0 && (
                    <div key={index}>
                        <div className={styles.testimonials__upper}>
                            <h2>{group.mainTitle}</h2>
                            <div className={styles.testimonials_btns}>
                                <button onClick={() => handlePrevSlide(0)} aria-label="Previous slide"><GoArrowLeft /></button>
                                <button onClick={() => handleNextSlide(0)} aria-label="Next slide"><GoArrowRight /></button>
                            </div>
                        </div>
                        <Swiper
                            slidesPerView={isMobile ? 1 : isTablet ? 2 : isBigScreen ? 3 : 4}
                            className={styles.testimonials__slide}
                            onSwiper={(swiper) => swiperRefs.current[0] = swiper}
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

export default Testimonials;


const TourCard: React.FC<{ tour: TourType }> = ({ tour }) => {

    const router = useRouter();
    const { addToWishlist, removeFromWishlist, wishlist } = useAuth();
    const isTourInWishlist = (tourId: string) => {
        return (wishlist as { _id: string }[]).some(tour => tour._id === tourId);
    };

    const handleWishlistClick = (event: React.MouseEvent, tourId: string) => {
        event.stopPropagation();
        if (isTourInWishlist(tourId)) {
            removeFromWishlist(tourId);
        } else {
            addToWishlist(tourId);
        }
    };

    const handleTourClick = (id: string) => {
        router.push(`/tours/${id}`);
    }


    return (
        <div className={styles.tours__container_card} onClick={() => handleTourClick(tour._id)}>
            <div className={styles.image}>
                <Image src={tour.mainImg.url} alt={tour.title} width={500} height={500} />
                <div style={{ zIndex: 99 }}>
                    <span style={{ backgroundColor: "var(--accent-color)" }}>
                        Offer
                    </span>
                    <button onClick={(event) => handleWishlistClick(event, tour._id)} style={{ backgroundColor: isTourInWishlist(tour._id) ? "#ffe4e4" : "var(--background-color)", }}>
                        {isTourInWishlist(tour._id) ? <FiHeart style={{ fill: "var(--accent-color)", color: "var(--accent-color)" }} /> : <FiHeart />}
                    </button>
                </div>

            </div>
            <div className={styles.bottom}>
                <h3>{tour.title}</h3>
                <span>From ${tour.adultPricing.find(p => p.adults === 1)?.price ?? 'N/A'}</span>
                <p>{tour.description.replace(/<[^>]*>/g, '').slice(0, 150)}...</p>
                <button onClick={() => handleTourClick(tour._id)}>Book Now</button>
            </div>
        </div>
    )
}

