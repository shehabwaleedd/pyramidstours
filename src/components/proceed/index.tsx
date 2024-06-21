'use client';
import { SubscriptionData } from '@/types/common';
import React, { useState } from 'react';
import styles from '@/components/accountComponents/subscriptionDetails/style.module.scss';
import global from "@/app/page.module.scss"
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
        <motion.section className={`${styles.subscriptionDetails} ${global.bottomGlass}`}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={mobileVariants}>
            <div className={styles.subscriptionDetails__upper}>
                <h2>Your Order</h2>
                <button onClick={handleClose} className={styles.close_button}>close</button>
            </div>
            <div className={styles.subscriptionDetails__container} >
                <div className={styles.subscriptionDetails__container__upper_lower}>
                    <div className={styles.twoGrid}>
                        <div className={styles.subscriptionDetails__container__upper_upper}>
                            <Image src={data.tourDetails?.mainImg?.url || defaultImage} alt="tour image" width={700} height={700} />
                        </div>
                        <div className={styles.column}>
                            <h3>{tourTitle}</h3>
                            <div className={styles.group}>
                                <p>Time: <span>{data?.time}</span></p>
                                <p>Date: <span>{data?.date}</span></p>
                                <p>Day: <span>{data?.day}</span></p>
                            </div>
                            <h4>Details:</h4>
                            <div className={styles.grids}>
                                {data.adultPricing && (
                                    <div className={styles.group}>
                                        <h5>
                                            Adults:
                                        </h5>
                                        <span>
                                            {data.adultPricing.adults} x {currencySymbol}{convertPrice(data.adultPricing.price, currency)} = {currencySymbol}{convertPrice(data.adultPricing.totalPrice, currency)}
                                        </span>
                                    </div>
                                )}
                                {data.childrenPricing && (
                                    <div className={styles.group}>
                                        <h5>
                                            Children:
                                        </h5>
                                        <span>
                                            {data.childrenPricing.children} x {currencySymbol}{convertPrice(data.childrenPricing.price, currency)} = {currencySymbol}{convertPrice(data.childrenPricing.totalPrice, currency)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className={styles.ThreeGrids}>
                                {data.options.map((option) => (
                                    <div key={option._id} className={styles.group}>
                                        <h5>{option.name}</h5>
                                        <p>{option.number} x {currencySymbol}{convertPrice(option.price, currency)}</p>
                                    </div>
                                ))}
                            </div>
                            <p style={{ color: "var(--accent-color)" }}>Total Price: {currencySymbol}{convertPrice(Number(data.totalPrice), currency)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handlePaymentClick} disabled={isSubmitting} className={global.submitButton}>
                {isSubmitting ? 'Processing Payment...' : 'Proceed to Payment'}
            </button>
        </motion.section>
    );
};

export default Proceed;
