import { TourType } from "@/types/homePageTours";

let cache: Record<string, TourType[]> = {};
let cacheExpiry: number = Date.now() + 24 * 60 * 60 * 1000; // Set initial cache expiry to one day from now

export async function serverUseToursByTitle(query: string) {
    try {
        // Check cache expiry and clear cache if needed
        if (Date.now() > cacheExpiry) {
            console.log("Cache expired, clearing cache");
            cache = {};
        }
        // Return cached data if available
        if (cache[query]) {
            return cache[query];
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tour?title=${query}`, { cache: "no-cache", });
        if (!res.ok) {
            throw new Error(`Failed to fetch tours, status: ${res.status}`);
        }
        const data = await res.json();
        // Update cache and set new expiry
        cache[query] = data.data.result;
        cacheExpiry = Date.now() + 24 * 60 * 60 * 1000;

        return data.data.result;
    } catch (error) {
        console.error("Error fetching tours:", error);

        throw error;
    }
}
