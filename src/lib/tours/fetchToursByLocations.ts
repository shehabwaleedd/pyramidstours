
import { serverUseToursByIds } from '@/lib/tours/serverUseToursByIds';
export async function fetchAndGroupToursByLocations() {
    const locations = ["Cairo", "Giza", "Luxor", "Aswan", "Alexandria"];
    const groupedTours = await Promise.all(locations.map(async location => {
        const query = `location.from=${location}`;
        const tours = await serverUseToursByIds(query);
        return { title: `${location} Tours`, tours };
    }));

    return groupedTours.filter(group => group.tours.length > 0);
}
