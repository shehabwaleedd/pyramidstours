import React, { Suspense } from 'react'
import dynamic from 'next/dynamic';
import styles from "../page.module.scss"
import RightColumn from './RightColumn';
import { TourType } from '@/types/homePageTours';
import TourUpper from './TourUpper';
import TourBelow from './TourBelow';
import LeftColumnSkeleton from '@/animation/skeleton/LeftColumn';
const LeftColumn = dynamic(() => import('./LeftColumn'), { loading: () => <LeftColumnSkeleton />, ssr: false, });
const UnifiedToursComponent = dynamic(() => import('@/components/unifiedToursComponent'), { ssr: false, });
const LeaveReview = dynamic(() => import('@/components/makeReview'), { ssr: false });

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
                <TourUpper tour={tour} base64={base64} />
                <TourBelow tour={tour} />
                <aside className={styles.eventDetails__lower}>
                    {tour && <LeftColumn tour={tour} />}
                    {tour && <RightColumn tour={tour} />}
                </aside>
                <div style={{ width: "100%" }} dangerouslySetInnerHTML={{ __html: cleanGoogleMapLink(tour?.mapDetails ?? '') }} />
                <LeaveReview />
            </section>
            <UnifiedToursComponent location={tour.location.from || ''} type="recommended" />
            <UnifiedToursComponent type="like" />
        </>
    )
}

export default TourClient