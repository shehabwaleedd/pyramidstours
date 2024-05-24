
import React, { useState } from 'react'
import styles from '../style.module.scss'
import Link from 'next/link'
import SearchField from '@/components/searchField'
import { TourType } from '@/types/homePageTours'
const NavLeft = ({ tours }: { tours: TourType[] }) => {
    const isNavbar: boolean = true

    return (
        <section className={styles.navbar__logo}>
            <Link href="/" className={styles.logo_content} aria-label="Go to home page">
                <h1>Pyramids</h1>
                <h1 className={styles.navbar__logo_second}>Egypt Tours</h1>
            </Link>
            <SearchField isNavbar={isNavbar} tours={tours} />
        </section>)
}


export default NavLeft