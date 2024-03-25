'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const userId = typeof window !== 'undefined' ? window.localStorage.getItem('userId') : null;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [hasAnimationShown, setHasAnimationShown] = useState(false);

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
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
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

        fetchUser();
    }, []);



    const handleLoginSuccess = (token, userData) => {
        localStorage.setItem('token', token);
        localStorage.setItem('hasAnimationShown', JSON.stringify(true));
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



    const authValue = {
        user,
        setUser,
        userId,
        isLoggedIn,
        loading,
        handleLoginSuccess,
        handleLogout,
        hasAnimationShown,
        setHasAnimationShown,
    };

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};
