'use client'

import React, { useMemo } from 'react'
import { TourType } from '@/types/homePageTours';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from "./style.module.scss"
import { useWishlist } from '@/context/WishlistContext';
import { IoMdHeartEmpty } from "react-icons/io";
import { useCurrency } from '@/context/CurrencyContext';
import Link from 'next/link';

const currencySymbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    EGP: '£',
    SAR: '﷼',
    MXN: '$',
    GBP: '£',
    JPY: '¥',
    AUD: 'A$',
    CAD: 'C$',
    CHF: 'CHF',
    CNY: '¥',
    INR: '₹',
    BRL: 'R$',
    ZAR: 'R',
    RUB: '₽',
};



const TourCard: React.FC<{ tour: TourType, base64: string, priority: boolean }> = ({ tour, base64, priority }) => {

    const router = useRouter();
    const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
    const isInWishlist = useMemo(() => wishlist.some(item => item._id === tour._id), [wishlist, tour._id]);
    const slugTitle = tour.title.replace(/ /g, '-').toLowerCase();
    const { currency, rates } = useCurrency();


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


    const originalPriceUSD = parseFloat(String(tour.adultPricing.find((p) => p.adults === 1)?.price ?? '0'));
    const increasedPriceUSD = tour.hasOffer ? originalPriceUSD * 1.15 : originalPriceUSD;

    // Round to nearest 5
    const roundedPriceUSD = Math.round(increasedPriceUSD / 5) * 5;

    const convertPrice = (price: number, toCurrency: string) => {
        if (!rates[toCurrency]) return price;
        return (price * rates[toCurrency]).toFixed(2);
    };

    const originalPrice = convertPrice(originalPriceUSD, currency);
    const displayPrice = convertPrice(increasedPriceUSD, currency);
    const roundedPrice = convertPrice(roundedPriceUSD, currency);

    const currencySymbol = currencySymbols[currency] || '';

    return (
        <Link className={styles.tours__container_card} href={`/tours/${slugTitle}`} aria-label={`View ${tour.title}`}>
            <div className={styles.image}>
                <Image src={tour.mainImg.url}
                    objectFit='cover'
                    objectPosition='center'
                    alt={tour.title}
                    width={500}
                    height={500}
                    priority={priority}
                    loading={priority ? 'eager' : 'lazy'}
                    blurDataURL={base64}
                    placeholder="blur"
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
                    <button onClick={(event) => handleWishlistClick(event, tour._id)} style={{ backgroundColor: isInWishlist ? "#ffe4e4" : "var(--background-color)", zIndex: 99999 }} aria-label="Add to wishlist">
                        <IoMdHeartEmpty style={{ color: isInWishlist ? "var(--accent-color)" : "inherit", zIndex: 99999 }} />
                    </button>
                </div>

            </div>
            <div className={styles.bottom}>
                <h3>{tour.title.slice(0, 50)}...</h3>
                <div className={styles.bottom_group}>
                    {tour.hasOffer ? (
                        <>
                            <span>
                                From {currencySymbol}
                                <span style={{ textDecoration: 'line-through' }}>{roundedPrice}</span>
                            </span>
                            <span>
                                {currencySymbol}
                                {displayPrice}
                            </span>
                        </>
                    ) : (
                        <span>
                            From {currencySymbol}
                            {originalPrice}
                        </span>
                    )}
                    <span>{tour.location.to}</span>
                </div>
                <p>{tour.description.replace(/<[^>]*>/g, '').slice(0, 150)}...</p>
                <button onClick={() => handleTourClick(slugTitle)} aria-label={`Book ${tour.title}`}>Book Now</button>
            </div>
        </Link>
    )
}

export default TourCard;