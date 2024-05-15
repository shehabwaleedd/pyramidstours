'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface CurrencyContextProps {
    currency: string;
    setCurrency: (currency: string) => void;
    rates: { [key: string]: number };
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currency, setCurrency] = useState<string>('USD');
    const [rates, setRates] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fetchRates = async () => {
            const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
            setRates(response.data.rates);
        };
        fetchRates();
    }, []);

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, rates }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};
