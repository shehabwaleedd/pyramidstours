'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion';
import Nav from './nav/index';
import styles from './style.module.scss'
import { FiMenu } from "react-icons/fi";
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { FiShoppingCart, FiHeart, FiUser } from "react-icons/fi";

const Navbar = () => {
    const { isLoggedIn } = useAuth();
    const router = usePathname();
    const [navOpen, setNavOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
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
                    <div className={styles.navbar__ul_left}>
                        <li><a href="#">Trips</a></li>
                        <li><a href="#">Cities</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                    </div>
                    <div className={styles.navbar__ul_right}>
                        <li>
                            <Link href="/login">
                                {isLoggedIn ? "Account" : "Login"}
                            </Link>
                        </li>
                        <li>
                            <Link href="/wishlist">
                                <FiHeart />
                            </Link>
                        </li>
                        <li className={styles.cart}>
                            <FiShoppingCart />
                            <span>{cartCount}</span>
                        </li>

                    </div>
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