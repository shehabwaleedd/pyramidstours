'use client'
import React from 'react'
import { useTourById } from '@/lib/tours/useTourById'
import styles from "..//page.module.scss"
import { IoLocationSharp, IoPricetagOutline } from 'react-icons/io5';
import { FiClock } from 'react-icons/fi';
import { BsCurrencyDollar } from 'react-icons/bs';
import { CiHashtag } from "react-icons/ci";
import Image from 'next/image'
import Link from 'next/link';
import RightColumn from './RightColumn';
import LeftColumn from './LeftColumn';
import { TourType } from '@/types/homePageTours';

interface TourClientProps {
    tour: TourType;
}


const TourClient: React.FC<TourClientProps> = ({ tour }) => {

    const cleanGoogleMapLink = (mapDetails: string) => {
        let cleanedLink = mapDetails.replace(/style="border:0;"\s?/g, '');
        return cleanedLink;
    };



    if (!tour) {
        return null
    }


    return (
        <section className={styles.eventDetails}>
            <div className={styles.eventDetails__mainImage}>
                <Image src={tour?.mainImg?.url ?? ''} width={1800} height={1000} alt='Main Image' className={styles.mainImage} />
                <div className={styles.eventDetails__mainImage_abs}>
                    <div className={styles.eventDetails__mainImage__upper}>
                        <h1>{tour?.title}</h1>
                    </div>
                    <div className={styles.eventDetails__mainImage__upper_details} style={{ flexWrap: "wrap" }}>
                        {tour?.tags?.map((tag, index) => (
                            <Link href={`/${tag}`} key={index}><CiHashtag />{tag}</Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.eventDetails__intro}>
                <div className={styles.eventDetails__intro_title}>
                    <h2>{tour?.title}</h2>
                </div>
                <div className={styles.eventDetails__intro_desc}>
                    <p> <IoLocationSharp /> {tour?.location?.from}, {tour?.location?.to} </p>
                    <p> <FiClock /> {tour?.duration} </p>
                    <p> <BsCurrencyDollar />   From ${tour?.adultPricing?.find(p => p.adults === 1)?.price ?? 'N/A'}</p>
                    <Link href={`/search/${tour?.category}`} > <IoPricetagOutline /> {tour?.category} </Link>
                </div>
            </div>
            <aside className={styles.eventDetails__lower}>
                {tour && <LeftColumn tour={tour} />}
                {tour && <RightColumn tour={tour} />}
            </aside>
            <div style={{ width: "100%" }} dangerouslySetInnerHTML={{ __html: cleanGoogleMapLink(tour?.mapDetails ?? '') }} />
        </section>
    )
}

export default TourClient