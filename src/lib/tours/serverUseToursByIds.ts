import { TourType } from "@/types/homePageTours";
import axios from "axios";

let cache: Record<string, TourType[]> = {};
let cacheExpiry: number = Date.now() + 2 * 60 * 60 * 1000; 

export async function serverUseToursByIds(query: string) {
    try {
        if (Date.now() > cacheExpiry) {
            console.log("Cache expired, clearing cache");
            cache = {};
            cacheExpiry = Date.now() + 2 * 60 * 60 * 1000; // Reset cache expiry to 2 hours from now after clearing
        }
        if (cache[query]) {
            console.log("Returning data from cache");
            return cache[query];
        }

        const questionAndQuery = query ? `?${query}` : "";
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/tour${questionAndQuery}`);
        const data: { data: { result: TourType[] } } = res.data;
        console.log(data, "data")
        cache[query] = data.data.result;
        cacheExpiry = Date.now() + 24 * 60 * 60 * 1000;

        return data.data.result;
    } catch (error) {
        console.error("Error fetching tours:", error);
        return null; 
    }
}
