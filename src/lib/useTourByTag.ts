export async function useTourByTag({ tag }: { tag: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tour?tags=${tag}`, { cache: "no-cache",});
        if (!response.ok) {
            throw new Error(`HTTP status ${response.status}`);
        }
        const data = await response.json();
        return data.data.result;
    } catch (error) {
        console.error("Error fetching tours:", error);
        // Log detailed error messages or send them to a monitoring service
        return []; // Return an empty array or appropriate error handling
    }
}
