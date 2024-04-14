import React from 'react';
import { motion } from 'framer-motion';
import styles from "./style.module.scss";
import Image from 'next/image';
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdOutlineWorkOutline } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import useGetAllUsers from '@/lib/user/useGetAllUsers';
import axios from 'axios';

const ViewUserDetailsAdmin = ({ userOpen, setUserOpen }) => {
    const { users, loading } = useGetAllUsers();
    const currentUser = users.find(user => user._id === userOpen);

    const deleteUser = async (id) => {
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
                    alert("User has been deleted");
                    setUserOpen(null);
                }
            }
            catch (error) {
                console.log(error);
                alert("Failed to delete user, please try again later");
            }
        }
    }


    if (!currentUser) return <p>User not found.</p>;
    if (loading) return <p>Loading...</p>;
    if (!users) return <p>No users available.</p>;

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.viewUserDetailsAdmin}
        >
            <div className={styles.viewUserDetailsAdmin__container}>
                <div className={styles.viewUserDetailsAdmin__container__close}>
                    <button onClick={() => setUserOpen(null)}>X</button>
                </div>
                <div className={styles.viewUserDetailsAdmin__container__top}>
                    <Image
                        src={currentUser.avatar?.url || '/user.png'}
                        alt={currentUser.name || 'User'}
                        width={100}
                        height={100}
                    />
                    <h3>{currentUser.name}</h3>
                </div>
                <div className={styles.viewUserDetailsAdmin__container__bottom}>
                    <p>{currentUser.email}</p>
                    <p><FiPhone /> {currentUser.phone}</p>
                    <p><IoLocationOutline /> {currentUser.country}, {currentUser.region}</p>
                    <p><MdOutlineWorkOutline /> {currentUser.company}</p>
                    <p><FiUser /> {currentUser.gender}, {currentUser.age} yo</p>
                </div>
                <div className={styles.viewUserDetailsAdmin__container__lower}>
                    <button style={{ color: "#c92a2a" }} onClick={() => deleteUser(currentUser._id)}>Delete User</button>
                </div>
            </div>
        </motion.section>
    );
}

export default ViewUserDetailsAdmin;
