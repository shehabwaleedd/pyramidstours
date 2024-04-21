'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import Loading from '../../../../../animation/loading/Loading';
import styles from './page.module.scss';
import { useUserEvents } from '../../../../../context/events/useUserEvents';
import DashboardEvents from '../../../../../components/dashboardEvents';
import { useAuth } from '../../../../../context/AuthContext';
import NoEvents from '../../../../../components/accountComponents/noEvents';

const UserEventsPage = () => {
    const { userId } = useAuth();
    const { events, loading, refreshEvents } = useUserEvents(userId);
    const router = useRouter();
    const handleBackToAccount = () => {
        router.push("/account")
    }

    if (loading) return <Loading height={100} />

    if (events.length === 0) return <NoEvents />

    return (
        <div className={styles.userEvents}>
            <div className={styles.userEvents__upper}>
                <h1>My Events</h1>
                <button onClick={handleBackToAccount}>
                    <span>
                        Back to account
                    </span>
                </button>
            </div>
            <div className={styles.userEvents__lower}>
                <DashboardEvents events={events} loading={loading} refreshEvents={refreshEvents} />
            </div>
        </div>
    )
}

export default UserEventsPage