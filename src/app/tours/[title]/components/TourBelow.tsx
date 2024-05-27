import React from 'react'
import { IoLocationSharp, IoPricetagOutline } from 'react-icons/io5';
import { FiClock } from 'react-icons/fi';
import { BsCurrencyDollar } from 'react-icons/bs';
import Link from 'next/link';
import styles from "../page.module.scss"
import { TourType } from '@/types/homePageTours';

const TourBelow = ({ tour }: { tour: TourType }) => {
    return (
        <div className={styles.eventDetails__intro}>
            <div className={styles.eventDetails__intro_title}>
                <h2>{tour?.title}</h2>
            </div>
            <div className={styles.eventDetails__intro_desc}>
                <p> <IoLocationSharp /> {tour?.location?.from}, {tour?.location?.to} </p>
                <p> <FiClock /> {tour?.duration} </p>
                <p> <BsCurrencyDollar />   From {tour?.price ?? 'N/A'}</p>
                <Link href={`/search/${tour?.category}`} aria-label={tour?.category}> <IoPricetagOutline /> {tour?.category} </Link>
            </div>
        </div>
    )
}

export default TourBelow