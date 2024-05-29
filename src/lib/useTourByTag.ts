import axios from "axios";

export async function serverTourByTag({ tag }: { tag: string }) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/tour?tags=${tag}`);
        const data = response.data.data.result;
        return data;

    } catch (error) {
        console.error("Error fetching tours:", error);
        throw error;
    }
    
}
