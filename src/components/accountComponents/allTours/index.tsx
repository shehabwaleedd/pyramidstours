'use client'
import React, { useState, useEffect } from 'react';
import { useAllTours } from '@/lib/tours/useAllTours';
import DashboardTours from '@/components/dashboardTours';
import { useInView } from 'react-intersection-observer';
import styles from "../../dashboardTours/style.module.scss";

const AllTours = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { tours, loading, totalPages } = useAllTours(currentPage);
    const { ref, inView } = useInView({
        threshold: 1,
    });

    useEffect(() => {
        if (inView && !loading && currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    }, [inView, loading, currentPage, totalPages]);

    return (
        <section>
            <DashboardTours tours={tours} title="All Tours" loading={loading} />
            {currentPage < totalPages && (
                <div ref={ref} className={styles.loader}>
                    {loading && <p>Loading...</p>}
                </div>
            )}
        </section>
    );
}

export default AllTours;
