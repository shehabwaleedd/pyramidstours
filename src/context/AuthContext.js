'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter(); 


    useEffect(() => {
        // Initial check for existing auth token to set logged in state
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLoginSuccess = (token, userData) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userData._id);
        setIsLoggedIn(true);
        // Potentially redirect the user or trigger other actions
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        router.push('/login'); // Navigate to the login page after logout
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, handleLoginSuccess, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
