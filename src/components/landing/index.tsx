'use client'

import React from 'react';
import styles from './style.module.scss'
import SearchField from '../searchField';


const SearchForm: React.FC = () => {
    return (
        <section className={styles.landing}>
            <video autoPlay loop muted playsInline>
                <source src="/mainVideo.mp4" type="video/mp4" />
            </video>
            <SearchField />
        </section>
    )
}

export default SearchForm