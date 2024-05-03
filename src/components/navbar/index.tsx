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

const NavbarData = [
    {
        id: 1,
        title: "Tours",
        href: "/tours",
        expandable: true,
        subMenu: [
            { title: "Cairo Day Tours", href: "/cairo-day-tours" },
            { title: "Giza Day Tours", href: "/giza-day-tours" },
            { title: "Luxor Day Tours", href: "/luxor-day-tours" },
            { title: "Aswan Day Tours", href: "/aswan-day-tours" },
            { title: "Sharm El Sheikh Day Tours", href: "/sharm-el-sheikh-day-tours" },
            { title: "Hurghada Day Tours", href: "/hurghada-day-tours" },
            { title: "Alexandria Day Tours", href: "/alexandria-day-tours" },
            { title: "Dahab Day Tours", href: "/dahab-day-tours" },
            { title: "Siwa Day Tours", href: "/siwa-day-tours" },
            { title: "Fayoum Day Tours", href: "/fayoum-day-tours" },
            { title: "Safari Tours", href: "/safari-tours" },
            { title: "Honeymoon Tours", href: "/honeymoon-tours" },
        ]
    },
    {
        id: 2,
        title: "Packages",
        href: "/packages",
        expandable: true,
        subMenu: [
            { title: "2 Days 1 Night", href: "/2-days-1-night-tours" },
            { title: "3 Days 2 Nights", href: "/3-days-2-nights-tours" },
            { title: "4 Days 3 Nights", href: "/4-days-3-nights-tours" },
            { title: "5 Days 4 Nights", href: "/5-days-4-nights-tours" },
            { title: "6 Days 5 Nights", href: "/6-days-5-nights-tours" },
            { title: "7 Days 6 Nights", href: "/7-days-6-nights-tours" },
            { title: "8 Days 7 Nights", href: "/8-days-7-nights-tours" },
            { title: "9 Days 8 Nights", href: "/9-days-8-nights-tours" },
            { title: "10 Days 9 Nights", href: "/10-days-9-nights-tours" },
        ]
    },
    {
        id: 3,
        title: "Transfers",
        href: "/transfers",
        expandable: true,
        subMenu: [
            { title: "Cairo Airport Transfers", href: "/cairo-airport-transfers" },
            { title: "Sharm El Sheikh Airport Transfers", href: "/sharm-el-sheikh-airport-transfers" },
            { title: "Hurghada Airport Transfers", href: "/hurghada-airport-transfers" },
            { title: "Luxor Airport Transfers", href: "/luxor-airport-transfers" },
            { title: "Alexandria Airport Transfers", href: "/alexandria-airport-transfers" },
        ],
    },
    {
        id: 4,
        title: "Offers",
        href: "/search/hasOffer=true",
        expandable: false,
    }

];



const NavbarItem = ({ item, expandable }: { item: any, expandable: boolean }) => {
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

    const handleDropdown = (id: number | null) => {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        setOpenDropdownId(id);
    };

    const handleDropdownDelayedClose = (id: number) => {
        closeTimeoutRef.current = setTimeout(() => {
            if (openDropdownId === id) {
                setOpenDropdownId(null);
            }
        }, 100);
    };
    return (
        <li key={item.id}
            onMouseEnter={() => handleDropdown(item.id)}
            onMouseLeave={() => handleDropdownDelayedClose(item.id)}
            className={styles.navbar__right_left}
        >
            <Link href={item.href || "#"}>
                {item.title}
                {expandable && <GoChevronDown />}
            </Link>
            {expandable && <AnimatePresence>
                {openDropdownId === item.id && (
                    <motion.ul
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={styles.dropdown}>
                        {item.subMenu.map((subItem: any, index: number) => (
                            <motion.li key={index}>
                                <Link href={subItem.href}>{subItem.title}</Link>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>}
        </li>
    );
};

const Navbar = () => {
    const { isLoggedIn } = useAuth();
    const { wishlist } = useWishlist();
    const router = usePathname();
    const [desktopNavOpen, setDesktopNavOpen] = useState<boolean | null>(false)
    const [profileOpen, setProfileOpen] = useState<boolean | null>(false);
    const [wishlistOpen, setWishlistOpen] = useState<boolean | null>(false);
    const [wishlistCount, setWishlistCount] = useState<number>(0)

    useEffect(() => {
        setWishlistCount(wishlist.length)
    }, [wishlist])

    const isNavbar: boolean = true



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
        <motion.header className={styles.navbar} transition={{ delay: 0.5, duration: 0.75, ease: [0.42, 0, 0.58, 1], staggerChildren: 0.1 }}>
            <motion.nav className={styles.navbar__container}>
                <section className={styles.navbar__logo}>
                    <Link href="/">
                        <Image src="/Pyramids_logo.webp" alt="logo" width={300} height={200} />
                    </Link>
                    <Link href="/" className={styles.logo_content}>
                        <h1>Pyramids</h1>
                    </Link>
                    <SearchField isNavbar={isNavbar} />
                </section>
                <section className={styles.navbar__right}>
                    <ul className={styles.ul}>
                        <div className={styles.navbar__right_left}>
                            {NavbarData.map((item) =>
                                <NavbarItem key={item.id} item={item} expandable={item.expandable} />
                            )}
                        </div>
                    </ul>

                    <ul className={styles.navbar__right_right}>
                        <li>
                            {isLoggedIn ?
                                (<button onClick={toggleProfileOpen} aria-label="Open profile">
                                    <LiaUserSolid style={{ fontSize: "1.6rem" }} />
                                </button>
                                ) : (
                                    <Link href="/login">
                                        Login
                                    </Link>
                                )}
                        </li>
                        <li className={styles.cart}

                        >
                            <button onClick={toggleWishlistOpen} aria-label="Open wishlist">
                                <IoMdHeartEmpty />
                            </button>
                            <span>{wishlistCount ?? 0}</span>
                        </li>
                        <div className={styles.desktop_menu}>
                            <button onClick={toggleDesktopNavOpen} aria-label="Toggle navigation"><TbMenuDeep style={{ fontSize: "2rem", position: "relative", right: "0.5rem" }} /></button>
                        </div>
                    </ul>
                </section>
                <AnimatePresence mode="wait">
                    {desktopNavOpen && <DesktopMenu />}
                </AnimatePresence>
            </motion.nav>
            <motion.div variants={background} initial="initial" animate={desktopNavOpen ? "open" : "closed"} className={styles.background}></motion.div>
            <AnimatePresence mode='wait'>
                {profileOpen && <AccountHeaderNavbar profileOpen={profileOpen} />}
                {wishlistOpen && <WishlistHeader wishlistOpen={wishlistOpen} />}

            </AnimatePresence>

        </motion.header>
    )
}

export default Navbar