'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AnimationContextType {
    renderingOpening: boolean;
    setRenderingOpening: React.Dispatch<React.SetStateAction<boolean>>;
    hasAnimationShown: boolean;
    setHasAnimationShown: React.Dispatch<React.SetStateAction<boolean>>;
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
    const [renderingOpening, setRenderingOpening] = useState<boolean>(true);

    useEffect(() => {
        const hasShown = !!sessionStorage.getItem("hasAnimationShown");
        setHasAnimationShown(hasShown);
        setRenderingOpening(!hasShown);
    }, []);

    return (
        <AnimationContext.Provider value={{ hasAnimationShown, setHasAnimationShown, renderingOpening, setRenderingOpening }}>
            {children}
        </AnimationContext.Provider>
    );
};
