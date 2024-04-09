import React from 'react'
import styles from "./page.module.scss"
import TourClient from './components/TourClient';
export async function generateMetadata({ params }: { params: any }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tour/${params.id}`);
    if (!res.ok) throw new Error('Failed to fetch event');

    const jsonResponse = await res.json();
    const cleanDescription = jsonResponse.data.description.replace(/<[^>]*>/g, '').slice(0, 150);

    return {
        title: jsonResponse.data.title,
        description: cleanDescription,
        url: `https://pyramidsegypttours/tours/${params.id}`,
        image: jsonResponse.data.mainImg,
        openGraph: {
            type: "website",
            title: jsonResponse.data.title,
            description: cleanDescription,
            images: jsonResponse.data.mainImg,
            url: `https://pyramidsegypttours/tours/${params.id}`,
            site_name: "Pyramids Egypt Tours",
        },
        twitter: {
            title: jsonResponse.data.title,
            description: cleanDescription,
            images: jsonResponse.data.mainImg,
            cardType: 'summary_large_image',
        },
    }
}

const page = ({ params }: { params: { id: string } }) => {
    return (
        <main className={styles.tourDetails}>
            <TourClient id={params.id}/>
        </main>
    )
}

export default page