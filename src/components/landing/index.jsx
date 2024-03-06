'use client'

import React from 'react'
import styles from './style.module.scss'
import { FiSearch } from 'react-icons/fi'

const index = () => {
    return (
        <section className={styles.landing}>
            <video src="/mainVideo.mp4"
                autoPlay
                loop
                muted
                playsInline

            ></video>
            <div className={styles.landing__text}>
                <h1> PYRAMIDS EGYPT TOURS </h1>
                <p> Explore the beauty of Egypt </p>
            </div>
            <div className={styles.landing__text_search}>
                <div className={styles.landing__middle}>
                    <span>Destination</span>
                    <span>Time</span>
                    <div className={styles.landing__search}>
                        <FiSearch />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default index