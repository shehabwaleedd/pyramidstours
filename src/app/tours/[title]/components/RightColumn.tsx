'use client'
import React, { useState } from 'react';
import ImageSlider from '@/components/imageSlider/ImageSlider';
import styles from '../page.module.scss';
import { TourType } from '@/types/homePageTours';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Prices from './Prices';
import { Parser } from 'html-to-react';
import { motion } from 'framer-motion';

const htmlToReactParser = Parser();

const RightColumn = ({ tour }: { tour: TourType }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [showFullItinerary, setShowFullItinerary] = useState(false);
    const [showFullHistoryBrief, setShowFullHistoryBrief] = useState(false);

    const renderHTMLContent = (htmlContent: string) => {
        return htmlToReactParser.parse(htmlContent);
    };

    const truncateHTMLContent = (htmlContent: string, maxLength: number) => {
        if (htmlContent.length <= maxLength) return htmlContent;
        return htmlContent.slice(0, maxLength) + '...';
    };

    const handleToggleDescription = () => setShowFullDescription(!showFullDescription);
    const handleToggleItinerary = () => setShowFullItinerary(!showFullItinerary);
    const handleToggleHistoryBrief = () => setShowFullHistoryBrief(!showFullHistoryBrief);

    return (
        <section className={styles.eventDetails__lower_right}>
            <ImageSlider images={tour?.images ?? []} name={tour?.title ?? ''} />
            <div className={styles.eventDetails__lower_right_desc}>
                <h2>Description</h2>
                <div>
                    {showFullDescription ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={styles.fullContent}
                        >
                            {renderHTMLContent(tour?.description ?? '')}
                        </motion.div>
                    ) : (
                        <div>
                            {renderHTMLContent(truncateHTMLContent(tour?.description ?? '', 500))}
                        </div>
                    )}
                    <button onClick={handleToggleDescription} className={styles.showMoreButton}>
                        {showFullDescription ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            </div>
            <div className={styles.eventDetails__lower_right_exclusionsAndInclusions}>
                <div className={styles.eventDetails__lower_right_exclusionsAndInclusions__inclusions}>
                    <h2 style={{ color: "var(--second-accent-color)" }}>Inclusions</h2>
                    <ul>
                        {tour?.inclusions?.map((inclusion, index) => (
                            <li key={index}>
                                <FaCheck style={{ color: "var(--second-accent-color)" }} /> {inclusion}
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
            <div className={styles.eventDetails__lower_right_desc}>
                <h2>Itinerary</h2>
                <div>
                    {showFullItinerary ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={styles.fullContent}
                        >
                            {renderHTMLContent(tour?.itinerary ?? '')}
                        </motion.div>
                    ) : (
                        <div>
                            {renderHTMLContent(truncateHTMLContent(tour?.itinerary ?? '', 500))}
                        </div>
                    )}
                    <button onClick={handleToggleItinerary} className={styles.showMoreButton}>
                        {showFullItinerary ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            </div>
            <div className={styles.eventDetails__lower_right_desc}>
                <h2>History Brief</h2>
                <div>
                    {showFullHistoryBrief ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={styles.fullContent}
                        >
                            {renderHTMLContent(tour?.historyBrief ?? '')}
                        </motion.div>
                    ) : (
                        <div>
                            {renderHTMLContent(truncateHTMLContent(tour?.historyBrief ?? '', 500))}
                        </div>
                    )}
                    <button onClick={handleToggleHistoryBrief} className={styles.showMoreButton}>
                        {showFullHistoryBrief ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            </div>
            <Prices tour={tour} />
        </section>
    );
};

export default RightColumn;
