'use client'
import React from 'react'
import styles from "../page.module.scss"
import { useCurrency } from '@/context/CurrencyContext';
import { TourType } from '@/types/homePageTours';

const currencySymbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    EGP: '£',
};

const Prices = ({ tour }: { tour: TourType }) => {
    const { currency, rates } = useCurrency();

    return (
        <div className={styles.eventDetails__lower_right_exclusionsAndInclusions}>
            <div className={styles.eventDetails__lower_right_exclusionsAndInclusions__inclusions}>
                <h2>Adults</h2>
                <ul className={styles.group}>
                    {tour?.adultPricing?.map((pricing, index) => (
                        <li key={index}>
                            {pricing.adults} {index === 0 ? 'Adult' : 'Adults'}: {currencySymbols[currency]}{pricing.price * rates[currency]},
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.eventDetails__lower_right_exclusionsAndInclusions__exclusions}>
                <h2>Children</h2>
                <ul className={styles.group}>
                    {tour?.childrenPricing?.map((pricing, index) => (
                        <li key={index}>
                            {pricing.children} {index === 0 ? 'Child' : 'Children'}: {currencySymbols[currency]}{pricing.price * rates[currency]},
                        </li>
                    ))}
                </ul>
            </div>
        </div>)
}

export default Prices