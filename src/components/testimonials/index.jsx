'use client'
import React, { useRef, useEffect } from 'react';
import styles from './style.module.scss';
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import { usePathname } from 'next/navigation';
import { Swiper, SwiperSlide } from "swiper/react";
import useWindowWidth from '@/hooks/useWindowWidth';
import SwiperCore from 'swiper/core';
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

SwiperCore.use([Navigation, Pagination]);



const Testimonials = () => {
    const swiperRef = useRef(null);
    const swiperRefs = useRef([]);
    const pathname = usePathname();
    const windowWidth = useWindowWidth()
    const isMobile = windowWidth < 555;
    const isTablet = windowWidth < 777
    const isBigScreen = windowWidth < 1900
    const toursData = [
        {
            mainTitle: "Top Rated Tours",
            tours: [
                { src: '/assets/tours/1.jpg', alt: 'tour-1', title: 'Exclusive Cairo & Giza Pyramids Tour', duration: '2 days', price: 'From $350', description: 'Experience the wonders of ancient Egypt on a fully guided tour of Cairo and the Giza Pyramids. Includes luxury accommodations and a visit to the Egyptian Museum.' },
                { src: '/assets/tours/2.jpg', alt: 'tour-2', title: 'Aswan to Luxor - Nile Cruise Adventure', duration: '4 days', price: 'From $1,200', description: 'Cruise the Nile from Aswan to Luxor & explore the heart of Egypt. Enjoy guided tours of Karnak, Edfu, and Valley of the Kings.' },
                { src: '/assets/tours/3.jpg', alt: 'tour-3', title: 'Discover the Red Sea - Snorkeling and Diving', duration: '3 days', price: 'From $500', description: 'Dive into the crystal clear waters of the Red Sea. Explore vibrant coral reefs and encounter diverse marine life. Suitable for all skill levels.' },
                { src: '/assets/tours/4.jpg', alt: 'tour-4', title: 'Siwa Oasis Desert Safari', duration: '5 days', price: 'From $950', description: 'Embark on an unforgettable desert adventure to Siwa Oasis. Explore ancient ruins, enjoy traditional Bedouin hospitality, and marvel at the starry night sky.' },
            ],
        },
        {
            mainTitle: "Giza Tours",
            tours: [
                { src: '/assets/tours/1.jpg', alt: 'tour-5', title: 'Sunrise Camel Ride by the Pyramids', duration: '1 day', price: 'From $100', description: 'Witness a breathtaking sunrise on a camel ride around the Giza Pyramids. Enjoy a traditional Egyptian breakfast and a tour of the Sphinx.' },
                { src: '/assets/tours/2.jpg', alt: 'tour-6', title: 'Giza Pyramids and Sphinx Tour', duration: '1 day', price: 'From $80', description: 'Explore the iconic symbols of Egypt with a guided tour of the Giza Pyramids and Sphinx. Learn the history behind the ancient wonders.' },
                { src: '/assets/tours/3.jpg', alt: 'tour-7', title: 'Pyramids Sound and Light Show', duration: '1 night', price: 'From $50', description: 'Experience the magic of the pyramids at night with a spectacular sound and light show. An unforgettable journey through Pharaonic history.' },
                { src: '/assets/tours/4.jpg', alt: 'tour-8', title: 'Giza Pyramids, Sphinx, and Memphis Tour', duration: '2 days', price: 'From $300', description: 'Discover the secrets of the ancient world. Visit the Giza Pyramids, Sphinx, and the historic city of Memphis on this comprehensive tour.' },
            ],
        },
        {
            mainTitle: "Cairo Tours",
            tours: [
                { src: '/assets/tours/1.jpg', alt: 'tour-9', title: 'Historic Cairo and Islamic Cairo Tour', duration: '2 days', price: 'From $250', description: 'Delve into Egypt’s Islamic and Coptic heritage. Visit the Citadel of Salah El-Din, the Mohammed Ali Mosque, and the hanging church of Coptic Cairo.' },
                { src: '/assets/tours/2.jpg', alt: 'tour-10', title: 'Cairo Food Tour - Taste of Egypt', duration: '1 day', price: 'From $75', description: 'Savor the flavors of Egypt on this culinary journey through Cairo. Sample traditional dishes, sweets, and teas.' },
                { src: '/assets/tours/3.jpg', alt: 'tour-11', title: 'Cairo by Night - City Lights Tour', duration: '1 night', price: 'From $65', description: 'Explore the vibrant nightlife of Cairo. Visit iconic landmarks illuminated under the night sky and enjoy panoramic views of the city.' },
                { src: '/assets/tours/4.jpg', alt: 'tour-12', title: 'Egyptian Museum Private Guided Tour', duration: '1 day', price: 'From $90', description: 'Get up close with the treasures of Tutankhamun and artifacts from ancient Egypt with an expert guide in the renowned Egyptian Museum.' },
            ],
        },
        {
            mainTitle: "Luxor Tours",
            tours: [
                { src: '/assets/tours/1.jpg', alt: 'tour-13', title: 'Luxor West Bank Tour', duration: '1 day', price: 'From $200', description: 'Visit the Valley of the Kings, the Temple of Hatshepsut, and the Colossi of Memnon on a journey to the West Bank of Luxor.' },
                { src: '/assets/tours/2.jpg', alt: 'tour-14', title: 'Balloon Ride over Luxor at Sunrise', duration: '1 day', price: 'From $180', description: 'Float over the historic city of Luxor in a hot air balloon. Enjoy stunning sunrise views of the Nile River, Luxor Temple, and the Valley of the Kings.' },
                { src: '/assets/tours/3.jpg', alt: 'tour-15', title: 'Karnak and Luxor Temples Tour', duration: '1 day', price: 'From $150', description: 'Explore the colossal temples of Karnak and Luxor. Learn about ancient Egyptian gods and pharaohs in these architectural marvels.' },
                { src: '/assets/tours/4.jpg', alt: 'tour-16', title: 'Luxor to Aswan Nile Cruise', duration: '4 days', price: 'From $1,000', description: 'Sail the Nile in comfort from Luxor to Aswan. Discover temples, tombs, and ruins along the way, with guided tours at each stop.' },
            ],
        },
    ];
    

    const handleNextSlide = (index) => {
        if (swiperRefs.current[index]) {
            swiperRefs.current[index].slideNext();
        }
    };

    const handlePrevSlide = (index) => {
        if (swiperRefs.current[index]) {
            swiperRefs.current[index].slidePrev();
        }
    };





    return (
        <motion.section className={styles.testimonials}>
            {toursData.map((group, groupIndex) => (
                <div key={groupIndex}>
                    <div className={styles.testimonials__upper}>
                        <h2>{group.mainTitle}</h2>
                        <div className={styles.testimonials_btns}>
                            <button onClick={() => handlePrevSlide(groupIndex)} aria-label="Previous slide"><GoArrowLeft /></button>
                            <button onClick={() => handleNextSlide(groupIndex)} aria-label="Next slide"><GoArrowRight /></button>
                        </div>
                    </div>
                    <Swiper
                        ref={swiperRef}
                        slidesPerView={isMobile ? 1 : isTablet ? 2 : isBigScreen ? 3 : 4}
                        className={styles.testimonials__slide}
                        onSwiper={(swiper) => swiperRefs.current[groupIndex] = swiper}
                        spaceBetween={isMobile ? 20 : 50}
                        navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}>
                        {group.tours.map((tour, index) => (
                            <SwiperSlide key={index}>
                                <div className={styles.tours__container_card}>
                                    <div className={styles.image}>
                                        <Image src={tour.src} alt={tour.alt} width={800} height={800} />
                                        <div>
                                            <span style={{ backgroundColor: "var(--second-accent-color)" }}>
                                                Offer
                                            </span>
                                            <span>{tour.duration}</span>
                                        </div>
                                    </div>
                                    <div className={styles.bottom}>
                                        <h3>{tour.title}</h3>
                                        <span>{tour.price}</span>
                                        <p>{tour.description}</p>
                                        <button>Book Now</button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ))}
        </motion.section>
    );
};

export default Testimonials;
