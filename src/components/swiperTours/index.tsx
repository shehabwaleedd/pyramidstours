'use client';
import React, { useRef } from 'react';
import styles from '../toursHomePage/style.module.scss';
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Virtual } from "swiper/modules";
import SwiperCore from 'swiper';
import { TourType } from '@/types/homePageTours';
import "swiper/css";
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import TourCard from '../card';
import Skeleton from '@/animation/skeleton';
import { useInView } from "react-intersection-observer";

SwiperCore.use([Navigation, Virtual]);

const SwiperTours = ({ tours, index, title }: { tours: TourType[], index: number, title: string }) => {
    const swiperRef = useRef<SwiperCore | null>(null);

    const handleNextSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    const handlePrevSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
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
                            <button onClick={handlePrevSlide} aria-label="Previous slide">
                                <GoArrowLeft />
                            </button>
                            <button onClick={handleNextSlide} aria-label="Next slide">
                                <GoArrowRight />
                            </button>
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
                        virtual
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        spaceBetween={20}
                        navigation={{
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        }}
                    >
                        {tours.map((tour: TourType, idx: number) => (
                            <SwiperSlide key={tour._id} virtualIndex={idx}>
                                <TourCard tour={tour} base64={tour.base64 || ''} priority={idx < 4} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ) : (
                <Skeleton />
            )}
        </section>
    );
};

export default SwiperTours;
