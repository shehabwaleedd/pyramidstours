'use client'
import React, { useRef, useEffect } from 'react';
import styles from './style.module.scss';
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import useWindowWidth from '@/hooks/useWindowWidth';
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { useAllTours } from '@/lib/tours/useAllTours';
import { MainImg, TourGroup, TourType, TourData } from '@/types/homePageTours';
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

SwiperCore.use([Navigation, Pagination]);



const Testimonials: React.FC = () => {
    const { tours, loading } = useAllTours();
    const swiperRef = useRef<SwiperRef | null>(null);
    const swiperRefs = useRef<SwiperCore[]>([]);
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth ? windowWidth < 555 : false;
    const isTablet = windowWidth ? windowWidth < 777 : false;
    const isBigScreen = windowWidth ? windowWidth < 1900 : false;
    const router = useRouter();
    // Filter tours for Cairo
    const cairoTours: TourType[] = Array.isArray(tours) ? tours.filter((tour: TourType) => tour.location.from === "Giza") : [];
    const cairoToursData: TourGroup = {
        mainTitle: "Giza Tours",
        tours: cairoTours,
    };

    useEffect(() => {
        console.log("Tours", tours);
    }, [tours]);

    const handleNextSlide = (index: number) => {
        swiperRefs.current[index]?.slideNext();
    };

    const handlePrevSlide = (index: number) => {
        swiperRefs.current[index]?.slidePrev();
    };

    const handleTourClick = (id: string) => {
        router.push(`/tours/${id}`);
    }



    return (
        <motion.section className={styles.testimonials}>
            <div>
                <div className={styles.testimonials__upper}>
                    <h2>{cairoToursData.mainTitle}</h2>
                    <div className={styles.testimonials_btns}>
                        <button onClick={() => handlePrevSlide(0)} aria-label="Previous slide"><GoArrowLeft /></button>
                        <button onClick={() => handleNextSlide(0)} aria-label="Next slide"><GoArrowRight /></button>
                    </div>
                </div>
                <Swiper
                    ref={swiperRef}
                    slidesPerView={isMobile ? 1 : isTablet ? 2 : isBigScreen ? 3 : 4}
                    className={styles.testimonials__slide}
                    onSwiper={(swiper) => swiperRefs.current[0] = swiper}
                    spaceBetween={isMobile ? 20 : 50}
                    navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}>
                    {cairoToursData.tours.map((tour, index) => (
                        <SwiperSlide key={index}>
                            <div className={styles.tours__container_card} onClick={() => handleTourClick(tour._id)}>
                                <div className={styles.image}>
                                    <Image src={tour.mainImg.url} alt={tour.title} width={500} height={500} />
                                    <div>
                                        <span style={{ backgroundColor: "var(--accent-color)" }}>
                                            Offer
                                        </span>
                                        <span style={{ color: "var(--title-color)" }}>{tour.duration}</span>
                                    </div>
                                </div>
                                <div className={styles.bottom}>
                                    <h3>{tour.title}</h3>
                                    <span>From ${tour.adultPricing.find(p => p.adults === 1)?.price ?? 'N/A'}</span>
                                    <p>{tour.description.slice(0, 150)}</p>
                                    <button>Book Now</button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </motion.section>
    );
};

export default Testimonials;
