import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const AccountHeaderNavbar = ({ profileOpen }: { profileOpen: boolean }) => {
    const { user, handleLogout } = useAuth();
    const userAvatar = user?.avatar?.url || "/user.png";

    return (
        <div className={styles.accountHeader}>
            {profileOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className={styles.accountHeader__profile}>
                    <div className={styles.accountHeader__profile_upper}>
                        <div>
                            <Image
                                src={userAvatar ?? "/user.png"}
                                alt="User Avatar"
                                width={50}
                                height={50}
                                className={styles.accountHeader__profile_upper_avatar}
                            />
                        </div>
                        <div>
                            <h3>{user?.name}</h3>
                            <p>{user?.email}</p>
                        </div>
                    </div>
                    <div className={styles.accountHeader__profile_lower}>
                        <Link href="/account">
                            <span>Account</span>
                        </Link>
                        <Link href={`/account/user/${user?._id}/user-subscriptions`}>
                            <span>My Subscriptions</span>
                        </Link>
                        <button onClick={handleLogout} style={{ color: "red" }}>
                            Logout
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default AccountHeaderNavbar;
