import React from 'react'
import { Testimonial } from '@/types/common'
import Image from 'next/image'
import { RiDoubleQuotesL } from 'react-icons/ri'
import styles from './style.module.scss'
import { motion } from 'framer-motion'

const ShowMore = ({ testimonial, onDetailsClose }: { testimonial: Testimonial, onDetailsClose: () => void }) => {
    return (
        <motion.div className={`${styles.expandedView}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={`${styles.expandedContent}`}>
                <button onClick={onDetailsClose} className={styles.closeButton}>
                    Close
                </button>
                <div className={styles.quote}>
                    <RiDoubleQuotesL />
                </div>
                <p>{testimonial.description}</p>
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
        </motion.div>
    )
}

export default ShowMore