'use client';
import React, { createContext, useContext, useMemo, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { User } from '@/types/hooks';

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    isLoggedIn: boolean;
    loading: boolean;
    handleLoginSuccess: (token: string, userData: User) => void;
    handleLogout: () => void;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;

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
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const token = Cookies.get('token');

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
            fetchUser();
        } else {
            setIsLoggedIn(false);
            setLoading(false);
        }
    }, [token]);
    
    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, {
                headers: {
                    'Content-Type': 'application/json',
                    token,
                },
            });

            if (response.status === 200) {
                setUser(response.data.data);
            } else {
                console.error('Failed to fetch user data:', response.data);
            }
        } catch (error) {
            console.error('Failed to fetch user data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginSuccess = (token: string, userData: User) => {
        Cookies.set('token', token, { expires: 1 });
        localStorage.setItem('userId', userData._id);
        toast.success('Successful, Redirecting you now to your dashboard');
        setUser(userData);
        setIsLoggedIn(true);
        router.push('/account');
    };

    const handleLogout = () => {
        Cookies.remove('token');
        localStorage.removeItem('userId');
        setUser(null);
        setIsLoggedIn(false);
        toast.success('Logged out successfully');
        router.push('/login');
    };

    const authValue = useMemo(
        () => ({ user, setUser, isLoggedIn, setIsLoggedIn, loading, handleLoginSuccess, handleLogout }),
        [user, isLoggedIn, loading]
    );

    return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};
