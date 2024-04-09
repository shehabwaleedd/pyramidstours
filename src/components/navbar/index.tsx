'use client'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from './nav/index';
import styles from './style.module.scss'
import { FiMenu } from "react-icons/fi";
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { FiHeart } from "react-icons/fi";
import Image from 'next/image';
import { GoChevronDown } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { LiaUserSolid } from "react-icons/lia";
import AccountHeaderNavbar from "@/components/accountHeaderNavbar/";
import NavbarSearch from '../navbarSearch';
import WishlistHeader from '../wishlistHeader';

const NavbarData = [
    {
        id: 1,
        title: "Tours",
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
            { title: "Marsa Alam Day Tours", href: "/marsa-alam-day-tours" },
            { title: "El Gouna Day Tours", href: "/el-gouna-day-tours" },
            { title: "Taba Day Tours", href: "/taba-day-tours" },
            { title: "Nuweiba Day Tours", href: "/nuweiba-day-tours" },
            { title: "Siwa Day Tours", href: "/siwa-day-tours" },
            { title: "Bahariya Oasis Day Tours", href: "/bahariya-oasis-day-tours" },
            { title: "Fayoum Day Tours", href: "/fayoum-day-tours" },
            { title: "Safari Tours", href: "/safari-tours" },
            { title: "Honeymoon Tours", href: "/honeymoon-tours" },
            { title: "Egypt and Jordan Tours", href: "/egypt-and-jordan-tours" },
        ]
    },
    {
        id: 2,
        title: "Packages",
        expandable: true,
        subMenu: [
            { title: "2 Days 1 Night", href: "/2-days-1-night" },
            { title: "3 Days 2 Nights", href: "/3-days-2-nights" },
            { title: "4 Days 3 Nights", href: "/4-days-3-nights" },
            { title: "5 Days 4 Nights", href: "/5-days-4-nights" },
            { title: "6 Days 5 Nights", href: "/6-days-5-nights" },
            { title: "7 Days 6 Nights", href: "/7-days-6-nights" },
            { title: "8 Days 7 Nights", href: "/8-days-7-nights" },
            { title: "9 Days 8 Nights", href: "/9-days-8-nights" },
            { title: "10 Days 9 Nights", href: "/10-days-9-nights" },
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
            { title: "Marsa Alam Airport Transfers", href: "/marsa-alam-airport-transfers" },
            { title: "Alexandria Airport Transfers", href: "/alexandria-airport-transfers" },
        ],
    },
    {
        id: 4,
        title: "Offers",
        href: "/offers",
        expandable: false,
    }

];

const Navbar = () => {
    const { isLoggedIn, user } = useAuth();
    const router = usePathname();
    const [navOpen, setNavOpen] = useState<boolean>(false);
    const [desktopNavOpen, setDesktopNavOpen] = useState<boolean | null>(false)
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const [profileOpen, setProfileOpen] = useState<boolean | null>(false);
    const [wishlistOpen, setWishlistOpen] = useState<boolean | null>(false);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const toggleNavOpen = useCallback(() => {
        setNavOpen(prevNavOpen => !prevNavOpen);
        setWishlistOpen(false);
        setProfileOpen(false);
    }, []);


    const toggleDesktopNavOpen = useCallback(() => {
        setDesktopNavOpen(prevDesktopNavOpen => !prevDesktopNavOpen);
        setWishlistOpen(false);
        setProfileOpen(false);
    }, [])
    const toggleProfileOpen = () => {
        setProfileOpen(prev => !prev);
        setWishlistOpen(false);
        setNavOpen(false);

    };
    const toggleWishlistOpen = () => {
        setWishlistOpen(prev => !prev);
        setProfileOpen(false);
        setNavOpen(false);
    };

    useEffect(() => {
        setNavOpen(false);
        setDesktopNavOpen(false)
        setProfileOpen(false)
    }, [router])

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
        <motion.header className={styles.navbar} animate={{ height: desktopNavOpen ? "99vh" : "6.5vh", }} transition={{ delay: 0.5, duration: 0.75, ease: [0.42, 0, 0.58, 1], staggerChildren: 0.1}}>
            <motion.nav className={styles.navbar__container}>
                <div className={styles.navbar__logo}>
                    <Link href="/" className={styles.logo_content}>
                        <Image src="/Pyramids_logo.webp" alt="pyramids" width={80} height={70} objectFit='cover' />
                        <h1>Pyramids</h1>
                    </Link>
                    <NavbarSearch />
                </div>
                <ul className={styles.ul}>
                    <div className={styles.navbar__ul_left}>
                        {NavbarData.map((item) =>
                            item.expandable ? (
                                <li key={item.id}
                                    onMouseEnter={() => handleDropdown(item.id)}
                                    onMouseLeave={() => handleDropdownDelayedClose(item.id)}>
                                    <Link href="#">
                                        {item.title}
                                        <GoChevronDown />
                                    </Link>
                                    <AnimatePresence>
                                        {openDropdownId === item.id && (
                                            <motion.ul
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className={styles.dropdown}>
                                                {item?.subMenu?.map((subItem, index) => (
                                                    <motion.li key={index}>
                                                        <Link href={subItem.href}>
                                                            <span>{subItem.title}</span>
                                                        </Link>
                                                    </motion.li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                </li>
                            ) : (
                                <li key={item.id}>
                                    <Link href={item.href || "#"}>
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        )}
                    </div>
                    <div className={styles.navbar__ul_right}>
                        <li>
                            {isLoggedIn ?
                                (<button onClick={toggleProfileOpen}>
                                    <LiaUserSolid style={{ fontSize: "1.6rem" }} />
                                </button>
                                ) : (
                                    <Link href="/login">
                                        Login
                                    </Link>
                                )}
                        </li>
                        <li className={styles.cart}>
                            <button onClick={toggleWishlistOpen}>
                                <FiHeart />
                            </button>
                            <span>{user?.wishList?.length | 0}</span>
                        </li>
                        <div className={styles.desktop_menu}>
                            <button onClick={toggleDesktopNavOpen}><TbMenuDeep style={{ fontSize: "2rem", position: "relative", right: "0.5rem" }} /></button>
                        </div>
                    </div>
                </ul>
                <div className={styles.menu}>
                    <ul>
                        <li>
                            {isLoggedIn ?
                                (<button onClick={toggleProfileOpen}>
                                    <LiaUserSolid style={{ fontSize: "1.6rem" }} />
                                </button>
                                ) : (
                                    <Link href="/login">
                                        Login
                                    </Link>
                                )}
                        </li>
                        <li className={styles.cart}>
                            <button onClick={toggleWishlistOpen}>
                                <FiHeart />
                            </button>
                            <span>{user?.wishList?.length | 0}</span>
                        </li>
                    </ul>
                    <button onClick={toggleNavOpen}><FiMenu style={{ fontSize: "2rem", position: "relative", right: "0.5rem" }} /></button>
                </div>
            </motion.nav>
            <AnimatePresence mode='wait'>
                {navOpen && <Nav setNavOpen={setNavOpen} navOpen={navOpen} />}
                {profileOpen && <AccountHeaderNavbar profileOpen={profileOpen} />}
                {wishlistOpen && <WishlistHeader wishlistOpen={wishlistOpen} />}

            </AnimatePresence>
        </motion.header>
    )
}

export default Navbar