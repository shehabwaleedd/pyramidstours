'use client'
import React, { useMemo } from 'react'
import styles from '../style.module.scss'
import { IoMdHeartEmpty } from 'react-icons/io'
import { useWishlist } from '@/context/WishlistContext'
import { TourType } from '@/types/homePageTours'
import { useRouter } from 'next/navigation'

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
        event.stopPropagation(); // Prevent Link navigation
        const slugCategory = slugify(category);
        router.push(`/${slugCategory}`);
    }



    return (
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
            <button onClick={(event) => handleWishlistClick(event, tour._id)} style={{ backgroundColor: isInWishlist ? "#ffe4e4" : "var(--background-color)", zIndex: 99999 }} aria-label="Add to wishlist">
                <IoMdHeartEmpty style={{ color: isInWishlist ? "var(--accent-color)" : "inherit", zIndex: 99999 }} />
            </button>
        </div>
    )
}

export default CardABS