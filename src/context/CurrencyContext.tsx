'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface CurrencyContextType {
    currency: string;
    setCurrency: React.Dispatch<React.SetStateAction<string>>;
    rates: { [key: string]: number };
    isLoading: boolean;
    error: Error | null;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};

interface CurrencyProviderProps {
    children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
    const [currency, setCurrency] = useState<string>('USD');
    const [rates, setRates] = useState<{ [key: string]: number }>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
                setRates(response.data.rates);
                setIsLoading(false);
            } catch (err) {
                setError(err as Error);
                setIsLoading(false);
            }
        };

        fetchExchangeRates();
    }, []);

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, rates, isLoading, error }}>
            {children}
        </CurrencyContext.Provider>
    );
};
