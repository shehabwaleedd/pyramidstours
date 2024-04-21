'use client'
import { SubscriptionData } from '@/types/common'
import React, { useState } from 'react'
import styles from "./style.module.scss"
import globalStyles from "../../app/page.module.scss"
import axios from 'axios'
import Image from 'next/image'
import { motion } from 'framer-motion'
const defaultImage = '/no-image.webp';

const Proceed = ({ data, setSubscriptionOpen }: { data: SubscriptionData, setSubscriptionOpen: (value: boolean) => void }) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const handlePaymentClick = async () => {
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/checkout-session/${data._id}`, { data },
                { headers: { token: localStorage.getItem('token') } })
            if (response.data && response.data.redirectTo) {
                window.location.href = response.data.redirectTo;
            }
        } catch (error) {
            console.error('Failed to make payment:', error)
            alert('Payment initiation failed, please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    const tourTitle = data.tourDetails?.title || 'No Title Available, Refresh the page';



    const handleClose = () => {
        setSubscriptionOpen(false);
    }



    return (
        <motion.section className={`${styles.proceed} ${globalStyles.bottomGlass}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <div className={styles.proceed__upper}>
                <h2>Your Order</h2>
                <button onClick={handleClose} className={styles.close_button}>close</button>
            </div>
            <div className={styles.group}>
                <Image src={data.tourDetails?.mainImg?.url || defaultImage} alt="tour image" width={200} height={200} />
                <div className={styles.proceed_column}>
                    <h3> {tourTitle}</h3>
                    <ul className={styles.group}>
                        <li>Time:{data.time},</li>
                        <li>{data.date},</li>
                        <li>{data.day}</li>
                    </ul>
                </div>
            </div>
            <div className={styles.proceed_column}>
                {data.adultPricing && <p>Adults: {data.adultPricing.adults} x {data.adultPricing.price} = {data.adultPricing.totalPrice}</p>}
                {data.childrenPricing && <p>Children: {data.childrenPricing.children} x {data.childrenPricing.price} = {data.childrenPricing.totalPrice}</p>}
                {data.options.map((option) => (
                    <div key={option._id} className={styles.group}>
                        <p>{option.name}</p>
                        <p>{option.number} x {option.price}</p>
                    </div>
                ))}
                <p style={{ color: "var(--accent-color)" }}>Total Price: {data.totalPrice}</p>
            </div>
            <button onClick={handlePaymentClick} className={styles.proceed_button} disabled={isSubmitting}>
                {isSubmitting ? 'Processing Payment...' : 'Proceed to Payment'}
            </button>
        </motion.section>
    )
}

export default Proceed