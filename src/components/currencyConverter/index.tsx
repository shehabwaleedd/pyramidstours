'use client';
import React, { useEffect } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import styles from "./style.module.scss"
import { motion, AnimatePresence } from 'framer-motion';

const CurrencyConverter = ({ convertOpen, setConvertOpen }: { convertOpen: boolean; setConvertOpen: (value: boolean) => void; }) => {
    const { currency, setCurrency } = useCurrency();

    useEffect(() => {
        setConvertOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);
    
    return (

        <>
            <button onClick={() => setConvertOpen(!convertOpen)} className={styles.currency_converter}>
                {currency}
            </button>
            <AnimatePresence>
                {convertOpen && (
                    <motion.div className={styles.currency_converter__dropdown}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <button onClick={() => setCurrency('USD')}>USD</button>
                        <button onClick={() => setCurrency('EUR')}>EUR</button>
                        <button onClick={() => setCurrency('EGP')}>EGP</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>

    );
};

export default CurrencyConverter;
