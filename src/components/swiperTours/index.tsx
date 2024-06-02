import React from 'react';
import { TourType } from '@/types/homePageTours';
import TourCard from "@/components/card"
import Slider from '../swiper';
import Link from 'next/link'
import "@/components/swiperTours/SwipeTours.scss"

const content = (tours: TourType[], title: string, isViewMoreAllowed: boolean) => {

    return (
        <section className="swiperSection">
            <div className="homeTours__upper">
                <h2>{title}</h2>
            </div>
            <div className="keen-slider homeTours__lower">
                {tours.map((tour: TourType, idx: number) => (
                    <div key={tour._id} className='keen-slider__slide'>
                        <TourCard tour={tour} base64={tour.base64 || ''} priority={idx < 4} />
                    </div>
                ))}
                {isViewMoreAllowed && (
                    <div className='keen-slider__slide viewMoreCard'>
                        <Link href={`/${title.toLowerCase().replace(/ /g, '-')}`} aria-label={`View more ${title.toLowerCase()}`}>
                            View more of {title}
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )

}


const SwiperTours: React.FC<{ tours: TourType[],  title: string, isViewMoreAllowed: boolean }> = ({ tours, title, isViewMoreAllowed }) => {

    return (
        <Slider content={content(tours, title, isViewMoreAllowed)} />
    );
};

export default SwiperTours;
