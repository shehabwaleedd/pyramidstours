import React, { useState } from 'react';
import CurrencyConverter from '@/components/currencyConverter';
import { LiaUserSolid } from 'react-icons/lia';
import { IoMdHeartEmpty } from 'react-icons/io';
import Link from 'next/link';
import styles from '../style.module.scss';
import { useAuth } from '@/context/AuthContext';
import { TbMenuDeep } from 'react-icons/tb';

const NavbarRightRight = ({ toggleProfileOpen, toggleWishlistOpen, wishlistCount, toggleDesktopNavOpen }: {
    toggleProfileOpen: () => void;
    toggleWishlistOpen: () => void;
    wishlistCount: number;
    toggleDesktopNavOpen: () => void;

}) => {
    const { isLoggedIn } = useAuth();
    const [convertOpen, setConvertOpen] = useState<boolean>(false);

    return (
        <ul className={styles.navbar__right_right}>
            <li>
                <CurrencyConverter convertOpen={convertOpen} setConvertOpen={setConvertOpen} />
            </li>
            <li>
                {isLoggedIn ? (
                    <button onClick={toggleProfileOpen} aria-label="Open profile">
                        <LiaUserSolid style={{ fontSize: "1.6rem" }} />
                    </button>
                ) : (
                    <Link href="/login" aria-label="Login">
                        Login
                    </Link>
                )}
            </li>
            <li className={styles.cart}>
                <button onClick={toggleWishlistOpen} aria-label="Open wishlist">
                    <IoMdHeartEmpty />
                </button>
                <span>{wishlistCount ?? 0}</span>
            </li>
            <li className={styles.desktop_menu}>
                <button onClick={toggleDesktopNavOpen} aria-label="Toggle navigation">
                    <TbMenuDeep style={{ fontSize: "2rem", position: "relative", right: "0.5rem" }} />
                </button>
            </li>
        </ul>
    );
};

export default NavbarRightRight;
