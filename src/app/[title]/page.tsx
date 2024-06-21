import React from 'react'
import { TourType } from '@/types/homePageTours';
import { serverTourByTag } from '@/lib/useTourByTag';
import { serverUseToursByIds } from '@/lib/tours/serverUseToursByIds';
import styles from "./page.module.scss"
import TourCard from '@/components/card';
import Image from 'next/image';
import UnifiedToursComponent from '@/components/unifiedToursComponent';
import getBase64 from '@/lib/getLocalBase64';
import descriptionMap from '@/utils/DescriptionMap';
import titleMap from '@/utils/titleMap';

const imageMap = {
    'cairo-tours': '/backgroundss/Cairo.webp',
    'cairo-day-tours': '/backgroundss/Cairo.webp',
    'giza-day-tours': '/backgroundss/Giza.webp',
    'gizz-tours': '/backgroundss/Giza.webp',
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
    'dahab-day-tours': '/backgroundss/Dahab.webp',

};


export async function generateMetadata({ params }: { params: { title: string } }) {
    const slugToTitle = (slug: string): string => {
        return slug.replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    const title = titleMap[params.title] || `${slugToTitle(params.title)} Tours`;
    const description = descriptionMap[params.title] || `Join us to explore ${slugToTitle(params.title)} with Pyramids Egypt Tours. Discover the best tours, from historic landmarks to natural wonders.`;
    const keywords = `${title}, travel, tours, ${slugToTitle(params.title)}, attractions, destinations`;
    const url = `https://pyramidsegypttour.com/${params.title}`;
    type ImageMapKey = keyof typeof imageMap;
    const imageKey = params.title as ImageMapKey;
    const imageUrl = imageMap.hasOwnProperty(imageKey) ? imageMap[imageKey] : '/backgroundss/default.webp';

    return {
        title,
        description,
        keywords,
        url,
        openGraph: {
            title,
            description,
            url,
            type: 'website',
            images: [
                {
                    url: imageUrl,
                    width: 800,
                    height: 600,
                    alt: `${title} - Pyramids Egypt Tours`,
                },
            ],
            site_name: 'Pyramids Egypt Tours',
        },
        twitter: {
            title,
            description: `Explore ${title} with Pyramids Egypt Tours. Discover the best tours and travel packages.`,
            card: 'summary_large_image',
            image: imageUrl,
        },
        alternates: {
            canonical: url,
        }
    }
}

export async function generateStaticParams() {
    const tours = await serverUseToursByIds('');
    const tags = tours ? tours.map((tour: any) => tour.tags).flat() : [];

    return tags.map((tag: string) => ({
        params: {
            title: tag.split(' ').join('-').toLowerCase()
        }
    }));
}



export const revalidate = 1;


export default async function MenuPage({ params }: { params: { title: string } }) {
    const tours = serverTourByTag({ tag: params.title });
    const toursArray = await tours;
    type ImageMapKey = keyof typeof imageMap;


    await Promise.all(toursArray.map(async (tour: any) => {
        tour.base64 = await getBase64(tour.mainImg.url).catch(e => {
            console.error('Failed to load base64 for image:', e);
            return '';
        });
    }));

    const imageKey = params.title as ImageMapKey;
    const backgroundImageUrl = imageMap.hasOwnProperty(imageKey) ? imageMap[imageKey] : '/backgroundss/default.webp';

    return (
        <main className={styles.menuPage}>
            <section className={styles.menuPage__upper}>
                <Image src={backgroundImageUrl} alt="search" width={1920} height={1080} />
                <div className={styles.menuPage__upper__text}>
                    <h1>{params.title.replace(/[-%20]/g, ' ')}</h1>
                </div>
            </section>
            <section className={styles.menuPage__lower}>
                {toursArray.length > 0 ?
                    <div className={styles.menuPage__lower_tours}>
                        {toursArray.map((tour: TourType, index: number) => (
                            <TourCard key={tour._id} tour={tour} base64={tour.base64 ?? ''} priority={index < 4} />
                        ))}
                    </div>
                    : (
                        <h2>Sorry, No Tours Found</h2>
                    )}
                <UnifiedToursComponent type="like" />
            </section>
        </main>
    )
}



