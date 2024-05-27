'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

interface AnimationContextType {
    hasAnimationShown: boolean;
    setHasAnimationShown: React.Dispatch<React.SetStateAction<boolean>>;
    renderingOpening: boolean;
    setRenderingOpening: React.Dispatch<React.SetStateAction<boolean>>;
    timeline: gsap.core.Timeline | null;
    setTimeline: React.Dispatch<React.SetStateAction<gsap.core.Timeline | null>>;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const useAnimation = (): AnimationContextType => {
    const context = useContext(AnimationContext);
    if (!context) {
        throw new Error('useAnimation must be used within an AnimationProvider');
    }
    return context;
};

interface AnimationProviderProps {
    children: ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
    const [hasAnimationShown, setHasAnimationShown] = useState<boolean>(false);
    const [renderingOpening, setRenderingOpening] = useState<boolean>(false);
    const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (!hasAnimationShown && !sessionStorage.getItem("hasAnimationShown")) {
            setRenderingOpening(true);
        }
    }, [hasAnimationShown]);

    useLayoutEffect(() => {
        const context = gsap.context(() => {
            const tl = gsap.timeline();
            setTimeline(tl);
        });
        return () => context.revert();
    }, []);

    return (
        <AnimationContext.Provider value={{ hasAnimationShown, setHasAnimationShown, renderingOpening, setRenderingOpening, timeline, setTimeline }}>
            {children}
        </AnimationContext.Provider>
    );
};
