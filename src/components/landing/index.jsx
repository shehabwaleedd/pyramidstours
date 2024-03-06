'use client'

import React from 'react'
import styles from './style.module.scss'

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
                <h1>PYRAMIDS EGYPT TOURS</h1>
                <p>Discover the beauty of Egypt with us</p>
            </div>
        </section>
    )
}

export default index