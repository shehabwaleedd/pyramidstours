'use client'
import React, { useState } from 'react'
import { useAllTours } from '@/lib/tours/useAllTours';
import DashboardTours from '@/components/dashboardTours'
import styles from "../../dashboardTours/style.module.scss"

const AllTours = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { tours, loading } = useAllTours(currentPage);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };


    return (
        <section>
            <DashboardTours tours={tours} title="All Tours" loading={loading} />
            <div className={styles.pagination}>
                <button onClick={handlePreviousPage} disabled={currentPage <= 1}aria-label="Previous page">Previous</button>
                <span>Page {currentPage}</span>
                <button onClick={handleNextPage} disabled={!tours}aria-label="Next page">Next</button>
            </div>
        </section>
    )
}

export default AllTours