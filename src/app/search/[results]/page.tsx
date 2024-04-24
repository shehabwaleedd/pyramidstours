import React from 'react'
import { serverUseToursByIds } from '@/lib/tours/serverUseToursByIds'
import { TourType } from '@/types/homePageTours';
import TourCard from '@/components/card';
import styles from "./page.module.scss"
import Image from 'next/image';
import SearchField from '@/components/searchField';
import UnifiedToursComponent from '@/components/unifiedToursComponent';
export default async function SearchPage({ searchParams }: { searchParams: { results: string } }) {

    const query = new URLSearchParams(searchParams).toString();
    const tours = serverUseToursByIds(query)
    const toursArray = await tours
    const isNavbar: boolean = false
    return (
        <main className={styles.searchPage}>
            <section className={styles.searchPage__upper}>
                <Image src="/assets/backgrounds/1.jpg" alt="search" width={1920} height={1080} />
                <div className={styles.searchPage__upper__text}>
                    <h1>Search Results</h1>
                    <SearchField isNavbar={isNavbar} />
                </div>
            </section>
            <section className={styles.searchPage__lower}>
                {toursArray > 0 ? (
                    <div className={styles.searchPage__lower_tours}>
                        <div>
                            <h2>Results</h2>
                        </div>
                        {toursArray.map((tour: TourType) => (
                            <TourCard key={tour._id} tour={tour} />
                        ))}
                    </div>
                ) : (
                    <>
                        <h2>Sorry, No Tours Found</h2>
                        <UnifiedToursComponent type="like" />
                    </>

                )}
            </section>
        </main>
    )
}


