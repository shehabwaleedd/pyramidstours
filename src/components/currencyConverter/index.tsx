'use client';
import React from 'react';
import { useCurrency } from '@/context/CurrencyContext';

const CurrencyConverter: React.FC = () => {
    const { currency, setCurrency, isLoading, error } = useCurrency();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading exchange rates</div>;

    return (
        <div>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="EGP">EGP</option>
                <option value="SAR">SAR</option>
                <option value="MXN">MXN</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                <option value="AUD">AUD</option>
                <option value="CAD">CAD</option>
                <option value="CHF">CHF</option>
                <option value="CNY">CNY</option>
                <option value="INR">INR</option>
                <option value="BRL">BRL</option>
                <option value="ZAR">ZAR </option>
                <option value="RUB">RUB</option>
            </select>
        </div>
    );
};

export default CurrencyConverter;
