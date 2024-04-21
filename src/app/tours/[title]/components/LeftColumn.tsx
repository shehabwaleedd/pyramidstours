'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@/context/AuthContext';
import Calendar from 'react-calendar';
import { TourType } from '@/types/homePageTours';
import { SubscriptionData } from '@/types/common';
import { Formik, Form, Field, } from 'formik';
import styles from "../page.module.scss"
import Proceed from '@/components/proceed';
import LoginForm from '@/components/loginForm/loginForm';
import { AnimatePresence } from 'framer-motion';
import 'react-calendar/dist/Calendar.css';


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
const LeftColumn = ({ tour }: { tour: TourType }) => {
    const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [optionCounts, setOptionCounts] = useState<{ [key: string]: number }>({});
    const [subscriptionOpen, setSubscriptionOpen] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const { isLoginOpen, setIsLoginOpen } = useAuth();
    const initialValues: FormValues = {
        date: new Date(),
        adults: 1,
        children: 0,
        selectedOptions: {},
        repeatTime: '8',
        day: 'Sunday',
        repeatDays: '',
    };


    const handleDateChange = (date: Date | [Date | null, Date | null] | null): Date => {
        if (date instanceof Date) {
            return date;
        } else if (Array.isArray(date) && date[0] instanceof Date) {
            return date[0];
        }
        return new Date(); // Default to current date if the provided date is invalid
    };


    const handleIncrement = (optionId: string) => {
        setOptionCounts(prev => ({
            ...prev,
            [optionId]: (prev[optionId] || 0) + 1
        }));
    };

    const handleDecrement = (optionId: string) => {
        setOptionCounts(prev => ({
            ...prev,
            [optionId]: Math.max(0, (prev[optionId] || 0) - 1)
        }));
    };


    const handleSubmit = async (values: FormValues) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoginOpen(true);
            return;
        }

        setErrorMessage('');
        const formattedDate = values.date instanceof Date ? values.date.toISOString().split('T')[0] : "";
        const adultPricing = tour?.adultPricing.slice().reverse().find(pricing => pricing.adults <= values.adults)?._id;
        const childrenPricing = values.children > 0
            ? tour?.childrenPricing.slice().reverse().find(pricing => pricing.children <= values.children)?._id
            : '';

        const selectedOptions = Object.entries(optionCounts)
            .filter(([_, count]) => count > 0)
            .map(([id, count]) => ({
                id,
                number: count.toString()
            }));

        // Initialize bookingData with properties that are always needed
        const bookingData: BookingData = {
            adultPricing: adultPricing ?? null,
            time: values.repeatTime + ':00' || "8:00",
            date: formattedDate,
            day: values.repeatDays || "Sunday",
        };

        // Only add childrenPricing if it exists
        if (childrenPricing) {
            bookingData.childrenPricing = childrenPricing;
        }
        if (selectedOptions.length > 0) {
            bookingData.options = selectedOptions;
        }

        console.log(adultPricing, childrenPricing, bookingData)

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/subscription/${tour?._id}`, bookingData,
                { headers: { token } }
            );
            if (response.data.message === "Subscription created successfully") {
                setSubscriptionData(response.data.data);
                setSubscriptionOpen(true);
            } else {
                setErrorMessage("Failed to create subscription: " + response.data.err);
            }

        } catch (error: any) {
            setErrorMessage(error.response?.data?.err || error.response?.err);
        }
    };

    function calculateTotalCost(values: FormValues, tour: TourType | null, optionCounts: { [key: string]: number }) {
        let total = 0;

        if (tour) {
            // Base cost calculation for adults
            const adultPricingTier = tour?.adultPricing?.find(pricing => pricing.adults >= values.adults);
            if (adultPricingTier) {
                total += adultPricingTier.price * values.adults; // Base adult cost: price per adult * number of adults
            }

            // Base cost calculation for children
            if (values.children > 0) {
                const childPricingTier = tour.childrenPricing.find(pricing => pricing.children >= values.children);
                if (childPricingTier) {
                    total += childPricingTier.price * values.children; // Base child cost: price per child * number of children
                }
            }

            Object.entries(optionCounts).forEach(([optionId, count]) => {
                const option = tour.options.find(o => o._id === optionId);
                if (option) {
                    total += parseFloat(option.price) * count; // Option cost
                }
            });
        }

        return total;
    }

    return (
        <>
            <Formik initialValues={initialValues}
                onSubmit={(values, { setSubmitting }) => {
                    setIsSubmitting(true);
                    handleSubmit(values).finally(() => {
                        setIsSubmitting(false);
                        setSubmitting(false);
                    });
                }}
            >
                {({ setFieldValue, values }) => {
                    return (
                        <Form className={styles.eventDetails__lower_left}>
                            <h2> Tailor Your Tour</h2>
                            <Calendar
                                onChange={value => setFieldValue('date', handleDateChange(value))}
                                value={values.date} minDate={new Date()} className={styles.calendar} />
                            <div className={styles.headGroup}>
                                <h2>Tour Available in</h2>
                                <div className={styles.group}>
                                    <div className={styles.group}>
                                        <Field as="select" name="repeatTime" className={styles.Field}>
                                            {tour?.repeatTime?.map((time, index) => (
                                                <option key={index} value={time}>{time}:00</option>
                                            ))}
                                        </Field>
                                        <Field as="select" name="repeatDays" className={styles.Field}>
                                            {tour?.repeatDays?.map((day, index) => (
                                                <option key={index} value={day}>{day}</option>
                                            ))}
                                        </Field>
                                    </div>
                                </div>
                                <div className={styles.headGroup}>
                                    <div className={styles.group}>
                                        <label>Number of Adults</label>
                                        <Field type="number" name="adults" min={1} max={tour?.adultPricing?.length} readOnly />
                                        <div className={styles.incrementBtns}>
                                            <button type="button" onClick={() => setFieldValue('adults', values.adults + 1)}>+</button>
                                            <button type="button" onClick={() => setFieldValue('adults', Math.max(1, values.adults - 1))}>-</button>
                                        </div>
                                    </div>
                                    <div className={styles.group}>
                                        <label>Number of Children</label>
                                        <Field type="number" name="children" min={0} max={tour?.childrenPricing?.length} readOnly />
                                        <div className={styles.incrementBtns}>
                                            <button type="button" onClick={() => setFieldValue('children', values.children + 1)}>+</button>
                                            <button type="button" onClick={() => setFieldValue('children', Math.max(0, values.children - 1))}>-</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.eventDetails__lower_left_options}>
                                <div className={styles.eventDetails__lower_left_options__header}>
                                    <h2>Options</h2>
                                </div>
                                <div className={styles.headGroup}>
                                    {tour?.options?.map(option => (
                                        <div key={option._id} className={styles.column}>
                                            <span>{option.name} - ${option.price}</span>
                                            <div className={styles.incrementBtns_group}>
                                                <input
                                                    type="number"
                                                    value={optionCounts[option._id] || 0}
                                                    readOnly
                                                />
                                                <div className={styles.incrementBtns}>
                                                    <button type="button" onClick={() => handleIncrement(option._id)}>+</button>
                                                    <button type="button" onClick={() => handleDecrement(option._id)}>-</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>


                            </div>

                            <div className={styles.headGroup}>
                                <div>
                                    <h2>Total Price: ${calculateTotalCost(values, tour, optionCounts)}</h2>
                                </div>
                            </div>
                            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
                            <button type="submit" className={styles.submitButton} disabled={isSubmitting}> {isSubmitting ? 'Booking...' : 'Book Now'}</button>
                            <p>Note: The total price you see combines the basic tour costs plus any extras you pick, like special activities. Adults pay full price for these extras, but for kids, we only add half the price of these extras. So, the more you add, the more you save for your kids!</p>
                        </Form>
                    )
                }}
            </Formik>
            <AnimatePresence mode='wait'>
                {subscriptionOpen && subscriptionData && (<Proceed data={subscriptionData} setSubscriptionOpen={setSubscriptionOpen} />)}
            </AnimatePresence>
            <AnimatePresence mode='wait'>
                {isLoginOpen && <LoginForm setIsLoginOpen={setIsLoginOpen} isLoginOpen={isLoginOpen} />}
            </AnimatePresence>
        </>
    )
}

export default LeftColumn