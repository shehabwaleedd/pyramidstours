import React from 'react'
import styles from '../style.module.scss'
import Link from 'next/link'
import { TourType } from '@/types/homePageTours'
import dynamic from 'next/dynamic'
const SearchField = dynamic(() => import('@/components/searchField'), { ssr: false })

const NavLeft = ({ tours }: { tours: TourType[] }) => {
    const isNavbar: boolean = true

    return (
        <section className={styles.navbar__logo}>
            <Link href="/" className={styles.logo_content} aria-label="Go to home page">
                <span>Pyramids</span>
                <span className={styles.navbar__logo_second}>Egypt Tours</span>
            </Link>
            <SearchField isNavbar={isNavbar} tours={tours} />
        </section>)
}


export default NavLeft