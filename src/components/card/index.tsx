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

    const handleTourClick = (id: string) => {
        router.push(`/tours/${id}`);
    }


    return (
        <div className={styles.tours__container_card} onClick={() => handleTourClick(tour._id)}>
            <div className={styles.image}>
                <Image src={tour.mainImg.url} alt={tour.title} width={500} height={500} />
                <div style={{ zIndex: 99999 }}>
                    {tour.hasOffer ? (
                        <span style={{ backgroundColor: "var(--accent-color)" }}>
                            Offer
                        </span>
                    ) : (
                        <span style={{ backgroundColor: "var(--success-color)" }}>
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
                    <span>From ${tour.adultPricing.find(p => p.adults === 1)?.price ?? 'N/A'},</span>
                    <span>{tour.location.to}</span>
                </div>
                <p>{tour.description.replace(/<[^>]*>/g, '').slice(0, 150)}...</p>
                <button onClick={() => handleTourClick(tour._id)}>Book Now</button>
            </div>
        </div>
    )
}

export default TourCard;