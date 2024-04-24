import { serverUseToursByIds } from '@/lib/tours/serverUseToursByIds';
export async function fetchAndGroupTours() {
    const locations = ["Cairo", "Giza", "Luxor", "Aswan", "Alexandria"];
    const tag = 'top-rated-tours';

    // Fetching tours by locations
    const groupedToursByLocations = await Promise.all(locations.map(async location => {
        const locationQuery = `location.from=${location}`;
        const toursByLocation = await serverUseToursByIds(locationQuery);
        return { title: `${location} Tours`, tours: toursByLocation };
    }));

    // Fetching top-rated tours
    const topRatedToursQuery = `tags=${tag}`;
    const topRatedTours = await serverUseToursByIds(topRatedToursQuery);
    const groupedTopRatedTours = { title: 'Top Rated Tours', tours: topRatedTours };

    // Combine both results
    const allGroupedTours = [groupedTopRatedTours, ...groupedToursByLocations].filter(group => group.tours && group.tours.length > 0);

    return allGroupedTours;
}
