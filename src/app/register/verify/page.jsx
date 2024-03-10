'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from "./page.module.scss";

const Verify = () => {
    const router = useRouter(); // Use useRouter hook to navigate


    useEffect(() => {
        const checkConfirmationStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
                    headers: { token },
                });
                if (response.data.data.isConfirmed) {
                    router.push('/account'); // Navigate to /account if confirmed
                }
            } catch (error) {
                console.error("Error checking confirmation status:", error);
            }
        };

        // Using an IIFE for the async operation inside useEffect
        const timer = setTimeout(() => {
            checkConfirmationStatus();
        }, 30000); //

        return () => clearTimeout(timer);
    }, []);

    return (
        <main className={styles.verify}>
            <h2>Verify your email</h2>
            <p>
                We have sent a verification link to your email. Please check your email and click on the link to verify your account.
            </p>
        </main>
    );
};

export default Verify;
