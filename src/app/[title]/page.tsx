import React from 'react'
import { TourType } from '@/types/homePageTours';
import { useTourByTag } from '@/lib/useTourByTag';
import styles from "./page.module.scss"
import TourCard from '@/components/card';
import Image from 'next/image';


export default async function MenuPage({ params }: { params: { title: string } }) {
    const tours = useTourByTag({ tag: params.title });
    const toursArray = await tours;
    console.log(toursArray, 'toursArray')
    type ImageMapKey = keyof typeof imageMap;

    const imageMap = {
        'cairo-tours': '/backgroundss/Cairo.webp',
        'cairo-day-tours': '/backgroundss/Cairo.webp',
        'alexandria-tours': '/backgroundss/Alexandria.webp',
        'alexandria-day-tours': '/backgroundss/Alexandria.webp',
        'luxor-tours': '/backgroundss/Luxor.webp',
        'luxor-day-tours': '/backgroundss/Luxor.webp',
        'aswan-tours': '/backgroundss/Aswan.webp',
        'aswan-day-tours': '/backgroundss/Aswan.webp',
        'hurghada-tours': '/backgroundss/Hurghada.webp',
        'hurghada-day-tours': '/backgroundss/Hurghada.webp',
        'sharm-el-sheikh-tours': '/backgroundss/Sharm el-Sheikh.webp',
        'sharm-el-sheikh-day-tours': '/backgroundss/Sharm el-Sheikh.webp',
        'siwa-tours': '/backgroundss/Siwa.webp',
        'siwa-day-tours': '/backgroundss/Siwa.webp',
        'dahab-tours': '/backgroundss/Dahab.webp',
        'dahab-day-tours': '/backgroundss/Dahab.webp'  // 
    };

    const imageKey = params.title as ImageMapKey;
    const backgroundImageUrl = imageMap.hasOwnProperty(imageKey) ? imageMap[imageKey] : '/assets/backgrounds/1.jpg';

    return (
        <main className={styles.menuPage}>
            <section className={styles.menuPage__upper}>
                <Image src={backgroundImageUrl} alt="search" width={1920} height={1080} />
                <div className={styles.menuPage__upper__text}>
                    <h1>{params.title.replace(/[-%20]/g, ' ')}</h1>
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



