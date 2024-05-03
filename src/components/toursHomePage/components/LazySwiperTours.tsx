import React, { Suspense } from 'react';
import styles from "../style.module.scss"
import Skeleton from '@/animation/skeleton';
import { TourType } from '@/types/homePageTours';
const SwiperToursLazy = React.lazy(() => import('../../swiperTours'));

interface LazySwiperToursProps {
    tours: TourType[];
    title: string;
    index: number;
}

const LazySwiperTours: React.FC<LazySwiperToursProps> = ({ tours, title, index }) => {
    return (
        <Suspense fallback={<Skeleton />}>
            <SwiperToursLazy tours={tours} title={title} index={index} />
        </Suspense>
    );
};
export default LazySwiperTours