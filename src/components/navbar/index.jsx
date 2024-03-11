'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion';
import Nav from './nav/index';
import styles from './style.module.scss'
import { FiMenu } from "react-icons/fi";
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const Navbar = () => {
    const { isLoggedIn } = useAuth();
    const router = usePathname();
    const [navOpen, setNavOpen] = useState(false);
    const toggleNavOpen = useCallback(() => {
        setNavOpen(prevNavOpen => !prevNavOpen);
    }, []);
    useEffect(() => {
        setNavOpen(false);
    }, [router])
    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navbar__logo}>
                    <Link href="/">
                        <h1>
                            Pyramids
                        </h1>
                        <h2>
                            Egypt
                        </h2>
                        <h3>
                            Tours
                        </h3>

                    </Link>
                </div>
                <ul>
                    <li><a href="#">Trips</a></li>
                    <li><a href="#">Cities</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                    {isLoggedIn ? <li><a href="/account">Account</a></li> : (
                        <li><a href="/login">Login</a></li>
                    
                    )}
                </ul>

                <div className={styles.menu}>
                    <button onClick={toggleNavOpen}><FiMenu style={{ fontSize: "2rem", position: "relative", right: "0.5rem", color: "#fff" }} /></button>
                </div>
            </nav>
            <AnimatePresence mode='wait'>
                {navOpen && <Nav setNavOpen={setNavOpen} navOpen={navOpen} />}
            </AnimatePresence>
        </>
    )
}

export default Navbar