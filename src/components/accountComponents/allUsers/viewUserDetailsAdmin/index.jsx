import React from 'react'
import { motion } from 'framer-motion'
import styles from "./style.module.scss"
import Image from 'next/image';
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdOutlineWorkOutline } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import useGetAllUsers from '@/lib/user/useGetAllUsers';


import axios from 'axios';

const ViewUserDetailsAdmin = ({ users, userOpened, setUserOpened }) => {
    const { getAllUsers } = useGetAllUsers();

    const convertUserRole = async (id, newRole) => {
        const roleConfirmationMessage = `Are you sure you want to convert this ${newRole === "admin" ? "user to admin" : "admin to user"}?`;
        const isConfirmed = window.confirm(roleConfirmationMessage);
        if (isConfirmed) {
            try {
                // send data as raw in body and send token in headers
                const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/convertUserRole/${id}`, { role: newRole }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token'),
                    },
                });


                if (response.status === 200) {
                    alert(`User has been converted to ${newRole}.`);
                    setUserOpened(null);
                    getAllUsers();
                }
            } catch (error) {
                console.error(error);
                alert(`Failed to convert to ${newRole}, please try again later.`);
            }
        }
    };

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
                    Alert("User has been deleted");
                    setUserOpened(null);
                }
            }
            catch (error) {
                console.log(error);
                Alert("Failed to delete user, please try again later");
            }
        }
    }



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
                    <button onClick={() => setUserOpened(null)}>X</button>
                </div>
                <div className={styles.viewUserDetailsAdmin__container__top}>
                    <Image
                        src={users.find(user => user._id === userOpened).avatar?.url || '/user.png'}
                        alt={users.find(user => user._id === userOpened).name}
                        width={100}
                        height={100}
                    />
                    <h3>{users.find(user => user._id === userOpened).name}</h3>
                </div>
                <div className={styles.viewUserDetailsAdmin__container__bottom}>
                    <p>{users.find(user => user._id === userOpened).email}</p>
                    <p><FiPhone /> {users.find(user => user._id === userOpened).phone}</p>
                    <p><IoLocationOutline /> {users.find(user => user._id === userOpened).country}, {users.find(user => user._id === userOpened).region}</p>
                    <p><MdOutlineWorkOutline /> {users.find(user => user._id === userOpened).company}</p>
                    <p><FiUser /> {users.find(user => user._id === userOpened).gender},{users.find(user => user._id === userOpened).age} yo</p>
                </div>
                <div className={styles.viewUserDetailsAdmin__container__lower}>
                    {users.find(user => user._id === userOpened).role === "user" ? (
                        <button onClick={() => convertUserRole(userOpened, "admin")}>Convert to Admin</button>
                    ) : (
                        <button onClick={() => convertUserRole(userOpened, "user")}>Convert to User</button>
                    )}
                    <button style={{color: "#c92a2a"}} onClick={() => deleteUser(userOpened)}>Delete User</button>
                </div>
            </div>
        </motion.section>
    )
}

export default ViewUserDetailsAdmin