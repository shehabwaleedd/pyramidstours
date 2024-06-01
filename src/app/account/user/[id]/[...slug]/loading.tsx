'use client';
import React from 'react';
import styles from './loading.module.scss';

const Loading = () => {
    return (
        <div className={styles.skeletonWrapper}>
            <div className={styles.skeletonContainer}>
                <div className={styles.skeletonIcon}></div>
                <div className={styles.skeletonText}></div>
                <div className={styles.skeletonDetails}>
                    <div className={styles.skeletonDetail}></div>
                    <div className={styles.skeletonDetail}></div>
                    <div className={styles.skeletonDetail}></div>
                    <div className={styles.skeletonDetail}></div>
                    <div className={styles.skeletonDetail}></div>
                </div>
                <div className={styles.skeletonButtons}>
                    <div className={styles.skeletonButton}></div>
                    <div className={styles.skeletonButton}></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
