'use client'
import React from 'react'
import { useUserEvents } from '@/context/events/useUserEvents'
import DashboardEvents from '@/components/dashboardTours'
import { useAuth } from '@/context/AuthContext'


const UserEvents = () => {
    const { userId } = useAuth();
    const { events, loading, refreshEvents } = useUserEvents(userId);


    return (
        <DashboardEvents events={events} loading={loading} refreshEvents={refreshEvents} title="My Events" />
    );
}

export default UserEvents;
