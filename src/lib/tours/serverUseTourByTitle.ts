import axios from "axios";


export async function serverUseToursByTitle(query: string) {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/tour?title=${query}`);
        const data = res.data.data.result;
        return data;
    } catch (error) {
        console.error("Error fetching tours:", error);
        throw error;
    }

}
