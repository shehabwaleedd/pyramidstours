'use client'

import React from 'react'
import { TourType } from '@/types/homePageTours';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiHeart } from "react-icons/fi";
import { useAuth } from '@/context/AuthContext';
import styles from "./style.module.scss"
import Link from 'next/link';


const TourCard: React.FC<{ tour: TourType }> = ({ tour }) => {

    const router = useRouter();
    const { addToWishlist, removeFromWishlist, wishlist } = useAuth();
    const isTourInWishlist = (tourId: string) => {
        return (wishlist as unknown as { _id: string }[]).some(tour => tour._id === tourId);
    };

    if (!tour) {
        console.error("Tour data is missing.");
        return null;  // or some placeholder component
    }
    

    const handleWishlistClick = (event: React.MouseEvent, tourId: string) => {
        event.stopPropagation();
        if (isTourInWishlist(tourId)) {
            removeFromWishlist(tourId);
        } else {
            addToWishlist(tourId);
        }
    };

    const handleTourClick = (id: string) => {
        router.push(`/tours/${id}`);
    }


    return (
        <Link className={styles.tours__container_card} href={`/tours/${tour._id}`}>
            <div className={styles.image}>
                <Image src={tour.mainImg.url} alt={tour.title} width={500} height={500} />
                <div style={{ zIndex: 99 }}>
                    <span style={{ backgroundColor: "var(--accent-color)" }}>
                        Offer
                    </span>
                    <button onClick={(event) => handleWishlistClick(event, tour._id)} style={{ backgroundColor: isTourInWishlist(tour._id) ? "#ffe4e4" : "var(--background-color)", }}>
                        {isTourInWishlist(tour._id) ? <FiHeart style={{ fill: "var(--accent-color)", color: "var(--accent-color)" }} /> : <FiHeart />}
                    </button>
                </div>

            </div>
            <div className={styles.bottom}>
                <h3>{tour.title.slice(0, 50)}...</h3>
                <span>From ${tour.adultPricing.find(p => p.adults === 1)?.price ?? 'N/A'}</span>
                <p>{tour.description.replace(/<[^>]*>/g, '').slice(0, 150)}...</p>
                <button onClick={() => handleTourClick(tour._id)}>Book Now</button>
            </div>
        </Link>
    )
}

export default TourCard;