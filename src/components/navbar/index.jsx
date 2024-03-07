'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import Nav from './nav/index';
import styles from './style.module.scss'
import { FiMenu } from "react-icons/fi";
import { usePathname } from 'next/navigation';
const Navbar = () => {
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
                    <h1>Pyramids</h1>
                </div>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
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