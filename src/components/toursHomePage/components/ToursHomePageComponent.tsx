'use client';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from '../style.module.scss';
import { GroupedToursType } from '@/types/homePageTours';
import SwiperTours from '@/components/swiperTours';
import Skeleton from '@/animation/skeleton';

interface ToursHomePageComponentProps {
    groupedTours: GroupedToursType[];
}

const ToursHomePageComponent: React.FC<ToursHomePageComponentProps> = ({ groupedTours }) => {
    return (
        <section className={styles.homeTours}>
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
        threshold: 0.025 
    });

    // Render the first group (top-rated tours) immediately
    if (index === 0) {
        return (
            <div ref={ref}>
                <SwiperTours tours={group.tours} title={group.title} index={index} isViewMoreAllowed={true} />
            </div>
        );
    }

    return (
        <div ref={ref}>
            {inView ? (
                <SwiperTours tours={group.tours} title={group.title} index={index} isViewMoreAllowed={true} />
            ) : (
                <Skeleton />
            )}
        </div>
    );
};

export default ToursHomePageComponent;
