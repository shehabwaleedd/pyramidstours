import React from 'react';
import styles from './style.module.scss';
import { fetchAndGroupToursByLocations } from '@/lib/tours/fetchToursByLocations';
import SwiperTours from '../swiperTours';



export default async function ToursHomePage() {
    const groupedTours = await fetchAndGroupToursByLocations();


    return (
        <section className={styles.testimonials}>
            {groupedTours.map((group, index) => ( <SwiperTours key={index} tours={group.tours} index={index} title={`${group.title}`} />))}
        </section>
    );
};



