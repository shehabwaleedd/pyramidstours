'use client'
import React from 'react'
import styles from './style.module.scss'

const index = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar__logo}>
                <h1>PYRAMIDS</h1>
            </div>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    )
}

export default index