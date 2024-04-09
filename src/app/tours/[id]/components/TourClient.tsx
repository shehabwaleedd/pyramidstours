'use client'
import React, { useState, useEffect } from 'react'
import { useTourById } from '@/lib/tours/useTourById'
import axios from 'axios'
import { Formik, Form, Field, } from 'formik';
import styles from "..//page.module.scss"
import { IoLocationSharp } from 'react-icons/io5';
import { FiClock } from 'react-icons/fi';
import { BsCurrencyDollar } from 'react-icons/bs';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ImageSlider from '@/components/imageSlider/ImageSlider'
import Image from 'next/image'
import { TourType } from '@/types/homePageTours';


interface TourClientProps {
    id: string;
}

interface FormValues {
    date: Date | [Date | null, Date | null];
    adults: number;
    children: number;
    selectedOptions: string[];
    startTime: string;
    startDay: string;
}

interface Values {
    adults: number;
    children: number;
    selectedOptions: string[];
}

const TourClient: React.FC<TourClientProps> = ({ id }) => {
    const { tour } = useTourById(id)
    const initialValues: FormValues = {
        date: new Date(),
        adults: 1,
        children: 0,
        selectedOptions: [],
        startTime: "",
        startDay: "",
    };

    const handleSubmit = async (values: FormValues) => {
        try {
            const response = await axios.post('/api/booking', {
                tourId: id,
                date: values.date,
                adults: values.adults,
                children: values.children,
                options: values.selectedOptions,
            });
            console.log(response.data); // Handle success response
        } catch (error) {
            console.error(error); // Handle error response
        }
    };

    function calculateTotalCost(values: Values, tour: TourType | null) {
        let total = 0;

        if (tour) {
            // Base cost for adults from the adultPricing tier.
            const adultPricingTier = tour.adultPricing.find(pricing => pricing.adults >= values.adults);
            if (adultPricingTier) {
                total += adultPricingTier.totalPrice;
            }

            // Base cost for children from the childrenPricing tier, if any children are selected.
            if (values.children > 0) {
                const childPricingTier = tour.childrenPricing.find(pricing => pricing.children >= values.children);
                if (childPricingTier) {
                    total += childPricingTier.totalPrice;
                }
            }

            // Calculate total options cost for both adults and children.
            values.selectedOptions.forEach(optionName => {
                const option = tour.options.find(o => o.name === optionName);
                if (option) {
                    // Add the full option price for each adult.
                    total += parseFloat(option.price) * values.adults;
                    // Add half the option price for each child, if children are selected.
                    if (values.children > 0) {
                        total += (parseFloat(option.price) / 2) * values.children;
                    }
                }
            });

            // resetting total cost if no values being selected. 
            if (values.adults === 0 && values.children === 0) {
                total = 0;
            }
        }

        return total;
    }


    return (
        <section className={styles.eventDetails}>
            <div className={styles.eventDetails__mainImage}>
                <Image src={tour?.mainImg.url ?? ''} width={1800} height={1000} alt='Main Image' className={styles.mainImage} />
                <div className={styles.eventDetails__mainImage_abs}>
                    <div className={styles.eventDetails__mainImage__upper}>
                        <h1>{tour?.title}</h1>
                    </div>
                    <div className={styles.eventDetails__mainImage__upper_details}>
                        <p> <IoLocationSharp /> {tour?.location?.from}, {tour?.location?.to} </p>
                        <p> <FiClock /> {tour?.duration} </p>
                        <p> <BsCurrencyDollar />   From ${tour?.adultPricing.find(p => p.adults === 1)?.price ?? 'N/A'}</p>
                    </div>
                </div>
            </div>
            <div className={styles.eventDetails__intro}>
                <div className={styles.eventDetails__intro_title}>
                    <h2>{tour?.title}</h2>
                </div>
                <div className={styles.eventDetails__intro_desc}>
                    <p> <IoLocationSharp /> {tour?.location?.from}, {tour?.location?.to} </p>
                    <p> <FiClock /> {tour?.duration} </p>
                    <p> <BsCurrencyDollar />   From ${tour?.adultPricing.find(p => p.adults === 1)?.price ?? 'N/A'}</p>
                </div>
            </div>
            <aside className={styles.eventDetails__lower}>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ setFieldValue, values }) => {
                        const handleOptionChange = (optionName: string) => {
                            if (values.selectedOptions.includes(optionName)) {
                                setFieldValue(
                                    'selectedOptions',
                                    values.selectedOptions.filter(option => option !== optionName)
                                );
                            } else {
                                setFieldValue(
                                    'selectedOptions',
                                    [...values.selectedOptions, optionName]
                                );
                            }
                        };
                        return (
                            <Form className={styles.eventDetails__lower_left}>
                                <h2> Tailor Your Tour</h2>
                                <Calendar onChange={value => setFieldValue('date', value)} value={initialValues.date} minDate={new Date()} className={styles.calendar}/>
                                <div className={styles.headGroup}>
                                    <h2>Tour Available in</h2>
                                    <div className={styles.group}>
                                        <div className={styles.group}>
                                            <Field as="select" name="startTime" className={styles.Field}>
                                                {tour?.repeatTime.map((time, index) => (
                                                    <option key={index} value={time}>{time}:00</option>
                                                ))}
                                            </Field>
                                            <Field as="select" name="startDay" className={styles.Field}>
                                                {tour?.repeatDays.map((day, index) => (
                                                    <option key={index} value={day}>{day}</option>
                                                ))}
                                            </Field>
                                        </div>
                                    </div>
                                    <div className={styles.headGroup}>
                                        <div className={styles.group}>
                                            <label>Number of Adults</label>
                                            <Field type="number" name="adults" min={1}
                                            />
                                        </div>
                                        <div className={styles.group}>
                                            <label>Number of Children</label>
                                            <Field type="number" name="children" min={0} />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.eventDetails__lower_left_options}>
                                    <div className={styles.eventDetails__lower_left_options__header}>
                                        <h2>Options</h2>
                                    </div>
                                    <div className={styles.eventDetails__lower_left_options__options}>
                                        {tour?.options.map((option, index) => (
                                            <label key={index}>
                                                <Field
                                                    type="checkbox"
                                                    name="selectedOptions"
                                                    value={option.name}
                                                    checked={values.selectedOptions.includes(option.name)}
                                                    onChange={() => handleOptionChange(option.name)}
                                                />
                                                {`${option.name} - $${option.price}`}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.headGroup}>
                                    <div>
                                        <h2>Total Price: ${calculateTotalCost(values, tour)}</h2>

                                    </div>
                                </div>
                                <button type="submit" className={styles.submitButton}>Add To Cart</button>
                                <p>Note: The total price you see combines the basic tour costs plus any extras you pick, like special activities. Adults pay full price for these extras, but for kids, we only add half the price of these extras. So, the more you add, the more you save for your kids!</p>
                            </Form>
                        )
                    }}
                </Formik>

                <div className={styles.eventDetails__lower_right}>
                    <ImageSlider images={tour?.images ?? []} name={tour?.title ?? ''} />
                    <div className={styles.eventDetails__lower_right_desc}>
                        <h2>Description</h2>
                        <p>{tour?.description}</p>
                    </div>
                    <div className={styles.eventDetails__lower_right_exclusionsAndInclusions}>
                        <div className={styles.eventDetails__lower_right_exclusionsAndInclusions__exclusions}>
                            <h2 style={{ color: "var(--accent-color" }}>Exclusions</h2>
                            <ul>
                                {tour?.exclusions.map((exclusion, index) => (
                                    <li key={index}>
                                        <FaTimes style={{ fill: "var(--accent-color" }} /> {exclusion}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.eventDetails__lower_right_exclusionsAndInclusions__inclusions}>
                            <h2 style={{ color: "var(--second-accent-color" }}>Inclusions</h2>
                            <ul>
                                {tour?.inclusions.map((inclusion, index) => (
                                    <li key={index}>
                                        <FaCheck style={{ fill: "var(--second-accent-color" }} /> {inclusion}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={styles.eventDetails__lower_right_desc}>
                        <h2> Itenerary </h2>
                        <p>{tour?.subtitle}</p>
                    </div>
                    <div className={styles.eventDetails__lower_right_exclusionsAndInclusions}>
                        <div className={styles.eventDetails__lower_right_exclusionsAndInclusions__inclusions}>
                            <h2>Adults</h2>
                            <ul className={styles.group}>
                                {tour?.adultPricing.map((pricing, index) => (
                                    <li key={index}>
                                        {pricing.adults}+ Adults: ${pricing.price}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.eventDetails__lower_right_exclusionsAndInclusions__exclusions}>
                            <h2>Children</h2>
                            <ul className={styles.group}>
                                {tour?.childrenPricing.map((pricing, index) => (
                                    <li key={index}>
                                        {pricing.children}+ Children: ${pricing.price}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20063.42830342647!2d31.116107356270323!3d29.972533959618342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145845030fe6fc6d%3A0x73111684bd1dce03!2sPyramids%20of%20Giza!5e0!3m2!1sen!2seg!4v1711913995057!5m2!1sen!2seg" width="600" height="450" loading="lazy" ></iframe>
        </section>
    )
}

export default TourClient