'use client'

import React, { useMemo } from 'react'
import { TourType } from '@/types/homePageTours';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from "./style.module.scss"
import { useWishlist } from '@/context/WishlistContext';
import { IoMdHeartEmpty } from "react-icons/io";

const TourCard: React.FC<{ tour: TourType }> = ({ tour }) => {

    const router = useRouter();
    const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
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

    const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, '-');



    const handleTourClick = (title: string) => {
        router.push(`/tours/${title}`);
    }

    const handleCategoryClick = (event: React.MouseEvent, category: string) => {
        event.stopPropagation();
        const slugCategory = slugify(category);
        router.push(`/${slugCategory}`);
    }


    const originalPrice = parseFloat(String(tour.adultPricing.find(p => p.adults === 1)?.price ?? '0'));
    const increasedPrice = tour.hasOffer ? originalPrice * 1.15 : originalPrice;

    // Round to nearest 5
    const roundedPrice = Math.round(increasedPrice / 5) * 5;



    return (
        <div className={styles.tours__container_card} onClick={() => handleTourClick(slugTitle)}>
            <div className={styles.image}>
                <Image src={tour.mainImg.url} alt={tour.title} width={500} height={500} sizes="(min-width: 2780px) 16.36vw, (min-width: 1880px) calc(22.5vw - 33px), (min-width: 1280px) 28.97vw, (min-width: 780px) calc(45vw - 28px), (min-width: 580px) 90vw, calc(98.08vw - 18px)" layout="responsive"
                    priority={true} loading="eager"
                />
                <div style={{ zIndex: 99999 }}>
                    {tour.hasOffer ? (
                        <span style={{ backgroundColor: "var(--accent-color)" }}>
                            Offer
                        </span>
                    ) : (
                        <button className={styles.catBtn} style={{ backgroundColor: "var(--second-accent-color)" }} onClick={(event) => handleCategoryClick(event, tour.category)}>
                            {tour.category}
                        </button>
                    )}
                    <button onClick={(event) => handleWishlistClick(event, tour._id)}
                        style={{ backgroundColor: isInWishlist ? "#ffe4e4" : "var(--background-color)", zIndex: 99999 }}>
                        <IoMdHeartEmpty style={{ color: isInWishlist ? "var(--accent-color)" : "inherit", zIndex: 99999 }} />
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