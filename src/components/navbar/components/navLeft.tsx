import React from 'react'
import styles from '../style.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import SearchField from '@/components/searchField'
import { TourType } from '@/types/homePageTours'
const NavLeft = ({ tours }: { tours: TourType[] }) => {
    const isNavbar: boolean = true


    return (
        <section className={styles.navbar__logo}>
            <Link href="/" aria-label="Go to home page">
                <Image src="/Pyramids_logo.webp" alt="logo" width={300} height={200} />
            </Link>
            <Link href="/" className={styles.logo_content} aria-label="Go to home page">
                <h1>Pyramids</h1>
            </Link>
            <SearchField isNavbar={isNavbar} tours={tours} />
        </section>)
}


export default NavLeft