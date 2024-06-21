'use client'
import React from 'react';
import dynamic from 'next/dynamic';
import styles from '../page.module.scss';
import { TourType } from '@/types/homePageTours';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Prices from './Prices';
import Description from './rightColumnComponents/Description';
import Itinerary from './rightColumnComponents/Itinerary';
import HistoryBrief from './rightColumnComponents/History';
import HeaderSkeleton from '@/animation/skeleton/HeaderSkeleton';
const ImageSlider = dynamic(() => import('@/components/imageSlider/ImageSlider'), { ssr: false, loading: () => <HeaderSkeleton /> });

const RightColumn = ({ tour }: { tour: TourType }) => {
    return (
        <section className={styles.eventDetails__lower_right}>
            <ImageSlider images={tour?.images ?? []} name={tour?.title ?? ''} />
            <Description description={tour?.description ?? ''} />
            <div className={styles.eventDetails__lower_right_exclusionsAndInclusions}>
                <div className={styles.eventDetails__lower_right_exclusionsAndInclusions__inclusions}>
                    <h2 style={{ color: "var(--third-accent-color)" }}>Inclusions</h2>
                    <ul>
                        {tour?.inclusions?.map((inclusion, index) => (
                            <li key={index}>
                                <FaCheck style={{ color: "var(--third-accent-color)" }} /> {inclusion}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.eventDetails__lower_right_exclusionsAndInclusions__exclusions}>
                    <h2 style={{ color: "var(--accent-color)" }}>Exclusions</h2>
                    <ul>
                        {tour?.exclusions?.map((exclusion, index) => (
                            <li key={index}>
                                <FaTimes style={{ fill: "var(--accent-color)" }} /> {exclusion}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Itinerary itinerary={tour?.itinerary ?? ''} />
            <HistoryBrief historyBrief={tour?.historyBrief ?? ''} />
            <Prices tour={tour} />
        </section>
    );
};

RightColumn.displayName = 'RightColumn';

export default RightColumn;
