'use client'

import React, { createContext, useContext, useMemo, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { User } from '@/types/hooks';

interface AuthContextType {
    user: User | null;
    error: string;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    userId: string | null;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    handleLoginSuccess: (token: string, userData: User) => void;
    handleLogout: () => void;
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
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            setIsLoggedIn(false);
            setError('No token found');
            return;
        }

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/authentication`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.message === "success") {
                setIsLoggedIn(true);
                fetchUserDetails(token);
            } else {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                setError('Authentication failed');
            }
        } catch (error: any) {
            console.error('Authentication error:', error);
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            setError(error.message || 'Unknown authentication error');
        }
        setLoading(false);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const fetchUserDetails = async (token: string) => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data && data.user) {
                setUser(data.user);
            } else {
                setError('Failed to fetch user details');
            }
        } catch (error: any) {
            console.error('Failed to fetch user details:', error);
            setError(error.message || 'Unknown error fetching user details');
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

    const clearLocalStorage = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('hasAnimationShown');
        localStorage.removeItem('wishlist');
    };

    const handleLogout = () => {
        
        const resetAuthStates = () => {
            setUser(null);
            setIsLoggedIn(false);
        };
        clearLocalStorage();
        resetAuthStates();
        router.push('/login');
    };

    const authValue: AuthContextType = useMemo(() => ({
        user,
        setUser,
        userId,
        isLoggedIn,
        setIsLoggedIn,
        loading,
        handleLoginSuccess,
        handleLogout,
        error,
    }), [user, isLoggedIn, loading, error, setIsLoggedIn]);
    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};
