'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { TourType } from '@/types/homePageTours';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiHeart } from "react-icons/fi";
import { useAuth } from '@/context/AuthContext';
import styles from "./style.module.scss"


const TourCard: React.FC<{ tour: TourType }> = ({ tour }) => {

    const router = useRouter();
    const { addToWishlist, removeFromWishlist, wishlist } = useAuth();
    const isInWishlist = useMemo(() => wishlist.some(item => item._id === tour._id), [wishlist, tour._id]);
    const slugTitle = tour.title.replace(/ /g, '-').toLowerCase();


    if (!tour) {
        console.error("Tour data is missing.");
        return null;
    }


    const handleWishlistClick = async (event: React.MouseEvent, tourId: string) => {
        event.stopPropagation();
        if (isInWishlist) {
            removeFromWishlist(tourId);
        } else {
            addToWishlist(tour);
        }
    };

    const handleTourClick = (title: string) => {
        router.push(`/tours/${title}`);
    }

    const originalPrice = parseFloat(String(tour.adultPricing.find(p => p.adults === 1)?.price ?? '0'));
    const increasedPrice = tour.hasOffer ? originalPrice * 1.15 : originalPrice;

    // Round to nearest 5
    const roundedPrice = Math.round(increasedPrice / 5) * 5;



    return (
        <div className={styles.tours__container_card} onClick={() => handleTourClick(slugTitle)}>
            <div className={styles.image}>
                <Image src={tour.mainImg.url} alt={tour.title} width={500} height={500} />
                <div style={{ zIndex: 99999 }}>
                    {tour.hasOffer ? (
                        <span style={{ backgroundColor: "var(--accent-color)" }}>
                            Offer
                        </span>
                    ) : (
                        <span style={{ backgroundColor: "var(--second-accent-color)" }}>
                            {tour.category}
                        </span>
                    )}
                    <button onClick={(event) => handleWishlistClick(event, tour._id)}
                        style={{ backgroundColor: isInWishlist ? "#ffe4e4" : "var(--background-color)", zIndex: 99999 }}>
                        <FiHeart style={{ color: isInWishlist ? "var(--accent-color)" : "inherit", zIndex: 99999 }} />
                    </button>
                </div>

            </div>
            <div className={styles.bottom}>
                <h3>{tour.title.slice(0, 50)}...</h3>
                <div className={styles.bottom_group}>
                    {tour.hasOffer ? (
                        <>
                            <span>From $<span style={{ textDecoration: 'line-through' }}>{roundedPrice}</span></span>
                            <span>${originalPrice},</span>
                        </>
                    ) : (
                        <span>From ${originalPrice},</span>
                    )}
                    <span>{tour.location.to}</span>
                </div>
                <p>{tour.description.replace(/<[^>]*>/g, '').slice(0, 150)}...</p>
                <button onClick={() => handleTourClick(slugTitle)}>Book Now</button>
            </div>
        </div>
    )
}

export default TourCard;