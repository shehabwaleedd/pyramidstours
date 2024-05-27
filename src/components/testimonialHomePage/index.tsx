'use client';
import React, { useRef } from 'react';
import styles from './style.module.scss';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
import { Navigation, Pagination, Virtual } from "swiper/modules";
import { RiDoubleQuotesL } from "react-icons/ri";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import Image from 'next/image';
import { Testimonial } from '@/types/common';

SwiperCore.use([Navigation, Pagination, Virtual]);

// Component declaration
const TestimonialsCards = ({ data }: { data: Testimonial[] }) => {
    const swiperRef = useRef(null);

    return (
        <section className={styles.testimonials}>
            <h2 className={styles.testimonials__title}>Testimonials</h2>
            <Swiper
                ref={swiperRef}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                breakpoints={{
                    380: {
                        slidesPerView: 1,
                        spaceBetween: 40,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1888: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    }
                }}
                virtual
                className={styles.testimonials__swiper}
            >
                {data.map((testimonial, index) => (
                    <SwiperSlide key={testimonial._id} virtualIndex={index} className={styles.testimonials__card}>
                        <div className={styles.testimonials__quote}>
                            <RiDoubleQuotesL />
                        </div>
                        <p>{testimonial.description.slice(0, 550)}...</p>
                        <div className={styles.testimonials__card__header}>
                            <div className={styles.testimonials__card__header__avatar}>
                                <Image src={testimonial.avatar.url} alt={testimonial.userName} width={100} height={100} title={testimonial.userName} />
                            </div>
                            <div className={styles.testimonials__card__header__info}>
                                <h3>{testimonial.userName}</h3>
                                <div className={styles.testimonials__card__rate}>
                                    {Array.from({ length: testimonial.rate }, (_, i) => (
                                        <span key={i} style={{ color: 'gold' }}>&#9733;</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default TestimonialsCards;
