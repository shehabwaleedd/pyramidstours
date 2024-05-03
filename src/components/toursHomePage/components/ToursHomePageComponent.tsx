'use client'
import React from 'react';
import { useInView } from 'react-intersection-observer';
import LazySwiperTours from './LazySwiperTours';
import styles from '../style.module.scss';
import { TourType } from '@/types/homePageTours';


export interface GroupedToursType {
    title: string;
    tours: TourType[];
}


interface ToursHomePageComponentProps {
    groupedTours: GroupedToursType[];
}

const ToursHomePageComponent: React.FC<ToursHomePageComponentProps> = ({ groupedTours }) => {
    return (
        <section className={styles.toursHomePage}>
            {groupedTours.map((group, index) => (
                <TourGroupSection key={index} group={group} index={index} />
            ))}
        </section>
    );
};

interface TourGroupSectionProps {
    group: GroupedToursType;
    index: number;
}

const TourGroupSection: React.FC<TourGroupSectionProps> = ({ group, index }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1  // Trigger as soon as even 10% of the element is visible.
    });

    return (
        <div ref={ref} className={styles.groupSection}>
            {inView && <LazySwiperTours tours={group.tours} title={group.title} index={index} />}
        </div>
    );
};

export default ToursHomePageComponent;
