'use client'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import styles from './page.module.scss'
import Image from 'next/image'
import AdminView from '@/components/accountViews/admin'
import UserView from '@/components/accountViews/user'
import AllUsers from '@/components/accountComponents/allUsers'
import AllTours from '@/components/accountComponents/allTours'
import ForgotPassword from "@/components/accountComponents/forgetPassword"
import PersonalInfo from '@/components/accountComponents/personalInfo'
import ChangePasswordForm from '@/components/accountComponents/changePassword'
import CreateTour from './tours/createTour/page'
import { AnimatePresence } from 'framer-motion'
import UserSubscriptions from '@/components/accountComponents/userSubscriptions'
import Cookies from 'js-cookie'
const Account = () => {
    const { user, loading, setUser, handleLogout, isLoggedIn } = useAuth();
    const [activeSection, setActiveSection] = useState<string>('');

    const token = Cookies.get('token');

    const handleOpen = (sectionName: string) => () => {
        setActiveSection(sectionName);
    };


    const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!token) return;

        const formData = new FormData();
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            formData.append('avatar', event.currentTarget.files[0]);
        } else {
            return;
        }

        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/user `, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token,
                },
            });

            setUser((prevUser) => {
                if (prevUser) {
                    return { ...prevUser, avatar: response.data.avatar };
                }
                return prevUser;
            });

            console.log(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading || !user) return <div>Loading</div>;

    return (
        <main className={styles.account}>
            <div className={styles.account__upper}>
                <h1>Account</h1>
                <button onClick={handleLogout}>
                    <span>
                        Logout
                    </span>
                </button>
            </div>
            <div className={styles.account__lower}>
                <div className={styles.account__lower_left}>
                    <div className={styles.account__lower_left_upper}>
                        <div className={styles.account_lower_left_upper_top}>
                            <Image src={user?.avatar?.url ?? '/user.png'} alt="user" width={300} height={300} quality={100} priority={true} />
                        </div>

                        <div className={styles.account_lower_left_upper_middle}>
                            <input type="file" id="avatar" name="avatar" accept="image/*" onChange={handleAvatarChange} />
                            <label htmlFor="avatar">Change Profile Picture</label>
                        </div>

                        <div className={styles.account_lower_left_upper_bottom}>
                            <h2>{user?.name}</h2>
                        </div>
                    </div>
                    <div className={styles.account__lower_left_lower}>
                        {user?.role === 'admin' ? <AdminView handleOpen={handleOpen} /> : <UserView handleOpen={handleOpen} />}
                    </div>
                </div>

                <div className={styles.account__lower_right}>
                    <AnimatePresence mode='wait'>
                        {activeSection === 'personalInfo' && <PersonalInfo user={user} />}
                        {activeSection === 'changePassword' && <ChangePasswordForm />}
                        {activeSection === 'subscriptions' && <UserSubscriptions />}
                        {activeSection === 'createTour' && <CreateTour />}
                        {activeSection === 'tours' && <AllTours />}
                        {activeSection === 'users' && <AllUsers />}
                        {activeSection === 'forgotPassword' && <ForgotPassword />}
                        {activeSection === '' && <div className={styles.account__lower_right_default} style={{ padding: "1rem" }}><h2>Select a section to view</h2></div>}
                    </AnimatePresence>
                </div>

            </div>
        </main>
    )
}

export default Account