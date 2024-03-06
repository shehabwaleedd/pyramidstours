'use client'
import React, { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import styles from "./style.module.scss"
import { translate } from "@/components/navbar/anim";

const AnimatedTitles = ({ word }) => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { threshold: 0.5 });


    return (
        <div ref={containerRef} className={styles.animatedTitle}>
            {word.split("").map((char, i) => (
                <motion.h2
                    key={char + i}
                    custom={[i * 0.02, (word.length - i) * 0.01]}
                    variants={translate}
                    initial="enter"
                    animate={isInView && "enter"}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.h2>
            ))}
        </div>
    );
};

export default AnimatedTitles;
