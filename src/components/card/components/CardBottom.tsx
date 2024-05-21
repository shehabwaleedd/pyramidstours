'use client'
import React from 'react'
import { useCurrency } from '@/context/CurrencyContext';
import styles from "../style.module.scss"
import { TourType } from '@/types/homePageTours';

const currencySymbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    EGP: '£',
    SAR: '﷼',
    MXN: '$',
    GBP: '£',
    JPY: '¥',
    AUD: 'A$',
    CAD: 'C$',
    CHF: 'CHF',
    CNY: '¥',
    INR: '₹',
    BRL: 'R$',
    ZAR: 'R',
    RUB: '₽',
};


const CardBottom = ({ tour }: { tour: TourType }) => {
    const { currency, rates } = useCurrency();
    const originalPriceUSD = parseFloat(String(tour.adultPricing.find((p) => p.adults === 1)?.price ?? '0'));
    const increasedPriceUSD = tour.hasOffer ? originalPriceUSD * 1.15 : originalPriceUSD;
    const roundedPriceUSD = Math.round(increasedPriceUSD / 5) * 5;

    const convertPrice = (price: number, toCurrency: string) => {
        if (!rates[toCurrency]) return price;
        return (price * rates[toCurrency]).toFixed(2);
    };

    const originalPrice = convertPrice(originalPriceUSD, currency);
    const displayPrice = convertPrice(increasedPriceUSD, currency);
    const roundedPrice = convertPrice(roundedPriceUSD, currency);

    const currencySymbol = currencySymbols[currency] || '';
    return (
        <div className={styles.bottom_group}>
            {tour.hasOffer ? (
                <>
                    <span>
                        From {currencySymbol}
                        <span style={{ textDecoration: 'line-through' }}>{roundedPrice}</span>
                    </span>
                    <span>
                        {currencySymbol}
                        {displayPrice}
                    </span>
                </>
            ) : (
                <span>
                    From {currencySymbol}
                    {originalPrice}
                </span>
            )}
            <span>{tour.location.to}</span>
        </div>
    )
}

export default CardBottom