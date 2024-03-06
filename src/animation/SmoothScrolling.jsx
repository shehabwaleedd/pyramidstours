'use client'
import React from 'react';
import { ReactLenis } from "@studio-freight/react-lenis";
import { AnimatePresence } from 'framer-motion';

const SmoothScrolling = ({ children }) => {
    return (
        <AnimatePresence mode='wait'>
            <ReactLenis root options={{ lerp: 0.05, duration: 2, multiplier: 0.5, direction: 'vertical', gestureDirection: "vertical", smoothTouch: true, touchMultiplier: 2 }}>
                {children}
            </ReactLenis>
        </AnimatePresence>
    );
}

export default SmoothScrolling;