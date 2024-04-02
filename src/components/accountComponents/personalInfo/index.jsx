'use client'
import React from 'react'
import styles from '@/app/account/page.module.scss'
import { motion } from 'framer-motion'
import Link from 'next/link'

const index = ({ user }) => {
    return (
        <motion.section className={styles.account__lower_right_content}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>

            <div className={styles.account__lower_right_content_top}>
                <h2>Personal Info</h2>
                <button>
                    <Link href={`/account/user/${user._id}/edit`}>
                        Edit
                    </Link>
                </button>
            </div>
            <div className={styles.account__lower_right_content_bottom}>
                <div className={styles.account__lower_right_content_bottom_content}>
                    <h3>Name</h3>
                    <p>{user.name}</p>
                </div>
                <div className={styles.account__lower_right_content_bottom_content}>
                    <h3>Email</h3>
                    <p>{user.email}</p>
                </div>
                <div className={styles.account__lower_right_content_bottom_content}>
                    <h3>Gender</h3>
                    <p>{user.gender}</p>
                </div>
                <div className={styles.account__lower_right_content_bottom_content}>
                    <h3>Phone</h3>
                    <p>{user.phone}</p>
                </div>
                <div className={styles.account__lower_right_content_bottom_content}>
                    <h3>Country</h3>
                    <p>{user.country}</p>
                </div>
                <div className={styles.account__lower_right_content_bottom_content}>
                    <h3>Region</h3>
                    <p>{user.region}</p>
                </div>
                <div className={styles.account__lower_right_content_bottom_content}>
                    <h3>Age</h3>
                    <p>{user.age}</p>
                </div>
                {user?.company && (
                    <div className={styles.account__lower_right_content_bottom_content}>
                        <h3>Company</h3>
                        <p>{user.company}</p>
                    </div>
                )}
                {user?.position && (
                    <div className={styles.account__lower_right_content_bottom_content}>
                        <h3>Position</h3>
                        <p>{user.position}</p>
                    </div>
                )}

            </div>
        </motion.section>
    )
}

export default index