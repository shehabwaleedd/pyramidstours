'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
    addToWishlist: (tourId: string) => Promise<void>;
    removeFromWishlist: (tourId: string) => Promise<void>;
    wishlist: TourType[];
    isLoginOpen: boolean;
    setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
    
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
    const [wishlist, setWishlist] = useState<TourType[]>([]);
    const [isLoginOpen, setIsLoginOpen]= useState<boolean>(false);
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
                    setWishlist(response.data.data.wishList || []);
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


    const addToWishlist = async (tourId: string) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/addToWishlist/${tourId}`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setWishlist(currentWishlist => [...currentWishlist, tourId] as TourType[]);
            } catch (error) {
                console.error('Error adding to wishlist:', error);
            }
        } else {
            console.log('User must be logged in to add to wishlist');
        }
    };

    const removeFromWishlist = async (tourId: string) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/removeWishlist/${tourId}`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setWishlist(currentWishlist => currentWishlist.filter(tour => tour._id !== tourId));
            } catch (error) {
                console.error('Error removing from wishlist:', error);
            }
        } else {
            console.log('User must be logged in to remove from wishlist');
        }
    };

    const handleLoginSuccess = (token: string, userData: User) => {
        localStorage.setItem('token', token);
        localStorage.setItem('hasAnimationShown', 'true');
        localStorage.setItem('userId', userData._id);
        setUser(userData);
        setIsLoggedIn(true);
        router.push('/account');
    };

    const handleLogout = () => {
        const clearLocalStorageItems = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('hasAnimationShown');
        };
        const resetAuthStates = () => {
            setUser(null);
            setIsLoggedIn(false);
        };
        clearLocalStorageItems();
        resetAuthStates();
        router.push('/login');
    };



const authValue: AuthContextType = {
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
        error
    };


    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};
