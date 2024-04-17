'use client'
import React from 'react'
import useUserSubscriptions from '@/lib/subscriptions/useUserSubscriptions'
import styles from './style.module.scss'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import SubscriptionDetails from '../subscriptionDetails'
import ViewUserDetailsAdmin from '../allUsers/viewUserDetailsAdmin'

const UserSubscriptions = () => {
    const { subscriptions, loading } = useUserSubscriptions();
    const [userOpen, setUserOpen] = React.useState<string | null>(null);
    const [tourOpen, setTourOpen] = React.useState<string | null>(null);
    const [subscriptionOpen, setSubscriptionOpen] = React.useState<string | null>(null);

    const handleUserOpen = (userId: string) => {
        setUserOpen(userId);
        setSubscriptionOpen(null);
    };

    const handleSubscriptionOpen = (subscriptionId: string) => {
        setSubscriptionOpen(subscriptionId);
        setUserOpen(null);
    };


    if (loading) return <p>Loading...</p>


    return (
        <section className={styles.subscriptions}>
            <div className={styles.subscriptions__container}>
                {subscriptions.map(subscription => (
                    <div key={subscription._id} className={styles.subscriptions__container__user} onClick={() => handleSubscriptionOpen(subscription._id)}>
                        <div className={styles.subscriptions__container__user_top}>
                            <Image
                                src={subscription.userDetails?.avatar?.url || '/user.png'}
                                alt={subscription.userDetails?.name || 'user'}
                                width={100}
                                height={100}
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent the subscription open handler
                                    handleUserOpen(subscription.userDetails._id);
                                }}
                            />
                            <h3>{subscription.userDetails?.name}</h3>
                        </div>
                        <div>
                            <p>
                                {subscription.tourDetails?.title.slice(0, 20)}...
                            </p>
                        </div>
                        <div>
                            {subscription?.payment === "pending" ? <p style={{ color: 'var(--accent-color)' }}>Pending</p> : <p style={{ color: 'var(--success-color)' }}>Paid</p>}
                            <p>{formatDistanceToNow(new Date(subscription?.createdAt), { addSuffix: true })}</p>
                        </div>
                    </div>
                ))}
            </div>
            {subscriptionOpen && (
                <SubscriptionDetails setSubscriptionOpen={setSubscriptionOpen} subscriptionOpen={subscriptionOpen} handleUserOpen={handleUserOpen} />
            )}
            {userOpen && (
                <ViewUserDetailsAdmin
                    setUserOpen={setUserOpen}
                    userOpen={userOpen}
                />
            )}
        </section>
    );
}

export default UserSubscriptions;
