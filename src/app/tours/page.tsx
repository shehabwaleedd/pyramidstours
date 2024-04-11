import React from 'react'
import styles from "./page.module.scss"
import Image from 'next/image';
import SearchField from '@/components/searchField';
import SearchBar from './components/searchBar';
import { TourType } from '@/types/homePageTours';
import { serverUseToursByIds } from '@/lib/tours/serverUseToursByIds'
import TourCard from '@/components/card';


export default async function Tours ({ searchParams }: { searchParams: { results: string } }) {
    const query = new URLSearchParams(searchParams).toString();
    const tours = serverUseToursByIds(query)
    const toursArray = await tours
    return (
        <main className={styles.tours}>
            <section className={styles.tours__upper}>
                <Image src="/assets/backgrounds/1.jpg" alt="search" width={1920} height={1080} />
                <div className={styles.tours__upper__text}>
                    <h1>Explore All Tours</h1>
                    <SearchBar />
                </div>
            </section>
            <section className={styles.tours__lower}>
                <div>
                    <h2>Explore All Tours</h2>
                </div>
                <div className={styles.tours__lower_tours}>
                    {toursArray.map((tour: TourType) => (
                        <TourCard key={tour._id} tour={tour} />
                    ))}
                </div>
            </section>
        </main>
    )
}