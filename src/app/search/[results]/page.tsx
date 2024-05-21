import React from 'react'
import { serverUseToursByIds } from '@/lib/tours/serverUseToursByIds'
import { TourType } from '@/types/homePageTours';
import TourCard from '@/components/card';
import styles from "./page.module.scss"
import Image from 'next/image';
import SearchField from '@/components/searchField';
import UnifiedToursComponent from '@/components/unifiedToursComponent';
import getBase64 from '@/lib/getLocalBase64';

export const revalidate = 1;


export async function generateMetadata({ searchParams }: { searchParams: { results: string } }) {
    const queryParams = new URLSearchParams(searchParams);
    const location = queryParams.get('location.to') || 'Giza Pyramids';
    const title = `Discover ${location} Tours | Pyramids Egypt Tours`;
    const description = `Explore and book tours to ${location}. Experience the beauty and history of ${location} with our guided tours.`;
    const canonicalUrl = `https://pyramidsegypttour.com/search?location.to=${encodeURIComponent(location)}`;

    return {
        title,
        description,
        canonicalUrl,
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            type: 'website',
            images: [
                {
                    url: 'https://pyramidsegypttour.com/backgroundss/default.webp',
                    width: 800,
                    height: 600,
                    alt: `${location} Tours`,
                },
            ],
            site_name: 'Pyramids Egypt Tour',
        },
        twitter: {
            cardType: 'summary_large_image',
            title,
            description,
            image: 'https://pyramidsegypttour.com/backgroundss/default.webp',
        }
    };
}

export default async function SearchPage({ searchParams }: { searchParams: { results: string } }) {

    const query = new URLSearchParams(searchParams).toString();
    const tours = await serverUseToursByIds(query) ?? []

    if (tours) {
        await Promise.all(tours.map(async (tour: any) => {
            tour.base64 = await getBase64(tour.mainImg.url).catch(e => {
                console.error('Failed to load base64 for image:', e);
                return '';
            });
        }));
    }



    const isNavbar: boolean = false
    return (
        <main className={styles.searchPage}>
            <section className={styles.searchPage__upper}>
                <Image src="/backgroundss/default.webp" alt="search" width={1920} height={1080} />
                <div className={styles.searchPage__upper__text}>
                    <h1>Search Results</h1>
                    <SearchField isNavbar={isNavbar} tours={tours}/>
                </div>
            </section>
            <section className={styles.searchPage__lower}>
                {tours && tours.length > 0 ? ( // Correctly check if tours array exists and has more than 0 items
                    <>
                        <div>
                            <h2>Results</h2>
                        </div>
                        <div className={styles.searchPage__lower_tours}>
                            {tours.map((tour: TourType, index: number) => (
                                <TourCard key={tour._id} tour={tour} base64={tour.base64 ?? ''} priority={index < 4} />
                            ))}
                        </div>
                        <UnifiedToursComponent type="like" />
                    </>
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


