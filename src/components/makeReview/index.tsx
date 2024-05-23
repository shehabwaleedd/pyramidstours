'use client'
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from "./style.module.scss";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Cookie from 'js-cookie';
import { toast } from 'sonner';
import CustomField from '@/app/account/tours/createTour/components/CustomField';

interface FormValues {
    comment: string;
    rating: string;
}

const validationSchema = Yup.object({
    comment: Yup.string().required('Comment is required'),
    rating: Yup.string().required('Rating is required'),
});

const LeaveReview = () => {
    const [subscriptions, setSubscriptions] = useState<any[]>([]);
    const [rating, setRating] = useState<number>(0);
    const { user } = useAuth();

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await fetch('/api/subscription');
                const data = await response.json();
                setSubscriptions(data.data.result);
            } catch (error) {
                console.error('Error fetching subscriptions:', error);
            }
        };

        fetchSubscriptions();
    }, []);

    const userHasSubscription = subscriptions.some(subscription => subscription?.userDetails?._id === user?.id);
    const userHasPaid = subscriptions.some(subscription => subscription?.userDetails?._id === user?.id && subscription?.payment === 'paid');
    const userQualifiedToReview = userHasSubscription && userHasPaid;

    const initialValues: FormValues = {
        comment: '',
        rating: ''
    };

    const handleRating = (rate: number) => {
        setRating(rate);
    };

    const handleSubmit = async (values: FormValues) => {
        try {
            const response = await fetch('/api/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': Cookie.get('token') || '',
                },
                body: JSON.stringify({
                    comment: values.comment,
                    rating: String(rating),
                }),
            });

            const data = await response.json();

            if (response.status === 200 && data.message === 'success') {
                toast.success('Review submitted successfully');
            } else {
                toast.error('Error submitting review. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Error submitting review. Please try again.');
        }
    };

    return (
        <>
            {userQualifiedToReview && (
                <section className={styles.review}>
                    <h2>Hello, {user?.name}🫶 Your review would mean the world to us</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className={styles.review_container}>
                            <div className={styles.register__form__group_column}>
                                <label>Rate</label>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} onClick={() => handleRating(star)} style={{ color: rating >= star ? 'gold' : 'grey', cursor: "pointer" }}>
                                        {rating >= star ? '★' : '☆'}
                                    </span>
                                ))}
                            </div>
                            <CustomField
                                label="Comment"
                                name="comment"
                                fieldType="textarea"
                            />
                            <button className={styles.review_container_button} type="submit">Submit</button>
                        </Form>
                    </Formik>
                </section>
            )}
        </>
    );
}

export default LeaveReview;
