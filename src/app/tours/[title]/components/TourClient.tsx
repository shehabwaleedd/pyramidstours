import React from 'react'
import styles from "../page.module.scss"
import { IoLocationSharp, IoPricetagOutline } from 'react-icons/io5';
import { FiClock } from 'react-icons/fi';
import { BsCurrencyDollar } from 'react-icons/bs';
import { CiHashtag } from "react-icons/ci";
import Image from 'next/image'
import Link from 'next/link';
import RightColumn from './RightColumn';
import LeftColumn from './LeftColumn';
import { TourType } from '@/types/homePageTours';
import UnifiedToursComponent from '@/components/unifiedToursComponent';
import LeaveReview from '@/components/makeReview';
import TourUpper from './TourUpper';
import TourBelow from './TourBelow';

interface TourClientProps {
    tour: TourType;
    base64: string;
}


const TourClient: React.FC<TourClientProps> = ({ tour, base64 }) => {

    const cleanGoogleMapLink = (mapDetails: string) => {
        let cleanedLink = mapDetails.replace(/style="border:0;"\s?/g, '');
        return cleanedLink;
    };

    return (
        <>
            <section className={styles.eventDetails}>
                <TourUpper  tour={tour} base64={base64} />
                <TourBelow tour={tour} />
                <aside className={styles.eventDetails__lower}>
                    {tour && <LeftColumn tour={tour} />}
                    {tour && <RightColumn tour={tour} />}
                </aside>
                <div style={{ width: "100%" }} dangerouslySetInnerHTML={{ __html: cleanGoogleMapLink(tour?.mapDetails ?? '') }} />
                <LeaveReview />
            </section>
            <UnifiedToursComponent location={tour.location.from} type="recommended" />
            <UnifiedToursComponent type="like" />
        </>
    )
}

export default TourClient