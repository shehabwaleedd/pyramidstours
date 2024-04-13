'use client'
import React from 'react'
import useUserSubscriptions from '@/lib/tours/useUserSubscriptions'
import { useAuth } from '@/context/AuthContext'
import styles from './style.module.scss'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'

const UserSubscriptions = () => {
    const { userId } = useAuth();
    const { subscriptions, loading, error } = useUserSubscriptions(userId);
    const [userOpen, setUserOpen] = React.useState<string | null>(null);

    const handleUserOpen = (userId: string) => {
        setUserOpen(userId);
    };


    console.log(subscriptions, 'subscriptions');
    return (
        <section className={styles.subscriptions}>
            <div className={styles.subscriptions__container}>
                {subscriptions.map(subscription => (
                    <div key={subscription._id} className={styles.subscriptions__container__user} onClick={() => handleUserOpen(user._id)}>
                        <div className={styles.subscriptions__container__user_top}>
                            <Image
                                src={subscription.userDetails?.avatar?.url || '/user.png'}
                                alt={subscription.userDetails?.name || 'user'}
                                width={100}
                                height={100}
                            />
                            <h3>{subscription.userDetails?.name}</h3>
                        </div>

                        <div>
                            <p>
                                {subscription.tourDetails?.title.slice(0,20)}...
                            </p>
                        </div>
                        <div>
                            {subscription?.payment === "pending" ? <p style={{ color: 'var(--accent-color)' }}>Pending</p> : <p style={{ color: 'var(--success-color)' }}>Paid</p>}
                            <p>{formatDistanceToNow(new Date(subscription?.createdAt), { addSuffix: true })}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default UserSubscriptions;
