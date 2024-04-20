import React, { useState } from 'react'
import styles from "./style.module.scss"
import Image from 'next/image'
import { Option } from '@/types/common'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import useSubscriptionById from '@/lib/subscriptions/useSubscriptionById'
const SubscriptionDetails = ({ setSubscriptionOpen, subscriptionOpen, handleUserOpen }: { setSubscriptionOpen: (value: string | null) => void, subscriptionOpen: string, handleUserOpen: (userId: string) => void }) => {
    const { user } = useAuth();
    const { subscription, loading } = useSubscriptionById(subscriptionOpen);

    if (loading) return <p>Loading...</p>


    return (
        <motion.section className={styles.subscriptionDetails} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <div className={styles.subscriptionDetails__upper}>
                <h1>Subscription Details</h1>
                <div>
                    <button onClick={() => setSubscriptionOpen(null)}>
                        Close
                    </button>
                </div>
            </div>
            <div className={styles.subscriptionDetails__container} >
                <div className={styles.subscriptionDetails__container__upper}>
                    <div className={styles.subscriptionDetails__container__upper_upper}>
                        <Image src={subscription?.tourDetails?.mainImg?.url || ""} alt="tour image" width={1080} height={900} />
                    </div>
                    <div className={styles.subscriptionDetails__container__upper_lower}>
                        <h3>Tour Name: <span>{subscription?.tourDetails?.title}</span></h3>
                        <div className={styles.group}>
                            <p>Time: <span>{subscription?.time}</span></p>
                            <p>Date: <span>{subscription?.date ? new Date(subscription.date).toLocaleDateString() : ''}</span></p>
                            <p>Day: <span>{subscription?.day}</span></p>
                        </div>
                        <h3>Options:</h3>
                        {subscription?.options && subscription?.options.map(option => (
                            <div key={option._id} className={styles.group}>
                                <p>{option.name}</p>
                                <p>{option.number} x {option.price}</p>
                            </div>
                        ))}
                        <div className={styles.group}>
                            {subscription?.payment === "success" ? (
                                <p style={{ color: "var(--success-color)" }}>Status: Paid</p>
                            ) :
                                (
                                    <p style={{ color: "var(--accent-color)" }}>Status: Pending</p>
                                )}
                            <Link href={`/tours/${subscription?.tourDetails?._id}`} passHref>
                                <span>View Tour</span>
                            </Link>
                        </div>
                    </div>
                </div>
                {user?.role === "admin" && (
                    <div className={styles.subscriptionDetails__container__lower}>
                        <h2>Customer Details</h2>
                        <p>Name: <span> {subscription?.userDetails?.name} </span></p>
                        <p>Email: <span> {subscription?.userDetails?.email}</span> </p>
                        <p>Nationality: <span> {subscription?.userDetails?.nationality}</span> </p>

                        <button onClick={() => handleUserOpen(subscription?.userDetails?._id || '')}>
                            View User
                        </button>
                    </div>
                )}
            </div>

        </motion.section>
    )
}

export default SubscriptionDetails