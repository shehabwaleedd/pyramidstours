'use client'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './style.module.scss'
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { GoChevronDown } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { LiaUserSolid } from "react-icons/lia";
import AccountHeaderNavbar from "@/components/accountHeaderNavbar/";
import WishlistHeader from '../wishlistHeader';
import SearchField from '../searchField';
import DesktopMenu from './desktopMenu';
import { background } from './anim';
import { useWishlist } from '@/context/WishlistContext';
import { IoMdHeartEmpty } from "react-icons/io";
import CurrencyConverter from '../currencyConverter';
import NavLeft from './components/navLeft';
import NavbarData from './NavbarData';
import NavbarItem from './components/navbarItems';
import NavbarRightLeft from './components/navbarRightLeft';
import NavbarRightRight from './components/navbarRightRight';
import { TourType } from '@/types/homePageTours';

const Navbar = ({ tours }: { tours: TourType[] }) => {
    const router = usePathname();
    const [desktopNavOpen, setDesktopNavOpen] = useState<boolean | null>(false)
    const [profileOpen, setProfileOpen] = useState<boolean | null>(false);
    const [wishlistOpen, setWishlistOpen] = useState<boolean | null>(false);
    const [wishlistCount, setWishlistCount] = useState<number>(0)

    const { wishlist } = useWishlist();

    useEffect(() => {
        setWishlistCount(wishlist.length)
    }, [wishlist])



    const toggleDesktopNavOpen = useCallback(() => {
        setDesktopNavOpen(prevDesktopNavOpen => !prevDesktopNavOpen);
        setWishlistOpen(false);
        setProfileOpen(false);
    }, [])
    const toggleProfileOpen = () => {
        setProfileOpen(prev => !prev);
        setWishlistOpen(false);


    };
    const toggleWishlistOpen = () => {
        setWishlistOpen(prev => !prev);
        setProfileOpen(false);

    };

    useEffect(() => {
        setWishlistOpen(false)
        setDesktopNavOpen(false)
        setProfileOpen(false)
    }, [router])



    return (
        <header className={styles.navbar}>
            <nav className={styles.navbar__container}>
                <NavLeft tours={tours} />
                <section className={styles.navbar__right}>
                    <NavbarRightLeft />
                    <NavbarRightRight toggleProfileOpen={toggleProfileOpen} toggleWishlistOpen={toggleWishlistOpen} wishlistCount={wishlistCount} toggleDesktopNavOpen={toggleDesktopNavOpen} />
                </section>
                <AnimatePresence mode="wait">
                    {desktopNavOpen && <DesktopMenu />}
                </AnimatePresence>
            </nav>
            <motion.div variants={background} initial="initial" animate={desktopNavOpen ? "open" : "closed"} className={styles.background}></motion.div>
            <AnimatePresence mode='wait'>
                {profileOpen && <AccountHeaderNavbar profileOpen={profileOpen} />}
                {wishlistOpen && <WishlistHeader wishlistOpen={wishlistOpen} />}

            </AnimatePresence>

        </header>
    )
}

export default Navbar