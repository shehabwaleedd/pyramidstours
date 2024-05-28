import React, { useState } from 'react';
import styles from "./style.module.scss";
import { Testimonial } from '@/types/common';
import { RiDoubleQuotesL } from "react-icons/ri";
import Image from 'next/image';

const TestimonialCard = ({ testimonial, onDetailsOpen, onDetailsClose }: { testimonial: Testimonial, isSelected: boolean, onDetailsOpen: () => void, onDetailsClose: () => void }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleDetails = () => {
        setIsExpanded(!isExpanded);
        if (isExpanded) {
            onDetailsClose();
        } else {
            onDetailsOpen();
        }
    };

    return (
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                <div className={styles.quote}>
                    <RiDoubleQuotesL />
                </div>
                <p>{testimonial.description.slice(0, 150) + (testimonial.description.length > 150 ? '...' : '')}</p>
                {testimonial.description.length > 150 && (
                    <button onClick={handleToggleDetails} className={styles.showMoreButton}> Show More</button>
                )}
                <div className={styles.card__header}>
                    <div className={styles.card__header__avatar}>
                        <Image src={testimonial.avatar.url} alt={testimonial.userName} width={100} height={100} title={testimonial.userName} />
                    </div>
                    <div className={styles.card__header__info}>
                        <h3>{testimonial.userName}</h3>
                        <div className={styles.card__rate}>
                            {Array.from({ length: testimonial.rate }, (_, i) => (
                                <span key={i} style={{ color: 'gold' }}>&#9733;</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
