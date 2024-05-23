'use client';
import React, { useReducer, useMemo } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { Formik, Form, FormikHelpers } from 'formik';
import { AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import styles from '../page.module.scss';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency } from '@/context/CurrencyContext';
import Available from './chunks/Available';
import Participants from './chunks/Participants';
import Options from './chunks/Options';
import { TourType } from '@/types/homePageTours';
import { SubscriptionData } from '@/types/common';
import 'react-calendar/dist/Calendar.css';
const Proceed = dynamic(() => import('@/components/proceed'));
const LoginForm = dynamic(() => import('@/components/loginForm/loginForm'));
const Calendar = dynamic(() => import('react-calendar'), { ssr: false });

const currencySymbols: { [key: string]: string } = { USD: '$', EUR: '€', EGP: '£' };

interface BookingData {
    adultPricing: string | null;
    childrenPricing?: string | null;
    time: string;
    date: string;
    day: string;
    options?: Array<{ id: string; number: string }>;
}

interface FormValues {
    date: Date | [Date | null, Date | null];
    adults: number;
    children: number;
    selectedOptions: { [optionId: string]: { id: string, number: number } };
    repeatTime: string;
    day: string;
    repeatDays: string;
}

interface State {
    subscriptionData: SubscriptionData | null;
    isSubmitting: boolean;
    optionCounts: { [key: string]: number };
    subscriptionOpen: boolean;
    errorMessage: string;
}

type Action =
    | { type: 'SET_SUBSCRIPTION_DATA'; payload: SubscriptionData }
    | { type: 'SET_IS_SUBMITTING'; payload: boolean }
    | { type: 'SET_OPTION_COUNTS'; payload: { id: string; count: number } }
    | { type: 'TOGGLE_SUBSCRIPTION_OPEN' }
    | { type: 'SET_ERROR_MESSAGE'; payload: string };

const initialState: State = {
    subscriptionData: null,
    isSubmitting: false,
    optionCounts: {},
    subscriptionOpen: false,
    errorMessage: ''
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_SUBSCRIPTION_DATA':
            return { ...state, subscriptionData: action.payload, subscriptionOpen: true };
        case 'SET_IS_SUBMITTING':
            return { ...state, isSubmitting: action.payload };
        case 'SET_OPTION_COUNTS':
            return { ...state, optionCounts: { ...state.optionCounts, [action.payload.id]: action.payload.count } };
        case 'TOGGLE_SUBSCRIPTION_OPEN':
            return { ...state, subscriptionOpen: !state.subscriptionOpen };
        case 'SET_ERROR_MESSAGE':
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};

const LeftColumn: React.FC<{ tour: TourType }> = ({ tour }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { isLoginOpen, setIsLoginOpen } = useWishlist();
    const { currency, rates } = useCurrency();

    const initialValues: FormValues = useMemo(() => ({
        date: new Date(),
        adults: 1,
        children: 0,
        selectedOptions: {},
        repeatTime: '8',
        day: 'Sunday',
        repeatDays: '',
    }), []);

    const handleDateChange = (date: Date) => {
        const correctedDate = new Date(date);
        correctedDate.setHours(12);
        return correctedDate;
    };

    const handleIncrement = (optionId: string) => {
        dispatch({ type: 'SET_OPTION_COUNTS', payload: { id: optionId, count: (state.optionCounts[optionId] || 0) + 1 } });
    };

    const handleDecrement = (optionId: string) => {
        dispatch({ type: 'SET_OPTION_COUNTS', payload: { id: optionId, count: Math.max(0, (state.optionCounts[optionId] || 0) - 1) } });
    };

    const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        const token = Cookies.get('token');
        if (!token) {
            setIsLoginOpen(true);
            return;
        }

        dispatch({ type: 'SET_IS_SUBMITTING', payload: true });

        if (!(values.date instanceof Date)) {
            console.error('Invalid date object');
            dispatch({ type: 'SET_IS_SUBMITTING', payload: false });
            return;
        }
        const formattedDate = values.date.toISOString().split('T')[0];
        const adultPricing = tour?.adultPricing.slice().reverse().find(pricing => pricing.adults <= values.adults)?._id;
        const childrenPricing = values.children > 0
            ? tour?.childrenPricing.slice().reverse().find(pricing => pricing.children <= values.children)?._id
            : '';

        const selectedOptions = Object.entries(state.optionCounts)
            .filter(([_, count]) => count > 0)
            .map(([id, count]) => ({ id, number: count.toString() }));

        const bookingData: BookingData = {
            adultPricing: adultPricing ?? null,
            time: values.repeatTime + ':00' || "8:00",
            date: formattedDate,
            day: values.repeatDays || "Sunday",
        };

        if (childrenPricing) {
            bookingData.childrenPricing = childrenPricing;
        }
        if (selectedOptions.length > 0) {
            bookingData.options = selectedOptions;
        }
        try {
            const response = await fetch(`/api/subscription?tourId=${tour._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token || '',
                },
                body: JSON.stringify(bookingData),
            });

            const responseData = await response.json();

            if (response.status === 200 && responseData.message === "Subscription created successfully") {
                dispatch({ type: 'SET_SUBSCRIPTION_DATA', payload: responseData.data });
                toast.success('Subscription created successfully');
            } else {
                toast.error('Subscription failed, Try Again.');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.err || error.response?.err);
        } finally {
            dispatch({ type: 'SET_IS_SUBMITTING', payload: false });
            setSubmitting(false);
        }
    };

    const convertPrice = (price: number, toCurrency: string): string => {
        if (!rates[toCurrency]) return price.toFixed(2);
        return (price * rates[toCurrency]).toFixed(2);
    };

    const calculateTotalCost = useMemo(() => {
        return (values: FormValues): string => {
            let total = 0;

            if (tour) {
                const adultPricingTier = tour?.adultPricing?.find(pricing => pricing.adults >= values.adults);
                if (adultPricingTier) {
                    total += parseFloat(convertPrice(parseFloat(adultPricingTier.price.toString()), currency)) * values.adults;
                }
                if (values.children > 0) {
                    const childPricingTier = tour.childrenPricing.find(pricing => pricing.children >= values.children);
                    if (childPricingTier) {
                        total += parseFloat(convertPrice(parseFloat(childPricingTier.price.toString()), currency)) * values.children;
                    }
                }

                Object.entries(state.optionCounts).forEach(([optionId, count]) => {
                    const option = tour.options.find(o => o._id === optionId);
                    if (option) {
                        total += parseFloat(convertPrice(parseFloat(option.price), currency)) * count;
                    }
                });
            }

            return total.toFixed(2);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tour, state.optionCounts, currency, rates]);

    const currencySymbol = currencySymbols[currency] || '';

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values }) => (
                    <Form className={styles.eventDetails__lower_left}>
                        <h2>Tailor Your Tour</h2>
                        <Calendar onChange={(value) => setFieldValue('date', handleDateChange(value as Date))} value={values.date} minDate={new Date()} className={styles.calendar} />
                        <Available tour={tour} />
                        <Participants tour={tour} values={values} setFieldValue={setFieldValue} />
                        <Options tour={tour} optionCounts={state.optionCounts} handleIncrement={handleIncrement} handleDecrement={handleDecrement} currency={currency} currencySymbol={currencySymbol} convertPrice={convertPrice} />
                        <div className={styles.headGroup}>
                            <div>
                                <h2>Total Price: {currencySymbol}{calculateTotalCost(values)}</h2>
                            </div>
                        </div>
                        <button type="submit" className={styles.submitButton} disabled={state.isSubmitting} aria-label="Book now button">
                            {state.isSubmitting ? 'Booking...' : 'Book Now'}
                        </button>
                        <p style={{ color: "var(--accent-color)" }}>Note: Infants under 6 years old are free of charge.</p>
                        <p>Note: The total cost of the tour is calculated by summing up the prices based on the number of adults and children, each multiplied by their respective pricing tiers, and adding the cost of any selected additional options.</p>
                    </Form>
                )}
            </Formik>
            <AnimatePresence mode='wait'>
                {state.subscriptionOpen && state.subscriptionData && (<Proceed data={state.subscriptionData} setSubscriptionOpen={() => dispatch({ type: 'TOGGLE_SUBSCRIPTION_OPEN' })} />)}
            </AnimatePresence>
            <AnimatePresence mode='wait'>
                {isLoginOpen && <LoginForm setIsLoginOpen={setIsLoginOpen} isLoginOpen={isLoginOpen} />}
            </AnimatePresence>
        </>
    );
};

export default LeftColumn;
