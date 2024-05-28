'use client'
import React, { useRef } from 'react';
import "./SwipeTours.scss"
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from 'swiper';
import { TourType } from '@/types/homePageTours';
import "swiper/css";
import 'swiper/css/navigation';
import TourCard from "@/components/card"
import Link from 'next/link';


SwiperCore.use([Navigation]);

const SwiperTours: React.FC<{ tours: TourType[], index: number, title: string, isViewMoreAllowed: boolean }> = ({ tours, index, title, isViewMoreAllowed }) => {
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
        <section className="swiperSection">
            <div key={index}>
                <div className="homeTours__upper">
                    <h2>{title}</h2>
                    <div className="homeTours_btns">
                        <button onClick={handlePrevSlide} aria-label="Previous slide">
                            <GoArrowLeft />
                        </button>
                        <button onClick={handleNextSlide} aria-label="Next slide">
                            <GoArrowRight />
                        </button>
                    </div>
                </div>
                <Swiper
                    className="homeTours_btns"
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
                    {isViewMoreAllowed && (
                        <SwiperSlide key="view-more">
                            <div className="viewMoreCard">
                                <Link href={`/${title.toLowerCase().replace(/ /g, '-')}`} aria-label={`View more ${title.toLowerCase()}`}>
                                    View more of {title}
                                </Link>
                            </div>
                        </SwiperSlide>
                    )}

                </Swiper>
            </div>
        </section>
    );
};

export default SwiperTours;
