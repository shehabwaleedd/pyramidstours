'use client';

import React, { memo } from 'react';
import { TourType } from '@/types/homePageTours';
import Image from 'next/image';
import styles from "./style.module.scss";
import Link from 'next/link';
import CardABS from './components/CardABS';
import CardBottom from './components/CardBottom';

interface TourCardProps {
    tour: TourType;
    base64: string;
    priority: boolean;
}

const TourCard: React.FC<TourCardProps> = ({ tour, base64, priority }) => {

    const slugTitle = tour.title.replace(/ /g, '-').toLowerCase();

    if (!tour) {
        console.error("Tour data is missing.");
        return null;
    }

    return (
        <Link className={styles.tours__container_card} href={`/tours/${slugTitle}`} aria-label={`View ${tour.title}`}>
            <div className={styles.image}>
                <picture>
                    <Image
                        src={tour.mainImg.url}
                        alt={tour.title}
                        width={500}
                        height={500}
                        priority={priority}
                        loading={priority ? 'eager' : 'lazy'}
                        blurDataURL={base64}
                        placeholder="blur"
                    />
                </picture>
                <CardABS tour={tour} />
            </div>
            <div className={styles.bottom}>
                <h3>{tour.title.slice(0, 50)}...</h3>
                <CardBottom tour={tour} />
                <p>{tour.description.replace(/<[^>]*>/g, '').slice(0, 150)}...</p>
                <button aria-label={`Book ${tour.title}`}>Book Now</button>
            </div>
        </Link>
    );
}

export default memo(TourCard);
