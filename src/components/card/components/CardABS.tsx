'use client'
import React, { useMemo } from 'react';
import styles from '../style.module.scss';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoMdHeart } from "react-icons/io";
import { useWishlist } from '@/context/WishlistContext';
import { TourType } from '@/types/homePageTours';
import { useRouter } from 'next/navigation';

const CardABS = ({ tour }: { tour: TourType }) => {
    const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
    const isInWishlist = useMemo(() => wishlist.some(item => item._id === tour._id), [wishlist, tour._id]);
    const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, '-');
    const router = useRouter();

    const handleWishlistClick = async (event: React.MouseEvent, tourId: string) => {
        event.preventDefault();
        event.stopPropagation();
        if (isInWishlist) {
            removeFromWishlist(tourId);
        } else {
            addToWishlist(tour);
        }
    };

    const handleCategoryClick = (event: React.MouseEvent, category: string) => {
        event.preventDefault();
        event.stopPropagation();
        const slugCategory = slugify(category);
        router.push(`/${slugCategory}`);
    }

    return (
        <div className={styles.cardABS}>
            {tour.hasOffer ? (
                <span style={{ backgroundColor: "var(--accent-color)" }}>
                    Offer
                </span>
            ) : (
                <button className={styles.catBtn} style={{ backgroundColor: "var(--second-accent-color)" }} onClick={(event) => handleCategoryClick(event, tour.category)}>
                    {tour.category}
                </button>
            )}
            <button
                className={`${styles.wishlist} ${isInWishlist ? styles.wishlistActive : styles.wishlistInactive}`}
                onClick={(event) => handleWishlistClick(event, tour._id)}
                aria-label="Add to wishlist"
            >
                {isInWishlist ? <IoMdHeart /> : <IoMdHeartEmpty />}
            </button>
        </div>
    );
}

export default CardABS;
