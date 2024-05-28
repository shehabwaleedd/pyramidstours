import React from 'react';
import styles from './style.module.scss';
import { serverUseToursByIds } from '@/lib/tours/serverUseToursByIds';
import dynamic from 'next/dynamic';
const SearchField = dynamic(() => import('@/components/searchField'), { ssr: false });

export default async function SearchForm() {
    const tours = await serverUseToursByIds('') || [];

    const isNavbar: boolean = false;
    return (
        <section className={styles.landing}>
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="https://res.cloudinary.com/dls2yjn9t/image/upload/v1716605759/Screenshot_2024-05-25_at_5.32.07_AM_1_ddil95.webp"
                className={styles.video}
                width="1920"
                height="1080"
            >
                <source src="https://res.cloudinary.com/dls2yjn9t/video/upload/v1714547159/newerVid_tdb00k.mp4" type="video/mp4" />
                <source src="https://res.cloudinary.com/dls2yjn9t/video/upload/v1716605714/newerVid_tdb00k_1_mrjvmq.mp4" type="video/mp4" media="(max-width: 720px)" />
            </video>
            <SearchField isNavbar={isNavbar} tours={tours} />
        </section>
    );
}
