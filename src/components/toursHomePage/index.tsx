import React from 'react';
import { fetchAndGroupTours } from '@/lib/tours/fetchToursByLocations';
import ToursHomePageComponent from './components/ToursHomePageComponent';
import getBase64 from '@/lib/getLocalBase64';
import { GroupedToursType } from '@/types/homePageTours';

async function enhancedFetchAndGroupTours() {
    const groupedTours: GroupedToursType[] = await fetchAndGroupTours() as GroupedToursType[];

    for (const group of groupedTours) {
        if (group.tours) {
            for (const tour of group.tours) {
                if (!tour.base64) {
                    tour.base64 = await getBase64(tour.mainImg.url);
                }
            }
        }
    }

    return groupedTours;
}

export default async function ToursHomePage() {
    const groupedTours = await enhancedFetchAndGroupTours();

    return <ToursHomePageComponent groupedTours={groupedTours} />;
}
