import React from 'react';
import styles from './style.module.scss';
import { fetchAndGroupTours } from '@/lib/tours/fetchToursByLocations';
import SwiperTours from '../swiperTours';
import getBase64 from '@/lib/getLocalBase64';


async function enhancedFetchAndGroupTours() {
    const groupedTours = await fetchAndGroupTours();

    for (const group of groupedTours) {
        for (const tour of group.tours) {
            tour.base64 = await getBase64(tour.mainImg.url);
        }
    }

    return groupedTours;
}

export default async function ToursHomePage() {
    const groupedTours = await enhancedFetchAndGroupTours();

    return (
        <section className={styles.testimonials}>
            {groupedTours.map((group, index) => ( <SwiperTours key={index} tours={group.tours} index={index} title={`${group.title}`} />))}
        </section>
    );
};



