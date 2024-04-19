import React from 'react'
import styles from "./page.module.scss"
import TourClient from './components/TourClient';
import { serverUseToursByTitle } from '@/lib/tours/serverUseTourByTitle';
import Loading from '@/animation/loading/Loading';

// export async function generateMetadata({ params }: { params: any }) {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tour/${params.title}`);
//     if (!res.ok) throw new Error('Failed to fetch event');

//     const jsonResponse = await res.json();
//     const cleanDescription = jsonResponse.data.description.replace(/<[^>]*>/g, '').slice(0, 150);

//     return {
//         title: jsonResponse.data.title,
//         description: cleanDescription,
//         url: `https://pyramidsegypttours/tours/${params.id}`,
//         image: jsonResponse.data.mainImg,
//         openGraph: {
//             type: "website",
//             title: jsonResponse.data.title,
//             description: cleanDescription,
//             images: jsonResponse.data.mainImg,
//             url: `https://pyramidsegypttours/tours/${params.id}`,
//             site_name: "Pyramids Egypt Tours",
//         },
//         twitter: {
//             title: jsonResponse.data.title,
//             description: cleanDescription,
//             images: jsonResponse.data.mainImg,
//             cardType: 'summary_large_image',
//         },
//     }
// }


export default async function page({ params }: { params: { title: string } }) {
    const slugToTitle = (slug: string): string => {
        return slug.replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const title = slugToTitle(params.title);
    const tour = await serverUseToursByTitle(title);

    if (!tour) {
        return <p>Loading...</p>; 
    }

    return (
        <main className={styles.tourDetails}>
            <TourClient tour={tour[0]} /> // Pass the resolved value of tour to the TourClient component
        </main>
    )
}

