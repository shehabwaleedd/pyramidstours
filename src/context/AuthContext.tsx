'use client'

import React, { createContext, useContext, useMemo, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { User } from '@/types/hooks';
import Cookies from 'js-cookie';
import { toast } from 'sonner';


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

interface UserResponse {
    data: User;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const token = Cookies.get("token")

    const authCheck = () => {
        if (token) {
            setIsLoggedIn(true);
            fetchUser();
        } else {
            setIsLoggedIn(false);

        }
    }


    useEffect(() => {
        authCheck();
    }, [token]);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await axios.get<UserResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, {
                headers: {
                    token
                }
            });
            setUser(response.data.data);
        } catch (error) {
            setError('Failed to fetch user data');
        } finally {
            setLoading(false);
        }
    }



    const handleLoginSuccess = (token: string, userData: User) => {
        Cookies.set('token', token, { expires: new Date(new Date().getTime() + 30 * 60 * 1000) });
        localStorage.setItem('hasAnimationShown', 'true');
        localStorage.setItem('userId', userData._id);
        toast.success('Login successful, Redirecting to dashboard...');
        setUser(userData);
        setIsLoggedIn(true);
        router.push('/account');
    };

    const clearLocalStorage = () => {
        Cookies.remove('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('hasAnimationShown');
        localStorage.removeItem('wishlist');
    };

    const handleLogout = () => {

        const resetAuthStates = () => {
            setUser(null);
            setIsLoggedIn(false);
        };
        toast.success('Logged out successfully')
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
    }), [user, isLoggedIn, setIsLoggedIn]);
    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};
