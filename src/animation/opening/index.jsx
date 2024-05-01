import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import styles from './style.module.scss';
import { motion } from 'framer-motion';
const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Merhaba", "Guten tag", "Ahlan"]
import axios from 'axios';
const Opening = ({ setHasAnimationShown }) => {

    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const isMobile = dimension.width < 768;

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/tour`);
            console.log('Data fetched:', response.data);
            setIsDataLoaded(true);
            setLoading(false);
        } catch (e) {
            setError(true);
            console.error('Failed to fetch data:', e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    useEffect(() => {
        if (isDataLoaded) {
            const interval = setInterval(() => {
                setIndex((prevIndex) => (prevIndex + 1) % words.length)
            }, 100);
            return () => clearInterval(interval);
        }
    }, [index, isDataLoaded]);


    useEffect(() => {
        if (!loading && !error) {
            const container = document.querySelector(`.${styles.introduction}`);
            const tl = gsap.timeline();
            tl.to(container, {
                top: '0vh',
                duration: 0.8,
                ease: 'power3.inOut',
                delay: 0.2,
                onComplete: () => {
                    gsap.to(container, {
                        top: '-120vh',
                        duration: 0.8,
                        ease: 'power3.inOut',
                        delay: 1.3,
                        onComplete: () => {
                            container.style.display = 'none';
                        }
                    });
                    sessionStorage.setItem("hasAnimationShown", "true");
                    setHasAnimationShown(true)
                },
            });
        }
    }, [loading, error]);

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`

    const curve = {
        initial: {
            d: initialPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: targetPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
        }
    }

    const straight = {
        initial: {
            d: 'M0 0 L0 0 L0 0 Q0 0 0 0 L0 0',
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: 'M0 0 L0 0 L0 0 Q0 0 0 0 L0 0',
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
        }
    }


    return (
        <div className={styles.introduction}>
            {isDataLoaded ? (
                <>
                    {dimension.width > 0 && (
                        <>
                            <p>
                                <span></span>
                                {words[index]}
                            </p>
                            <svg>
                                {isMobile ? (
                                    <motion.path
                                        d={targetPath}
                                        animate="exit"
                                        initial="initial"
                                        variants={straight}
                                        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}></motion.path>
                                ) : (
                                    <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
                                )}
                            </svg>
                        </>
                    )}
                </>) : (
                <h2>Loading...</h2>
            )}
        </div>
    )
}

export default Opening