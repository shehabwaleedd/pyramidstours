import React from 'react'
import Image from 'next/image'
import styles from "../page.module.scss"
import { TourType } from '@/types/homePageTours'
import Link from 'next/link'
import { CiHashtag } from "react-icons/ci";


const TourUpper = ({ tour, base64 } : { tour: TourType; base64: string; }) => {
    return (
        <div className={styles.eventDetails__mainImage}>
            <Image src={tour?.mainImg?.url ?? ''} width={1800} height={1000} alt='Main Image' className={styles.mainImage}
                placeholder="blur" blurDataURL={base64} priority={true}
            />
            <div className={styles.eventDetails__mainImage_abs}>
                <div className={styles.eventDetails__mainImage__upper}>
                    <h1>{tour?.title}</h1>
                </div>
                <div className={styles.eventDetails__mainImage__upper_details} style={{ flexWrap: "wrap" }}>
                    {tour?.tags?.map((tag, index) => (
                        <Link href={`/${tag}`} key={index} aria-label={`#${tag}`}><CiHashtag />{tag}</Link>
                    ))}
                </div>
            </div>
        </div>)
}

export default TourUpper