'use client';
import { SubscriptionData } from '@/types/common';
import React, { useState } from 'react';
import styles from './style.module.scss';
import globalStyles from '../../app/page.module.scss';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useCurrency } from '@/context/CurrencyContext';
import Cookies from 'js-cookie';
import axios from 'axios';
import { mobileVariants } from '@/animation/animate';

const defaultImage = '/no-image.webp';

const currencySymbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    EGP: '£',
};

const Proceed = ({ data, setSubscriptionOpen }: { data: SubscriptionData, setSubscriptionOpen: (value: boolean) => void }) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { currency, rates } = useCurrency();

    const convertPrice = (price: number, toCurrency: string): string => {
        if (!rates[toCurrency]) return price.toFixed(2);
        return (price * rates[toCurrency]).toFixed(2);
    };

    const handlePaymentClick = async () => {
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/checkout-session/${data._id}`, {
                data,
                currency
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': Cookies.get('token') || '',
                }
            });

            if (response.status === 200 && response.data.data) {
                toast.success('Payment initiation successful, redirecting to payment page...');
                window.location.href = response.data.data.payment_data.redirectTo;
            } else {
                console.error('Failed to make payment:', response.data);
                toast.error('Payment initiation failed, please try again.');
            }
        } catch (error) {
            console.error('Failed to make payment:', error);
            toast.error('Payment initiation failed, please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const tourTitle = data.tourDetails?.title || 'No Title Available, Refresh the page';
    const currencySymbol = currencySymbols[currency] || '';

    const handleClose = () => {
        setSubscriptionOpen(false);
    };

    return (
        <motion.section className={`${styles.proceed} ${globalStyles.bottomGlass}`} 
            initial="initial"
            animate="animate"
            exit="exit"
            variants={mobileVariants}>
            <div className={styles.proceed__upper}>
                <h2>Your Order</h2>
                <button onClick={handleClose} className={styles.close_button}>close</button>
            </div>
            <div className={styles.group}>
                <Image src={data.tourDetails?.mainImg?.url || defaultImage} alt="tour image" width={200} height={200} />
                <div className={styles.proceed_column}>
                    <h3>{tourTitle}</h3>
                    <ul className={styles.group}>
                        <li>Time: {data.time},</li>
                        <li>{data.date},</li>
                        <li>{data.day}</li>
                    </ul>
                </div>
            </div>
            <div className={styles.proceed_column}>
                {data.adultPricing && (
                    <p>Adults: {data.adultPricing.adults} x {currencySymbol}{convertPrice(data.adultPricing.price, currency)} = {currencySymbol}{convertPrice(data.adultPricing.totalPrice, currency)}</p>
                )}
                {data.childrenPricing && (
                    <p>Children: {data.childrenPricing.children} x {currencySymbol}{convertPrice(data.childrenPricing.price, currency)} = {currencySymbol}{convertPrice(data.childrenPricing.totalPrice, currency)}</p>
                )}
                {data.options.map((option) => (
                    <div key={option._id} className={styles.group}>
                        <p>{option.name}</p>
                        <p>{option.number} x {currencySymbol}{convertPrice(option.price, currency)}</p>
                    </div>
                ))}
                <p style={{ color: "var(--accent-color)" }}>Total Price: {currencySymbol}{convertPrice(Number(data.totalPrice), currency)}</p>
            </div>
            <button onClick={handlePaymentClick} className={styles.proceed_button} disabled={isSubmitting}>
                {isSubmitting ? 'Processing Payment...' : 'Proceed to Payment'}
            </button>
        </motion.section>
    );
};

export default Proceed;
