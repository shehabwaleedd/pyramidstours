'use client'

import { useState, useEffect } from 'react';

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(null);

    useEffect(() => {
        // Only run this effect client-side
        if (typeof window !== 'undefined') {
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            handleResize(); // Call this once to set the initial windowWidth
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    return windowWidth;
};

export default useWindowWidth;