import { serverUseToursByIds } from '@/lib/tours/serverUseToursByIds';

export async function fetchAndGroupTours() {
    const locations = ["Cairo", "Luxor", "Aswan", "Alexandria"];
    const tag = 'top-rated-tours';

    // Fetching tours by locations
    const groupedToursByLocations = await Promise.all(locations.map(async location => {
        const locationQuery = `location.from=${location}`;
        const toursByLocation = await serverUseToursByIds(locationQuery);
        return { title: `${location} Tours`, tours: toursByLocation ? toursByLocation.slice(0, 4) : [] }; 
    }));

    // Fetching top-rated tours
    const topRatedToursQuery = `tags=${tag}`;
    const topRatedTours = await serverUseToursByIds(topRatedToursQuery);
    const groupedTopRatedTours = { title: 'Top Rated Tours', tours: topRatedTours ? topRatedTours.slice(0, 7) : [] }; 

    // Combine both results
    const allGroupedTours = [groupedTopRatedTours, ...groupedToursByLocations].filter(group => group.tours && group.tours.length > 0);

    return allGroupedTours;
}
