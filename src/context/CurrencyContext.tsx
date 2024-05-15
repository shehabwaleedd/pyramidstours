'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import axios from 'axios';

interface CurrencyContextProps {
    currency: string;
    setCurrency: (currency: string) => void;
    rates: { [key: string]: number };
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currency, setCurrency] = useState<string>('USD');
    const [rates, setRates] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
                setRates(response.data.rates);
            } catch (error) {
                console.error('Failed to fetch currency rates', error);
            }
        };
        fetchRates();
    }, []);

    const contextValue = useMemo(() => ({ currency, setCurrency, rates }), [currency, rates]);

    return <CurrencyContext.Provider value={contextValue}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};
