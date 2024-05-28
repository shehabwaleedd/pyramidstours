'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import Cookies from 'js-cookie';
import { TourType } from '@/types/homePageTours';
import { User } from '@/types/hooks';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface WishlistContextType {
    addToWishlist: (tour: TourType) => void;
    removeFromWishlist: (tourId: string) => void;
    wishlist: TourType[];
    isLoginOpen: boolean;
    setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isRegisterOpen: boolean;
    setIsRegisterOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleLoginSuccessForm: (token: string, userData: User) => void;
    clearWishlist: () => void;
    handleLoginIsOpen: () => void;
    handleRegisterIsOpen: () => void;

}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = (): WishlistContextType => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

interface WishlistProviderProps {
    children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
    const { isLoggedIn, setIsLoggedIn, setUser } = useAuth();
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

    const [wishlist, setWishlist] = useState<TourType[]>(() => {
        if (typeof window !== 'undefined') {
            const storedWishlist = localStorage.getItem('wishlist');
            return storedWishlist ? JSON.parse(storedWishlist) : [];
        }
        return [];
    });

    const handleLoginIsOpen = () => {
        setIsLoginOpen(true);
        setIsRegisterOpen(false);
    }

    const handleRegisterIsOpen = () => {
        setIsRegisterOpen(true);
        setIsLoginOpen(false);
    }



    const addToWishlist = (tour: TourType) => {
        const token = Cookies.get('token');
        if (!token) {
            setIsLoginOpen(true);
        } else {
            const newWishlist = [...wishlist, tour];
            localStorage.setItem('wishlist', JSON.stringify(newWishlist));
            toast.success('Tour added to wishlist');
            setWishlist(newWishlist);
        }
    };

    const removeFromWishlist = (tourId: string) => {
        const newWishlist = wishlist.filter(tour => tour._id !== tourId);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
        toast.success('Tour removed from wishlist');
        setWishlist(newWishlist);
    };

    const clearWishlist = () => {
        localStorage.removeItem('wishlist');
        setWishlist([]);
    };

    const handleLoginSuccessForm = (token: string, userData: User) => {
        Cookies.set('token', token, { expires: 1 });
        localStorage.setItem('userId', userData._id);
        toast.success('Login successful');
        setUser(userData);
        setIsLoggedIn(true);
    };

    const contextValue = useMemo(
        () => ({
            addToWishlist,
            removeFromWishlist,
            wishlist,
            isLoginOpen,
            setIsLoginOpen,
            handleLoginSuccessForm,
            clearWishlist,
            isRegisterOpen,
            setIsRegisterOpen,
            handleRegisterIsOpen,
            handleLoginIsOpen,
        }),
        [wishlist, isLoginOpen]
    );

    return <WishlistContext.Provider value={contextValue}>{children}</WishlistContext.Provider>;
};
