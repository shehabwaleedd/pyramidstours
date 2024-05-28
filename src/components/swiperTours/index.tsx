// SwiperTours.tsx

import React, { useRef } from 'react';
import styles from '@/components/toursHomePage/style.module.scss';
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from 'swiper';
import { TourType } from '@/types/homePageTours';
import "swiper/css";
import 'swiper/css/navigation';
import TourCard from "@/components/card"

SwiperCore.use([Navigation]);

const SwiperTours: React.FC<{ tours: TourType[], index: number, title: string }> = ({ tours, index, title }) => {
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

    return (
        <section className={styles.swiperSection}>
            <div key={index}>
                <div className={styles.homeTours__upper}>
                    <h2>{title}</h2>
                    <div className={styles.homeTours_btns}>
                        <button onClick={handlePrevSlide} aria-label="Previous slide">
                            <GoArrowLeft />
                        </button>
                        <button onClick={handleNextSlide} aria-label="Next slide">
                            <GoArrowRight />
                        </button>
                    </div>
                </div>
                <Swiper
                    className={styles.swiperContainer}
                    breakpoints={{
                        576: { slidesPerView: 1 },
                        1024: { slidesPerView: 2 },
                        1440: { slidesPerView: 3 },
                        2560: { slidesPerView: 4 },
                    }}
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
                        <SwiperSlide key={tour._id}>
                            <TourCard tour={tour} base64={tour.base64 || ''} priority={idx < 4} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default SwiperTours;
