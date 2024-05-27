import React from 'react';
import dynamic from 'next/dynamic';
import { TourType } from '@/types/homePageTours';
const  SwiperToursLazy = dynamic(() => import('@/components/swiperTours'), { ssr: false });

interface LazySwiperToursProps {
    tours: TourType[];
    title: string;
    index: number;
}

const LazySwiperTours: React.FC<LazySwiperToursProps> = ({ tours, title, index }) => {

    return (

        <SwiperToursLazy tours={tours} title={title} index={index} />

    );
};

export default LazySwiperTours;
