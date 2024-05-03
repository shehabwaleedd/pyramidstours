import React from 'react'
import styles from "./style.module.scss"
import TourCard from '../card'
import { TourType } from '@/types/homePageTours'
import { serverUseToursByIds } from '@/lib/tours/serverUseToursByIds'
import SwiperTours from '../swiperTours'

interface ToursProps {
    location?: string;
    type?: string; // Optional type to distinguish between different modes
}



export default async function UnifiedToursComponent({ location, type = 'recommended' }: ToursProps) {
    const query = location ? `location.from=${location}` : '';
    const tours = await serverUseToursByIds(query);

    const shuffleAndSliceTo3 = (array: TourType[]) => {
        const shuffledArray = array.sort(() => Math.random() - 0.5);
        return shuffledArray.slice(0, 5);
    }
    const toursArray = shuffleAndSliceTo3(await tours);

    if (!tours) {
        return null;
    }

    const uniqueKey = parseInt(`${location}-${toursArray[0]?.id || 'default'}`);

    return (
        <section className={styles.recommendedTours}>
            <div className={styles.recommendedTours__container}>
                <SwiperTours tours={toursArray} index={uniqueKey} title={`${type === 'recommended' ? 'Similar Tours' : 'Tours You Might Like'}`} />
            </div>
        </section>
    )
}

