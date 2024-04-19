'use client'

import React, { createContext, useContext, useMemo, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { User } from '@/types/hooks';
import { TourType } from '@/types/homePageTours';

interface AuthContextType {
    user: User | null;
    error: string;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    userId: string | null;
    isLoggedIn: boolean;
    loading: boolean;
    handleLoginSuccess: (token: string, userData: User) => void;
    handleLogout: () => void;
    hasAnimationShown: boolean;
    setHasAnimationShown: React.Dispatch<React.SetStateAction<boolean>>;
    addToWishlist: (tour: TourType) => void;
    removeFromWishlist: (tourId: string) => void;
    wishlist: TourType[];
    isLoginOpen: boolean;
    setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleLoginSuccessForm: (token: string, userData: User) => void;
    clearWishlist: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};
interface AuthProviderProps {
    children: ReactNode;
}




export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [hasAnimationShown, setHasAnimationShown] = useState<boolean>(false);
    const [wishlist, setWishlist] = useState<TourType[]>(() => {
        if (typeof window !== 'undefined') {
            const storedWishlist = localStorage.getItem('wishlist');
            return storedWishlist ? JSON.parse(storedWishlist) : [];
        }
        return [];
    });
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token)
    }, []);


    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLoggedIn(false);
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, {
                    headers: { token },
                });
                if (response.status === 200 && response.data) {
                    setUser(response.data.data);
                    setIsLoggedIn(true);
                } else {
                    console.error("Failed to fetch user data with token");
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };
        console.log('User:', user)
        fetchUser();
    }, []);


    const addToWishlist = (tour: TourType) => {
        if (!isLoggedIn) {
            setIsLoginOpen(true);
        } else {

            const newWishlist = [...wishlist, tour];
            console.log("Saving to local storage:", newWishlist);
            localStorage.setItem('wishlist', JSON.stringify(newWishlist));
            setWishlist(newWishlist);
        }

    };

    const removeFromWishlist = (tourId: string) => {
        if (!isLoggedIn) {
            setIsLoginOpen(true);
        } else {
            const newWishlist = wishlist.filter(tour => tour._id !== tourId);
            console.log("Updated wishlist after removal:", newWishlist);
            localStorage.setItem('wishlist', JSON.stringify(newWishlist));
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
        console.log("Loaded from local storage on init:", storedWishlist);
        if (storedWishlist) {
            setWishlist(JSON.parse(storedWishlist));
        }
    }, []);



    const handleLoginSuccess = (token: string, userData: User) => {
        localStorage.setItem('token', token);
        localStorage.setItem('hasAnimationShown', 'true');
        localStorage.setItem('userId', userData._id);
        setUser(userData);
        setIsLoggedIn(true);
        router.push('/account');
    }; 

    const handleLoginSuccessForm = (token: string, userData: User) => {
        localStorage.setItem('token', token);
        localStorage.setItem('hasAnimationShown', 'true');
        localStorage.setItem('userId', userData._id);
        setUser(userData);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        const clearLocalStorageItems = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('hasAnimationShown');
            localStorage.removeItem('wishlist');
        };
        const resetAuthStates = () => {
            setUser(null);
            setIsLoggedIn(false);
        };
        clearLocalStorageItems();
        resetAuthStates();
        router.push('/login');
    };

    const authValue: AuthContextType = useMemo(() => ({
        user,
        setUser,
        userId,
        isLoggedIn,
        loading,
        handleLoginSuccess,
        handleLogout,
        hasAnimationShown,
        setHasAnimationShown,
        addToWishlist,
        removeFromWishlist,
        wishlist,
        isLoginOpen,
        setIsLoginOpen,
        error,
        handleLoginSuccessForm,
        clearWishlist
    }), [user, isLoggedIn, loading, wishlist, isLoginOpen, error, clearWishlist]);

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};
