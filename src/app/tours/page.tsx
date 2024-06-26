import React from 'react'
import styles from "./page.module.scss"
import Image from 'next/image';
import SearchBar from './components/searchBar';
import { TourType } from '@/types/homePageTours';
import TourCard from '@/components/card';
import getBase64 from '@/lib/getLocalBase64';
import { serverUseToursByIds } from '@/lib/tours/serverUseToursByIds';

export async function generateMetadata() {
    const title = "Explore Egypt Tours | Pyramids Egypt Tour"
    const description = `Discover the best of Egypt with our comprehensive tours. Whether you're looking for a historical adventure in Giza or a relaxing getaway in Sharm El Sheikh, our expertly guided tours will help you explore Egypt's rich history and vibrant culture.`;
    const url = `https://pyramidsegypttour.com/tours`;
    const imageUrl = "https://pyramidsegypttour.com/backgroundss/default.webp";

    return {
        title,
        description,
        canonical: url,
        openGraph: {
            title,
            description,
            url,
            type: 'website',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: 'Pyramids of Egypt',
                },
            ],
            site_name: 'Pyramids Egypt Tours',
        },
        twitter: {
            handle: '@pyramidsegypttour',
            site: '@pyramidsegypttour',
            cardType: 'summary_large_image',
            title,
            description,
            image: imageUrl,
        },
        alternates: {
            canonical: url,
        }

    };
}

export default async function Tours() {
    const toursArray = await serverUseToursByIds('');

    if (toursArray) {
        await Promise.all(toursArray.map(async (tour) => {
            tour.base64 = await getBase64(tour.mainImg.url).catch(e => {
                console.error('Failed to load base64 for image:', e);
                return '';
            });
        }));
    }

    return (
        <main className={styles.tours}>
            <section className={styles.tours__upper}>
                <Image src="/assets/backgrounds/1.jpg" alt="search" width={1920} height={1080} />
                <div className={styles.tours__upper__text}>
                    <h1>Explore All Of Egypt&apos;s Tours</h1>
                    <SearchBar />
                </div>
            </section>
            <section className={styles.tours__lower}>
                <div>
                    <h2>Explore All Tours</h2>
                </div>
                <div className={styles.tours__lower_tours}>
                    {toursArray && toursArray.map((tour: TourType, index: number) => (
                        <TourCard key={tour._id} tour={tour} base64={tour.base64 ?? ''} priority={index < 4} />
                    ))}
                </div>
            </section>
        </main>
    )
}