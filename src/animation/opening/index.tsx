'use client'

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import anime from 'animejs';
import styles from "./style.module.scss";
import { useAnimation } from '@/context/AnimationContext';

const Opening: React.FC = () => {
    const [animationComplete, setAnimationComplete] = useState(false);
    const counterRef = useRef<HTMLParagraphElement>(null);
    const textWrapperRef = useRef<HTMLParagraphElement>(null);
    const preLoaderRef = useRef<HTMLDivElement>(null);
    const loaderContentRef = useRef<HTMLDivElement>(null);
    const { renderingOpening, setRenderingOpening, setHasAnimationShown } = useAnimation();


    useEffect(() => {
        if (!renderingOpening) return;

        // GSAP to animate counter from 0 to 100 in 6 seconds
        gsap.fromTo(counterRef.current, {
            textContent: 0
        }, {
            textContent: 100,
            duration: 6,
            ease: "power1.inOut",
            snap: { textContent: 1 },
            onUpdate: function () {
                if (counterRef.current) {
                    const value = this.targets()[0].textContent;
                    counterRef.current.textContent = `${Math.floor(value)}`;
                }
            },
            onComplete: () => setAnimationComplete(true)
        });
    }, [renderingOpening]);


    useEffect(() => {
        if (animationComplete && renderingOpening) {
            // Wrap each character of the text in a span for individual animation
            if (textWrapperRef.current) {
                textWrapperRef.current.innerHTML = textWrapperRef.current.textContent!.replace(/\S/g, `<span class='${styles.letter}'>$&</span>`);
            }

            // Anime.js timeline for text and counter animations
            anime.timeline({ loop: false })
                .add({
                    targets: `.${styles.ml16} .${styles.letter}`,
                    translateY: [0, 100],
                    easing: "easeInExpo",
                    duration: 1000,
                    delay: (el, i) => 30 * i,
                })
                .add({
                    targets: counterRef.current,
                    translateY: [0, 100],
                    opacity: [1, 0],
                    easing: "easeInExpo",
                    duration: 1000,
                }, '-=800')
                .add({
                    targets: [loaderContentRef.current],
                    opacity: 0,
                    easing: "easeInOutExpo",
                    duration: 1000,
                    complete: () => {
                        gsap.to(preLoaderRef.current, {
                            y: "100vh",
                            duration: 1,
                            ease: "power2.inOut",
                            onComplete: () => {
                                sessionStorage.setItem('hasAnimationShown', 'true');
                                setRenderingOpening(false);
                                setHasAnimationShown(true);
                            }
                        });
                    }
                });
        }
    }, [animationComplete, renderingOpening, setRenderingOpening, setHasAnimationShown]);

    return (
        <>
            {renderingOpening ? (
                <div className={styles.container} ref={preLoaderRef}>
                    <div className={styles.loaderContent} ref={loaderContentRef}>
                        <div className={styles.count}><p ref={counterRef} className={styles.ml16}>0</p></div>
                        <div className={styles.copy}><p ref={textWrapperRef} className={styles.ml16}>- 100</p></div>
                    </div>
                </div>
            ) : <></>}
        </>
    );
};

export default Opening;
