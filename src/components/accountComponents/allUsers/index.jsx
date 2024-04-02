'use client'

import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import useGetAllUsers from '@/lib/user/useGetAllUsers';
import styles from "./style.module.scss"
import { formatDistanceToNow } from 'date-fns'; // Import the function
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion'
import ViewUserDetailsAdmin from './viewUserDetailsAdmin';


const AllUsers = () => {

    const { users, getAllUsers: fetchAllUsers } = useGetAllUsers();
    const [userOpened, setUserOpened] = useState(null);

    const getAllUsers = useCallback(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);

    const handleUserOpen = (id) => {
        setUserOpened(id);
    };


    return (
        <>
            <section className={styles.allUsers}>
                <h2>All Users</h2>
                <section className={styles.allUsers}>
                    <div className={styles.allUsers__container}>
                        {Array.isArray(users) && users.map(user => (
                            <div key={user._id} className={styles.allUsers__container__user} onClick={() => handleUserOpen(user._id)}>
                                <div className={styles.allUsers__container__user_top}>
                                    <Image
                                        src={user.avatar?.url || '/user.png'}
                                        alt={user.name}
                                        width={100}
                                        height={100}
                                    />
                                    <h3>{user.name}</h3>
                                </div>
                                <div>
                                    <p>Joined: {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}</p>

                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <AnimatePresence>
                    {userOpened && (<ViewUserDetailsAdmin users={users} userOpened={userOpened} setUserOpened={setUserOpened} />)}
                </AnimatePresence >
            </section>
        </>
    )
}

export default AllUsers