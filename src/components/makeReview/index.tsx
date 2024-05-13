'use client'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import useAllSubscriptions from '@/lib/subscriptions/useAllSubscriptions'
import styles from "./style.module.scss"
import axios from 'axios'
import { Formik, Form, } from 'formik'
import * as Yup from 'yup';
import Cookie from 'js-cookie'
import { toast } from 'sonner'
import CustomField from '@/app/account/tours/createTour/components/CustomField'

interface FormValues {
    comment: string;
    rating: string;
}

const validationSchema = Yup.object({
    comment: Yup.string().required('Comment is required'),
    rating: Yup.string().required('Rating is required'),
})



const LeaveReview = () => {
    const { subscriptions, error } = useAllSubscriptions()
    const [rating, setRating] = useState<number>(0);
    const { user } = useAuth()
    const userHasSubscription = subscriptions.some(subscription => subscription?.userDetails?._id === user?.id)
    const userHasPaid = subscriptions.some(subscription => subscription?.userDetails?._id === user?.id && subscription?.payment === 'paid')
    const userQualifiedToReview = userHasSubscription && userHasPaid

    const initialValues: FormValues = {
        comment: '',
        rating: ''
    }

    const handleRating = (rate: number) => {
        setRating(rate);
    };

    const handleSubmit = async (values: FormValues) => {
        const formData = new FormData()
        formData.append('comment', values.comment)
        formData.append('rating', String(rating));
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/review`, { values, }, {
                headers: {
                    token: Cookie.get('token'),
                    "Content-Type": "application/json"
                }
            })
            if (response.status === 200 && response.data.message === 'success') {
                toast.success('Review submitted successfully')
            }
        } catch (error) {
            console.error('Error submitting review:', error)
            toast.error('Error submitting review. Please try again.')
        }
    }




    return (
        <>
            {userQualifiedToReview && (
                <section className={styles.review}>
                    <h2>Hello, {user?.name}🫶 Your review would mean the world for us</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className={styles.review_container}>
                            <div className={styles.register__form__group_column}>
                                <label> Rate </label>
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
    )
}

export default LeaveReview