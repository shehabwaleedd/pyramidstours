import React from 'react'
import styles from "./style.module.scss"
import TourCard from '../card'
import { TourType } from '@/types/homePageTours'
import { serverUseToursByIds } from '@/lib/tours/serverUseToursByIds'
import SwiperTours from '../swiperTours'
import getBase64 from '@/lib/getLocalBase64'

interface ToursProps {
    location?: string;
    type?: string; // Optional type to distinguish between different modes
}

interface EnhancedTourType extends TourType {
    base64?: string;
}

export default async function UnifiedToursComponent({ location, type = 'recommended' }: ToursProps) {
    const query = location ? `location.from=${location}` : '';
    const tours: EnhancedTourType[] = await serverUseToursByIds(query);

    // Load base64 for each image if not already present
    await Promise.all(tours.map(async (tour) => {
        if (!tour.base64) {
            tour.base64 = await getBase64(tour.mainImg.url).catch(e => {
                console.error('Failed to load base64 for image:', e);
                return '';
            });
        }
    }));

    if (tours.length === 0) {
        return null; // No tours to display
    }

    // Shuffle and slice to a maximum of 5 tours
    const shuffleAndSliceTo5 = (array: EnhancedTourType[]) => {
        const shuffledArray = array.sort(() => Math.random() - 0.5);
        return shuffledArray.slice(0, 5);
    };
    const toursArray = shuffleAndSliceTo5(tours);

    const uniqueKey = parseInt(`${location}-${toursArray[0]?.id || 'default'}`);

    return (
        <section className={styles.recommendedTours}>
            <div className={styles.recommendedTours__container}>
                <SwiperTours tours={toursArray} index={uniqueKey} title={`${type === 'recommended' ? 'Similar Tours' : 'Tours You Might Like'}`} />
            </div>
        </section>
    )
}

