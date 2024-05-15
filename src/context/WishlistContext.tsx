'use client'

import React, { createContext, useContext, useMemo, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/hooks';
import { TourType } from '@/types/homePageTours';
import { useAuth } from '@/context/AuthContext';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
interface WishlistContextType {
    addToWishlist: (tour: TourType) => void;
    removeFromWishlist: (tourId: string) => void;
    wishlist: TourType[];
    isLoginOpen: boolean;
    setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleLoginSuccessForm: (token: string, userData: User) => void;
    clearWishlist: () => void;
    hasAnimationShown: boolean;
    setHasAnimationShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);


export const useWishlist = (): WishlistContextType => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};
interface WishlistProviderProps {
    children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
    const [hasAnimationShown, setHasAnimationShown] = useState<boolean>(false);
    const { isLoggedIn, setIsLoggedIn, setUser } = useAuth();
    const [wishlist, setWishlist] = useState<TourType[]>(() => {
        if (typeof window !== 'undefined') {
            const storedWishlist = localStorage.getItem('wishlist');
            return storedWishlist ? JSON.parse(storedWishlist) : [];
        }
        return [];
    });
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

    const addToWishlist = (tour: TourType) => {
        if (!isLoggedIn) {
            setIsLoginOpen(true);
        } else {

            const newWishlist = [...wishlist, tour];
            localStorage.setItem('wishlist', JSON.stringify(newWishlist));
            toast.success('Tour added to wishlist');
            setWishlist(newWishlist);
        }

    };

    const removeFromWishlist = (tourId: string) => {
        if (!isLoggedIn) {
            setIsLoginOpen(true);
        } else {
            const newWishlist = wishlist.filter(tour => tour._id !== tourId);
            localStorage.setItem('wishlist', JSON.stringify(newWishlist));
            toast.success('Tour removed from wishlist');
            setWishlist(newWishlist);
        }
    };

    const clearWishlist = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoggedIn(false);
        } else {
            localStorage.removeItem('wishlist');
            setWishlist([]);
        }
    }


    useEffect(() => {
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            setWishlist(JSON.parse(storedWishlist));
        }
    }, []);





    const handleLoginSuccessForm = (token: string, userData: User) => {
        Cookies.set('token', token, { expires: new Date(new Date().getTime() + 30 * 60 * 1000)});   
        localStorage.setItem('hasAnimationShown', 'true');
        localStorage.setItem('userId', userData._id);
        toast.success('Login successful');
        setUser(userData);
        setIsLoggedIn(true);
    };



    const contextValue: WishlistContextType = useMemo(() => ({
        hasAnimationShown,
        setHasAnimationShown,
        addToWishlist,
        removeFromWishlist,
        wishlist,
        isLoginOpen,
        setIsLoginOpen,
        handleLoginSuccessForm,
        clearWishlist,
        children
    }), [wishlist, isLoginOpen]);

    return (
        <WishlistContext.Provider value={contextValue}>
            {children}
        </WishlistContext.Provider>
    );
};
