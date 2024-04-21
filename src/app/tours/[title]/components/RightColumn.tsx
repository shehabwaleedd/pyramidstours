import React from 'react'
import ImageSlider from '@/components/imageSlider/ImageSlider'
import styles from "../page.module.scss"
import { TourType } from '@/types/homePageTours'
import { FaCheck, FaTimes } from 'react-icons/fa';

const RightColumn = ({ tour }: { tour: TourType }) => {
    return (
        <section className={styles.eventDetails__lower_right}>
            <ImageSlider images={tour?.images ?? []} name={tour?.title ?? ''} />
            <div className={styles.eventDetails__lower_right_desc}>
                <h2>Description</h2>
                <p dangerouslySetInnerHTML={{ __html: tour?.description ?? '' }} />
            </div>
            <div className={styles.eventDetails__lower_right_exclusionsAndInclusions}>
                <div className={styles.eventDetails__lower_right_exclusionsAndInclusions__inclusions}>
                    <h2 style={{ color: "var(--second-accent-color" }}>Inclusions</h2>
                    <ul>
                        {tour?.inclusions?.map((inclusion, index) => (
                            <li key={index}>
                                <FaCheck style={{ color: "var(--second-accent-color" }} /> {inclusion}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.eventDetails__lower_right_exclusionsAndInclusions__exclusions}>
                    <h2 style={{ color: "var(--accent-color" }}>Exclusions</h2>
                    <ul>
                        {tour?.exclusions?.map((exclusion, index) => (
                            <li key={index}>
                                <FaTimes style={{ fill: "var(--accent-color" }} /> {exclusion}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={styles.eventDetails__lower_right_desc}>
                <h2> Itenerary </h2>
                <p dangerouslySetInnerHTML={{ __html: tour?.itinerary ?? '' }} />
            </div>
            <div className={styles.eventDetails__lower_right_desc}>
                <h2> History Brief </h2>
                <p dangerouslySetInnerHTML={{ __html: tour?.historyBrief ?? '' }} />
            </div>
            <div className={styles.eventDetails__lower_right_exclusionsAndInclusions}>
                <div className={styles.eventDetails__lower_right_exclusionsAndInclusions__inclusions}>
                    <h2>Adults</h2>
                    <ul className={styles.group}>
                        {tour?.adultPricing?.map((pricing, index) => (
                            <li key={index}>
                                {pricing.adults}+ Adults: ${pricing.price}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.eventDetails__lower_right_exclusionsAndInclusions__exclusions}>
                    <h2>Children</h2>
                    <ul className={styles.group}>
                        {tour?.childrenPricing?.map((pricing, index) => (
                            <li key={index}>
                                {pricing.children} {index === 0 ? 'Child' : 'Children'}: ${pricing.price},
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default RightColumn