'use client'

import React from 'react'
import styles from './style.module.scss'
import { FiSearch } from 'react-icons/fi'

const index = () => {
    return (
        <section className={styles.landing}>
            <video
                autoPlay
                loop
                muted
                playsInline

            >
                <source src="/mainVideo.mp4" type="video/mp4" />
            </video>

            <div className={styles.landing__text_search}>
                <div className={styles.landing__middle}>
                    <span>Destination</span>
                    <div className={styles.landing__search}>
                        <FiSearch />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default index