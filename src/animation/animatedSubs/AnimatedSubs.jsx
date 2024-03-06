import styles from './style.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { slideUp } from './animation';

const AnimatedSubs = ({ phrase }) => {
    const description = useRef(null);
    const isInView = useInView(description, { once: true }
    )

    return (
        <div ref={description} className={styles.description}>
            <div className={styles.body}>
                <p>
                    {
                        phrase.split(" ").map((word, index) => {
                            return <span key={index} className={styles.mask}><motion.span variants={slideUp} custom={index} animate={isInView ? "open" : "closed"} key={index}
                                
                            >{word}</motion.span></span>
                        })
                    }
                </p>
            </div>
        </div>
    )
}

export default AnimatedSubs