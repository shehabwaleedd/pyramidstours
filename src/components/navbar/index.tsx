'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './style.module.scss';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { background } from './anim';
import { useWishlist } from '@/context/WishlistContext';
import NavLeft from './components/navLeft';
import NavbarRightLeft from './components/navbarRightLeft';
import NavbarRightRight from './components/navbarRightRight';
import { TourType } from '@/types/homePageTours';


const DesktopMenu = dynamic(() => import('@/components/navbar/desktopMenu'), { ssr: false });
const AccountHeaderNavbar = dynamic(() => import('@/components/accountHeaderNavbar/'), { ssr: false });
const WishlistHeader = dynamic(() => import('@/components/wishlistHeader'), { ssr: false });

const Navbar = ({ tours }: { tours: TourType[] }) => {
    const router = usePathname();
    const [desktopNavOpen, setDesktopNavOpen] = useState<boolean | null>(false);
    const [profileOpen, setProfileOpen] = useState<boolean>(false);
    const [wishlistOpen, setWishlistOpen] = useState<boolean | null>(false);
    const [wishlistCount, setWishlistCount] = useState<number>(0);

    const { wishlist } = useWishlist();

    useEffect(() => {
        setWishlistCount(wishlist.length);
    }, [wishlist]);

    const toggleDesktopNavOpen: () => void = useCallback(() => {
        setDesktopNavOpen(prevDesktopNavOpen => !prevDesktopNavOpen);
        setWishlistOpen(false);
        setProfileOpen(false);
    }, []);

    const toggleProfileOpen = () => {
        console.log("Profile toggle function triggered");
        setProfileOpen(prev => !prev);
        setWishlistOpen(false);
    };

    const toggleWishlistOpen = () => {
        setWishlistOpen(prev => !prev);
        setProfileOpen(false);
    };

    useEffect(() => {
        setWishlistOpen(false);
        setDesktopNavOpen(false);
        setProfileOpen(false);
    }, [router]);

    return (
        <>
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
            </header>
            <AnimatePresence mode="wait">
                {profileOpen && <AccountHeaderNavbar profileOpen={profileOpen} setProfileOpen={setProfileOpen} />}
                {wishlistOpen && <WishlistHeader wishlistOpen={wishlistOpen} />}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
