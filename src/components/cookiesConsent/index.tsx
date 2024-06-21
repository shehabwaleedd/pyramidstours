'use client'

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './style.module.scss';
import Link from 'next/link';

const CookiesConsent: React.FC = () => {
    const { cookiesConsent, setCookiesConsent } = useAuth();
    const [isShown, setIsShown] = useState<boolean>(false);

    useEffect(() => {
        if (!cookiesConsent) {
            setIsShown(true);
        }
    }, [cookiesConsent]);

    if (!isShown) return null;

    const handleAccept = () => {
        setCookiesConsent('accepted');
        setIsShown(false);
    };

    const handleDecline = () => {
        setCookiesConsent('declined');
        setIsShown(false);
    };

    return (
        <div className={styles.cookies_consent}>
            <p>We use cookies for analytics purposes. Do you accept?</p>
            <Link href="/privacy"> Read our privacy policy </Link>
            <div className={styles.cookies_consent_btns}>
                <button style={{ backgroundColor: "var(--third-accent-color)" }} onClick={handleAccept}>Accept</button>
                <button onClick={handleDecline}>Decline</button>
            </div>
        </div>
    );
};

export default CookiesConsent;
