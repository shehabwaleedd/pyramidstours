export async function serverUseToursByTitle(query: string) {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tour?title=${query}`, { cache: "no-cache"  });
        if (!res.ok) {
            throw new Error(`Failed to fetch tours, status: ${res.status}`);
        }
        const data = await res.json();

        return data.data.result;
    } catch (error) {
        console.error("Error fetching tours:", error);

        throw error;
    }
}
