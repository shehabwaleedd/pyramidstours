import React from 'react';
import styles from './style.module.scss';
import { motion } from "framer-motion";
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import useWindowWidth from '@/hooks/useWindowWidth';
import { getVariants } from '@/animation/animate';  


const AccountHeaderNavbar = ({ profileOpen }: { profileOpen: boolean }) => {
    const { user, handleLogout } = useAuth();
    const userAvatar = user?.avatar?.url || "/user.png";
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth !== null && windowWidth < 768;


    return (
        <>
            {profileOpen && (
                <motion.div className={styles.accountHeader}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={getVariants(isMobile)}
                >
                    <div className={styles.accountHeader__profile}>
                        <div className={styles.accountHeader__profile_upper}>
                            <div>
                                <Image
                                    src={userAvatar}
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
                            <Link href="/account" aria-label="Account Page">
                                <span>Account</span>
                            </Link>
                            <button onClick={handleLogout} style={{ color: "red" }} aria-label="Logout">
                                Logout
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default AccountHeaderNavbar;
