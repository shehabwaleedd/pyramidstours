'use client';
import React from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import styles from "./style.module.scss"

const CurrencyConverter: React.FC = () => {
    const { currency, setCurrency} = useCurrency();


    return (

        <div className={styles.select}> 
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="EGP">EGP</option>
            </select>
        </div>

    );
};

export default CurrencyConverter;
