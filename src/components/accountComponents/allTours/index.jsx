import React from 'react'
import { useAllTours } from '@/lib/tours/useAllTours';
import DashboardTours from '@/components/dashboardTours'

const AllTours = () => {
    const { tours, getAllTours, loading } = useAllTours();

    return (
        <DashboardTours tours={tours} refreshEvents={getAllTours} title="All Tours" loading={loading} />
    )
}

export default AllTours