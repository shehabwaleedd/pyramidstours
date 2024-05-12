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
    const { subscriptions, loading, error } = useAllSubscriptions()
    const { user } = useAuth()
    const userHasSubscription = subscriptions.some(subscription => subscription?.userDetails?._id === user?.id)
    const userHasPaid = subscriptions.some(subscription => subscription?.userDetails?._id === user?.id && subscription?.payment === 'paid')
    const userQualifiedToReview = userHasSubscription && userHasPaid

    const initialValues: FormValues = {
        comment: '',
        rating: ''
    }

    const handleSubmit = async (values: FormValues) => {
        const formData = new FormData()
        formData.append('comment', values.comment)
        formData.append('rating', values.rating)
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
                    <h2>Hello, {user?.name}! Leave a Review</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <CustomField
                                label="Comment"
                                name="comment"
                                fieldType="input"
                            />
                            <CustomField
                                label="Rating"
                                name="comment"
                                fieldType="input"
                            />
                            <button type="submit">Submit</button>
                        </Form>
                    </Formik>
                </section>
            )}
        </>
    )
}

export default LeaveReview