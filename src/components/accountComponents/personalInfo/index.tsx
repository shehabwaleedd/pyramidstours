'use client'
import React from 'react'
import styles from '@/app/account/page.module.scss'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { User } from '@/types/hooks'
const PersonalInfo = ({ user } : { user: User }) => {
    return (
        <motion.section className={styles.account__lower_right_content}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>

            <div className={styles.account__lower_right_content_top}>
                <h2>Personal Info</h2>
                <button>
                    <Link href={`/account/user/${user._id}/edit`} aria-label="Edit personal info">
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
                    <p>{user.gender ?? "N/A"}</p>
                </div>
                <div className={styles.account__lower_right_content_bottom_content}>
                    <h3>Phone</h3>
                    <p>{user.phone}</p>
                </div>
                <div className={styles.account__lower_right_content_bottom_content}>
                    <h3>Nationality</h3>
                    <p>{user.nationality}</p>
                </div>
                <div className={styles.account__lower_right_content_bottom_content}>
                    <h3>Age</h3>
                    <p>{user.age}</p>
                </div>
            </div>
        </motion.section>
    )
}

export default PersonalInfo