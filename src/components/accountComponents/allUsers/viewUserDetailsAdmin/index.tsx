import React from 'react';
import { motion } from 'framer-motion';
import styles from "./style.module.scss";
import Image from 'next/image';
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdOutlineWorkOutline } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import axios from 'axios';
import { useUserById } from '@/lib/user/useUserById';
import global from "../../../../app/page.module.scss"
import { toast } from 'sonner';

interface ViewUserDetailsAdminProps {
    userOpen: string;
    setUserOpen: (id: string | null) => void;
}

const ViewUserDetailsAdmin: React.FC<ViewUserDetailsAdminProps> = ({ userOpen, setUserOpen }) => {
    const { user, loading } = useUserById(userOpen);


    const deleteUser = async (id: string) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this user?");
        if (isConfirmed) {
            try {
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token'),
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


    if (loading) return <p>Loading...</p>;

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`${styles.viewUserDetailsAdmin} ${global.centeredGlass}`}>
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
                    <p><IoLocationOutline /> {user?.country}, {user?.region}</p>
                    <p><MdOutlineWorkOutline /> {user?.company}</p>
                    <p><FiUser /> {user?.gender}, {user?.age} yo</p>

                </div>
                <div className={styles.viewUserDetailsAdmin__container__lower}>
                    <button style={{ color: "#c92a2a" }} onClick={() => deleteUser(user?._id ?? '')}aria-label="Delete User">Delete User</button>
                </div>
            </div>
        </motion.section>
    );
}

export default ViewUserDetailsAdmin;
