import React from 'react'
import styles from "./page.module.scss"
import TourClient from './components/TourClient';
import { serverUseToursByTitle } from '@/lib/tours/serverUseTourByTitle';
import { serverUseToursByIds } from '@/lib/tours/serverUseToursByIds';
import getBase64 from '@/lib/getLocalBase64';


const slugToTitle = (slug: string): string => {
    return slug.replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
export async function generateMetadata({ params }: { params: { title: string } }) {
    const title = slugToTitle(params.title);
    const tour = await serverUseToursByTitle(title);

    const cleanDescription = tour[0]?.description?.replace(/<[^>]*>/g, '').slice(0, 150) ?? "N/A";

    return {
        title: tour[0]?.title,
        description: cleanDescription,
        url: `https://pyramidsegypttours/tours/${params.title}`,
        image: tour[0]?.mainImg?.url,
        openGraph: {
            type: "website",
            title: tour[0]?.title,
            description: cleanDescription,
            images: tour[0]?.mainImg,
            url: `https://pyramidsegypttours/tours/${params.title}`,
            site_name: "Pyramids Egypt Tours",
        },
        twitter: {
            title: tour[0]?.title,
            description: cleanDescription,
            images: tour[0]?.mainImg,
            cardType: 'summary_large_image',
        },
    }
}


export async function generateStaticParams() {
    const tours: { title: string[] }[] = await serverUseToursByIds('');
    const titles: string[] = [...new Set(tours.flatMap((tour) => tour.title))];
    return titles;
}


export default async function page({ params }: { params: { title: string } }) {

    const title = slugToTitle(params.title);
    const tour = await serverUseToursByTitle(title);
    const base64 = await getBase64(tour[0]?.mainImg?.url);

    console.log(params.title, "params.title", title, "title")

    if (!tour) {
        return <p>Loading...</p>;
    }

    return (
        <main className={styles.tourDetails}>
            <TourClient tour={tour[0]} base64={base64 || ''} />
        </main>
    )
}

