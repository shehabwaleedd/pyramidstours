import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import axios from 'axios';
import styles from "./style.module.scss"

const Opening = ({ setHasAnimationShown, hasAnimationShown }) => {
    const [loadingPercentage, setLoadingPercentage] = useState(0); // State to track loading percentage
    const [loadingComplete, setLoadingComplete] = useState(false);
    const loadingBarRef = useRef(null);
    const containerRef = useRef(null);
    const tl = useRef(gsap.timeline({ paused: true }));
    const requestId = useRef();

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/event`);
            const totalEvents = response.data.data.result.length;
            let loadedEvents = 0;

            const updateProgress = () => {
                if (loadedEvents < totalEvents) {
                    loadedEvents++;
                    const progress = Math.round((loadedEvents / totalEvents) * 100);
                    setLoadingPercentage(progress);
                    gsap.to(loadingBarRef.current, { width: `${progress}%`, ease: 'power1.inOut', duration: 0.5 });
                    setTimeout(updateProgress, 50);
                } else {
                    // Ensure the completion animation only starts after the last update
                    gsap.to(loadingBarRef.current, { autoAlpha: 0, duration: 0.5, onComplete: () => completeAnimation() });
                }
            };

            updateProgress();
        } catch (error) {
            console.error('Failed to fetch events:', error);
        }
    };

    const completeAnimation = () => {
        gsap.to(containerRef.current, {
            y: '-100%', display: "none", duration: 0.5, onComplete: () => {
                sessionStorage.setItem('hasAnimationShown', 'true');
                setHasAnimationShown(true);
            }
        });
    };

    useEffect(() => {
        if (!sessionStorage.getItem('hasAnimationShown')) {
            fetchEvents();
        }
    }, []);


    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.loading_bar} ref={loadingBarRef}></div>
            <div className={styles.loading_text}>{loadingPercentage}%</div>
        </div>
    );
};

export default Opening;
