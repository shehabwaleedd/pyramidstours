'use client'
import React, { useRef } from 'react';
import styles from './style.module.scss';
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import useWindowWidth from '@/hooks/useWindowWidth';
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { TourGroup, TourType } from '@/types/homePageTours';
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import TourCard from '../card';
import Skeleton from '@/animation/skeleton';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '../loginForm/loginForm';


SwiperCore.use([Navigation, Pagination]);


const SwiperTours = ({ tours, index, title }: { tours: TourType[], index: number, title: string, }) => {
    const swiperRefs = useRef<SwiperCore[]>([]);
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth ? windowWidth < 555 : false;
    const isTablet = windowWidth ? windowWidth < 777 : false;
    const isBigScreen = windowWidth ? windowWidth < 1500 : false;
    const { isLoginOpen, setIsLoginOpen } = useAuth();


    const handleNextSlide = (index: number) => {
        swiperRefs.current[index]?.slideNext();
    };

    const handlePrevSlide = (index: number) => {
        swiperRefs.current[index]?.slidePrev();
    };

    if (!tours) {
        return (
            <motion.section className={styles.testimonials}>
                <Skeleton />
            </motion.section>
        );
    }


    return (
        <>
            <div key={index}>
                <div className={styles.testimonials__upper}>
                    <h2>{title}</h2>
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
                    {tours?.map((tour: TourType) => (
                        <SwiperSlide key={tour._id}>
                            <TourCard tour={tour} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <LoginForm isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />
        </>
    )
}

export default SwiperTours