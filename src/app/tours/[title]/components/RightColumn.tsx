import React from 'react';
import ImageSlider from '@/components/imageSlider/ImageSlider';
import styles from '../page.module.scss';
import { TourType } from '@/types/homePageTours';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Prices from './Prices';
import { Parser } from 'html-to-react';

const htmlToReactParser = Parser();

const RightColumn = ({ tour }: { tour: TourType }) => {


    const renderHTMLContent = (htmlContent: string) => {
        return htmlToReactParser.parse(htmlContent);
    };


    return (
        <section className={styles.eventDetails__lower_right}>
            <ImageSlider images={tour?.images ?? []} name={tour?.title ?? ''} />
            <div className={styles.eventDetails__lower_right_desc}>
                <h2>Description</h2>
                <div>{renderHTMLContent(tour?.description ?? '')}</div>
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
                <div>{renderHTMLContent(tour?.itinerary ?? '')}</div>
            </div>
            <div className={styles.eventDetails__lower_right_desc}>
                <h2>History Brief</h2>
                <div>{renderHTMLContent(tour?.historyBrief ?? '')}</div>
            </div>
            <Prices tour={tour} />
        </section>
    );
};

export default RightColumn;
