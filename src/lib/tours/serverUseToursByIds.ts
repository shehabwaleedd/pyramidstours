export async function serverUseToursByIds(query: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tour?${query}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch tours, status: ${res.status}`);
        }
        const data = await res.json();
        return data.data.result; 
    } catch (error) {
        console.error("Error fetching tours:", error);
        return []; 
    }
}