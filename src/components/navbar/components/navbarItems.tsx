// Code to create navbar items
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { GoChevronDown } from "react-icons/go";
import styles from '../style.module.scss';



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
            <Link href={item.href || "#"} aria-label={`Go to ${item.title} Page`}>
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
                                <Link href={subItem.href} aria-label={`Go to ${subItem.title} Page`}>{subItem.title}</Link>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>}
        </li>
    );
};


export default NavbarItem;