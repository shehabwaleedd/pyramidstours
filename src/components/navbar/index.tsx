'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from './nav/index';
import styles from './style.module.scss'
import { FiMenu } from "react-icons/fi";
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { FiShoppingCart, FiHeart, FiUser } from "react-icons/fi";


const logoVariants = {
    scrolled: {
        transition: { duration: 1, ease: "easeInOut" },
    },
    notScrolled: {
        transition: { duration: 1, ease: "easeInOut" },
    },
};

const detailVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1, ease: "easeInOut" } },
    exit: { x: -20, opacity: 0, transition: { duration: 1, ease: "easeInOut" } },
};


const Navbar = () => {
    const { isLoggedIn } = useAuth();
    const router = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const toggleNavOpen = useCallback(() => {
        setNavOpen(prevNavOpen => !prevNavOpen);
    }, []);
    useEffect(() => {
        setNavOpen(false);
    }, [router])
    useEffect(() => {
        const handleScroll = (): void => {
            if (window.scrollY > 60) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navbar__logo}>
                    <Link href="/">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                initial="notScrolled"
                                animate={isScrolled ? "scrolled" : "notScrolled"}
                                variants={logoVariants}
                            >
                                <h1>Pyramids</h1>
                                {!isScrolled && (
                                    <>
                                        <motion.h2
                                            variants={detailVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            Egypt
                                        </motion.h2>
                                        <motion.h3
                                            variants={detailVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            Tours
                                        </motion.h3>
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
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
                        <li className={styles.cart}>
                            <Link href="/wishlist">
                                <FiHeart />
                            </Link>
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