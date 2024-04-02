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
const GallerySlider = ({ images = [] }) => {
    const swiperRef = useRef<SwiperRef | null>(null);
    const swiperRefs = useRef<SwiperCore[]>([]);

    return (
        <Swiper
            ref={swiperRef}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
            className={styles.gallery}
            >
            {images.map((image, index) => (
                <SwiperSlide key={index} className={styles.gallery__card}>
                    <Image src={image.url} alt="Gallery Image" width={800} height={800}/>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default GallerySlider