import React, { useState } from 'react'
import styles from "./style.module.scss"
import Image from 'next/image'
import global from "@/app/page.module.scss"
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import useSubscriptionById from '@/lib/subscriptions/useSubscriptionById'
import { mobileVariants } from '@/animation/animate'
const SubscriptionDetails = ({ setSubscriptionOpen, subscriptionOpen, handleUserOpen }: { setSubscriptionOpen: (value: string | null) => void, subscriptionOpen: string, handleUserOpen: (userId: string) => void }) => {
    const { user } = useAuth();
    const { subscription, loading } = useSubscriptionById(subscriptionOpen);
    const slugifyTitle = (title: string) => {
        return title.toLowerCase().split(' ').join('-');
    }


    if (loading) return <p>Loading...</p>


    return (
        <motion.section className={`${styles.subscriptionDetails} ${global.bottomGlass}`} initial="initial" animate="animate" exit="exit" variants={mobileVariants}>
            <div className={styles.subscriptionDetails__upper}>
                <h1>Subscription Details</h1>
                <div>
                    <button onClick={() => setSubscriptionOpen(null)} aria-label="Close">
                        Close
                    </button>
                </div>
            </div>
            <div className={styles.subscriptionDetails__container} >
                <div className={styles.subscriptionDetails__container__upper}>
                    <div className={styles.subscriptionDetails__container__upper_lower}>
                        <div className={styles.twoGrid}>
                            <div className={styles.subscriptionDetails__container__upper_upper}>
                                <Image src={subscription?.tourDetails?.mainImg?.url || ""} alt="tour image" width={1080} height={900} />
                            </div>
                            <div className={styles.column}>
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
                                    {user?.role === "admin" && <button onClick={() => handleUserOpen(subscription?.userDetails?._id || '')} aria-label="View User" style={{ color: "red" }}>
                                        View User
                                    </button>}
                                </div>
                            </div>
                        </div>
                        <Link href={`/tours/${slugifyTitle(subscription?.tourDetails?.title || '')}`} aria-label="View Tour" className={global.submitButton}>
                            <span>View Tour</span>
                        </Link>
                    </div>
                </div>
            </div>

        </motion.section>
    )
}

export default SubscriptionDetails