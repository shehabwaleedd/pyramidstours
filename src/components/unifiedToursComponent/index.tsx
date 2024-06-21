import React from 'react'
import styles from "./style.module.scss"
import { TourType } from '@/types/homePageTours'
import { serverUseToursByIds } from '@/lib/tours/serverUseToursByIds'
import SwiperTours from '../swiperTours'
import getBase64 from '@/lib/getLocalBase64'

type ToursProps = {
    location?: string;
    type?: 'recommended' | 'like';
}

interface EnhancedTourType extends TourType {
    base64?: string;
}

export default async function UnifiedToursComponent({ location, type = 'recommended' }: ToursProps) {
    const query = location ? `location.from=${location}` : '';
    const tours: EnhancedTourType[] | null = await serverUseToursByIds(query);

    if (!tours) {
        console.error('No tours found for query:', query);
        return;
    }


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

    const shuffleAndSliceTo5 = (array: EnhancedTourType[]) => {
        const shuffledArray = array.sort(() => Math.random() - 0.5);
        return shuffledArray.slice(0, 5);
    };
    const toursArray = shuffleAndSliceTo5(tours);

    return (
        <section className={styles.recommendedTours}>
            <SwiperTours tours={toursArray} title={`${type === 'recommended' ? 'Similar Tours' : 'Tours You Might Like'}`}  isViewMoreAllowed={false}/>
        </section>
    )
}

