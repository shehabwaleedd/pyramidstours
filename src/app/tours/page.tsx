import React from 'react'
import styles from "./page.module.scss"
import Image from 'next/image';
import SearchBar from './components/searchBar';
import { TourType } from '@/types/homePageTours';
import { serverUseToursByIds } from '@/lib/tours/serverUseToursByIds'
import TourCard from '@/components/card';
import getBase64 from '@/lib/getLocalBase64';


export default async function Tours ({ searchParams }: { searchParams: { results: string } }) {
    const query = new URLSearchParams(searchParams).toString();
    const tours = serverUseToursByIds(query)
    const toursArray = await tours

    await Promise.all(toursArray.map(async (tour: any) => {
        tour.base64 = await getBase64(tour.mainImg.url).catch(e => {
            console.error('Failed to load base64 for image:', e);
            return '';
        });
    }));

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
                    {toursArray.map((tour: TourType, index: number) => (
                        <TourCard key={tour._id} tour={tour} base64={tour.base64 ?? ''} priority={index < 4}/>
                    ))}
                </div>
            </section>
        </main>
    )
}