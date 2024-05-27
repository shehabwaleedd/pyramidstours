import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from "./style.module.scss";
import Image from 'next/image';
import { FaGlobeAmericas } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import axios from 'axios';
import { useUserById } from '@/lib/user/useUserById';
import global from "../../../../app/page.module.scss"
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import useWindowWidth from '@/hooks/useWindowWidth'
import { getVariants } from '@/animation/animate'

interface ViewUserDetailsAdminProps {
    userOpen: string;
    setUserOpen: (id: string | null) => void;
}

const ViewUserDetailsAdmin: React.FC<ViewUserDetailsAdminProps> = ({ userOpen, setUserOpen }) => {
    const { user, loading } = useUserById(userOpen);
    const token = Cookies.get('token');
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth !== null && windowWidth < 768;

    const deleteUser = async (id: string) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this user?");
        if (isConfirmed) {
            try {
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        token,
                    },
                });
                if (response.status === 200) {
                    toast.success("User has been deleted");
                    setUserOpen(null);
                }
            }
            catch (error) {
                console.log(error);
                toast.error("Failed to delete user, please try again later");
            }
        }
    }

    useEffect(() => {

        const fetchRandomApi = async () => {
            try {
                const response = await axios.get('https://randomuser.me/api/');
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchRandomApi();

    }, [])

    return (
        <motion.section
            initial="initial"
            animate="animate"
            exit="exit"
            variants={getVariants(isMobile)}
            className={`${styles.viewUserDetailsAdmin} ${!isMobile ? global.centeredGlass : global.bottomGlass}`}>
            <div className={styles.viewUserDetailsAdmin__container}>
                <div className={styles.viewUserDetailsAdmin__container__close}>
                    <button onClick={() => setUserOpen(null)} aria-label="Close">close</button>
                </div>
                <div className={styles.viewUserDetailsAdmin__container__top}>
                    <Image
                        src={user?.avatar?.url || '/user.png'}
                        alt={user?.name || 'User'}
                        width={100}
                        height={100}
                    />
                    <h3>{user?.name}</h3>
                </div>
                <div className={styles.viewUserDetailsAdmin__container__bottom}>
                    <p>{user?.email}</p>
                    <p><FiPhone /> {user?.phone}</p>
                    <p><FaGlobeAmericas /> {user?.nationality}</p>
                    <p><FiUser />  {user?.age} yo</p>

                </div>
                <div className={styles.viewUserDetailsAdmin__container__lower}>
                    <button className={global.submitButton} style={{ color: "#1b1b1b", backgroundColor: "var(--accent-color)" }} onClick={() => deleteUser(user?._id ?? '')} aria-label="Delete User">Delete User</button>
                </div>
            </div>
        </motion.section>
    );
}

export default ViewUserDetailsAdmin;
