import { useState, useEffect } from 'react';
const useWindowWidth = (): number | null => {
    const [windowWidth, setWindowWidth] = useState<number | null>(null);

    useEffect(() => {
        // Only run this effect client-side
        if (typeof window !== 'undefined') {
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            // Call this once to set the initial windowWidth
            handleResize(); 
            // Cleanup to remove the event listener on component unmount
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    return windowWidth;
};

export default useWindowWidth;
