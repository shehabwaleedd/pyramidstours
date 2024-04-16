'use client'
import React, { useEffect, useState, useRef, FC } from 'react';
import styles from './style.module.scss';
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import useWindowWidth from '@/hooks/useWindowWidth';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from "swiper/modules";
import { RiDoubleQuotesL } from "react-icons/ri";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import Image from 'next/image';
import axios from 'axios';


SwiperCore.use([Navigation, Pagination]);

// Define the shape of the testimonial data
interface Testimonial {
    avatar: {
        url: string;
        public_id: string;
    };
    _id: string;
    userName: string;
    description: string;
    rate: number;
    email: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// Component declaration
const TestimonialsCards: FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const windowWidth = useWindowWidth();
    const swiperRef = useRef(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await axios.get<{ message: string; data: Testimonial[] }>('https://tours-b5zy.onrender.com/testimonial');
                setTestimonials(response.data.data); // Assuming the response has a `data` field holding the testimonials
                setLoading(false);
            } catch (error) {
                setError(error instanceof Error ? error.message : "An error occurred");
                setLoading(false);
            }
        };

        fetchTestimonials();
        return () => {
            setTestimonials([]); // Optional: Clean up testimonials
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                className={styles.testimonials__swiper}
            >
                {testimonials.map((testimonial) => (
                    <SwiperSlide key={testimonial._id} className={styles.testimonials__card}>
                        <div className={styles.testimonials__quote} >
                            <RiDoubleQuotesL />
                        </div>
                        <p>{testimonial.description.slice(0,550)}...</p>
                        <div className={styles.testimonials__card__header}>
                            <div className={styles.testimonials__card__header__avatar}>
                                <Image src={testimonial.avatar.url} alt={testimonial.userName} width={500} height={500} title={testimonial.userName} />
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
