'use client'
import React, { useState, useEffect } from 'react'
import { useTourById } from '@/lib/tours/useTourById'
import axios from 'axios'
import { Formik, Form, Field, } from 'formik';
import styles from "..//page.module.scss"
import { IoLocationSharp, IoPricetagOutline } from 'react-icons/io5';
import { FiClock } from 'react-icons/fi';
import { BsCurrencyDollar } from 'react-icons/bs';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { CiHashtag } from "react-icons/ci";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ImageSlider from '@/components/imageSlider/ImageSlider'
import Image from 'next/image'
import { TourType } from '@/types/homePageTours';
import { useRouter } from 'next/navigation';
import { SubscriptionData } from '@/types/common';
import Proceed from '@/components/proceed';

interface TourClientProps {
    id: string;
}

interface BookingOption {
    id: string;
    number: string;
}

interface BookingData {
    adultPricing: string | null;
    childrenPricing: string | null;
    time: string;
    date: string;
    day: string;
    options: BookingOption[] | null;
}

interface FormValues {
    date: Date | [Date | null, Date | null];
    adults: number;
    children: number;
    selectedOptions: string[];
    repeatTime: string;
    day: string;
    repeatDays: string;
}

interface Values {
    adults: number;
    children: number;
    selectedOptions: string[];
}

const TourClient: React.FC<TourClientProps> = ({ id }) => {
    const { tour } = useTourById(id)
    const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [subscriptionOpen, setSubscriptionOpen] = useState<boolean>(false)
    const router = useRouter()
    const initialValues: FormValues = {
        date: new Date(),
        adults: 1,
        children: 0,
        selectedOptions: [],
        repeatTime: '',
        day: '',
        repeatDays: '',

    };

    const cleanGoogleMapLink = (mapDetails: string) => {
        let cleanedLink = mapDetails.replace(/style="border:0;"\s?/g, '');
        return cleanedLink;
    };


    const handleSubmit = async (values: FormValues) => {
        const formattedDate = values.date instanceof Date ? values.date.toISOString().split('T')[0] : ""; // Ensuring date is in ISO format

        const adultPricing = tour?.adultPricing.find(pricing => pricing.adults <= values.adults)?._id;
        const childrenPricing = tour?.childrenPricing.find(pricing => pricing.children <= values.children)?._id;

        const optionsWithCounts = (tour?.options ?? []).reduce((acc: BookingOption[], option) => {
            if (values.selectedOptions.includes(option.name)) {
                acc.push({
                    id: option._id,
                    number: values.adults.toString(),
                });
            }
            return acc
        }, []);

        const bookingData: BookingData = {
            adultPricing: adultPricing ?? null,
            childrenPricing: childrenPricing ?? null,
            time: values.repeatTime + ':00',
            date: formattedDate,
            day: values.repeatDays,
            options: optionsWithCounts,
        };
        console.log(adultPricing, childrenPricing, bookingData)

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/subscription/${tour?._id}`, bookingData,
                { headers: { token: localStorage.getItem('token') } }
            );
            if (response.data.message === "Subscription created successfully") {
                console.log(response.data, "respo")
                setSubscriptionData(response.data);
                setSubscriptionOpen(true);
            } else {
                console.error('Error Occured.');
            }

            console.log(response.data);
        } catch (error) {
            console.error(error);
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
                    <div className={styles.eventDetails__mainImage__upper_details} style={{ flexWrap: "wrap" }}>
                        {tour?.tags.map((tag, index) => (
                            <span key={index}><CiHashtag />{tag}</span>
                        ))}
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
                    <p> <IoPricetagOutline /> {tour?.category} </p>
                </div>
            </div>
            <aside className={styles.eventDetails__lower}>
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
                                <Calendar onChange={value => setFieldValue('date', value)} value={initialValues.date} minDate={new Date()} className={styles.calendar} />
                                <div className={styles.headGroup}>
                                    <h2>Tour Available in</h2>
                                    <div className={styles.group}>
                                        <div className={styles.group}>
                                            <Field as="select" name="repeatTime" className={styles.Field}>
                                                {tour?.repeatTime.map((time, index) => (
                                                    <option key={index} value={time}>{time}:00</option>
                                                ))}
                                            </Field>
                                            <Field as="select" name="repeatDays" className={styles.Field}>
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
                                <button type="submit" className={styles.submitButton}  disabled={isSubmitting}> {isSubmitting ? 'Submitting...' : 'Book Now'}</button>
                                <p>Note: The total price you see combines the basic tour costs plus any extras you pick, like special activities. Adults pay full price for these extras, but for kids, we only add half the price of these extras. So, the more you add, the more you save for your kids!</p>
                            </Form>
                        )
                    }}
                </Formik>

                <div className={styles.eventDetails__lower_right}>
                    <ImageSlider images={tour?.images ?? []} name={tour?.title ?? ''} />
                    <div className={styles.eventDetails__lower_right_desc}>
                        <h2>Description</h2>
                        <p dangerouslySetInnerHTML={{ __html: tour?.description ?? '' }} />
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
                        <p dangerouslySetInnerHTML={{ __html: tour?.itinerary ?? '' }} />
                    </div>
                    <div className={styles.eventDetails__lower_right_desc}>
                        <h2> History Brief </h2>
                        <p dangerouslySetInnerHTML={{ __html: tour?.historyBrief ?? '' }} />
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
            <div style={{ width: "100%" }} dangerouslySetInnerHTML={{ __html: cleanGoogleMapLink(tour?.mapDetails ?? '') }} />
            {subscriptionOpen && subscriptionData && ( <Proceed data={subscriptionData} setSubscriptionOpen={setSubscriptionOpen}/>)}
        </section>
    )
}

export default TourClient