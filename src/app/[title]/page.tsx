import React from 'react'
import { TourType } from '@/types/homePageTours';
import { useTourByTag } from '@/lib/useTourByTag';
import styles from "./page.module.scss"
import TourCard from '@/components/card';
import Image from 'next/image';


export default async function MenuPage({ params }: { params: { title: string } }) {
    const tours = useTourByTag(params.title)
    const toursArray = await tours
    return (
        <main className={styles.menuPage}>
            <section className={styles.menuPage__upper}>
                <Image src="/assets/backgrounds/1.jpg" alt="search" width={1920} height={1080} />
                <div className={styles.menuPage__upper__text}>
                    <h1>{params.title.replace(/-/g, ' ')}</h1>
                </div>
            </section>
            <section className={styles.menuPage__lower}>
                <div className={styles.menuPage__lower_tours}>
                    {toursArray?.map((tour: TourType) => (
                        <TourCard key={tour._id} tour={tour} />
                    ))}
                </div>
            </section>
        </main>
    )
}

