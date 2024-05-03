'use client'
import React, { useRef, useEffect } from 'react';
import styles from './style.module.scss';
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { TourType } from '@/types/homePageTours';
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import TourCard from '../card';
import LoginForm from '../loginForm/loginForm';
import Skeleton from '@/animation/skeleton';
SwiperCore.use([Navigation, Pagination]);
import { useInView } from "react-intersection-observer";
import { useWishlist } from '@/context/WishlistContext';

const SwiperTours = ({ tours, index, title }: { tours: TourType[], index: number, title: string}) => {
    const swiperRefs = useRef<SwiperCore[]>([]);
    const { isLoginOpen, setIsLoginOpen } = useWishlist();
    const handleNextSlide = (index: number) => {
        swiperRefs.current[index]?.slideNext();
    };
    const handlePrevSlide = (index: number) => {
        swiperRefs.current[index]?.slidePrev();
    };

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0,
    });


    if (!tours) {
        return (
            <motion.section className={styles.testimonials}>
                <Skeleton />
            </motion.section>
        );
    }
    return (
        <section ref={ref}>
            {tours && inView ? (
                <div key={index}>
                    <div className={styles.testimonials__upper}>
                        <h2>{title}</h2>
                        <div className={styles.testimonials_btns}>
                            <button onClick={() => handlePrevSlide(index)} aria-label="Previous slide"><GoArrowLeft /></button>
                            <button onClick={() => handleNextSlide(index)} aria-label="Next slide"><GoArrowRight /></button>
                        </div>
                    </div>
                    <Swiper
                        className={styles.testimonials__slide}
                        breakpoints={{
                            576: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1268: {
                                slidesPerView: 3,
                            },
                            1868: {
                                slidesPerView: 4,
                            },
                            2768: {
                                slidesPerView: 5,
                            },
                        }}
                        onSwiper={(swiper) => swiperRefs.current[index] = swiper}
                        spaceBetween={20}
                        navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}>
                        {tours?.map((tour: TourType) => (
                            <SwiperSlide key={tour._id}>
                                <TourCard tour={tour} base64={tour.base64 || ''}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ) : (
                <Skeleton />
            )}
            <LoginForm isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />
        </section>
    )
}

export default SwiperTours