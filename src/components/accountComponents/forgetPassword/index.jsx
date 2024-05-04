'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import styles from "./style.module.scss";

const ForgotPassword = () => {
    const { user } = useAuth();
    const userRegisteredEmail = user?.email;
    const [step, setStep] = useState(1); 
    const [emailForReset, setEmailForReset] = useState(''); 
    const [verificationCode, setVerificationCode] = useState('');
    const getInitialValues = () => {
        switch (step) {
            case 1: return { email: '' };
            case 2: return { code: '' };
            case 3: return { newPassword: '', confirmNewPassword: '' };
            default: return {};
        }
    };
    const validationSchema = () => {
        switch (step) {
            case 1:
                return Yup.object({
                    email: Yup.string().email('Invalid email address').required('Required'),
                });
            case 2:
                return Yup.object({
                    code: Yup.string().required('Required'), 
                });
            case 3:
                return Yup.object({
                    newPassword: Yup.string().required('Password is required'),
                    confirmNewPassword: Yup.string()
                        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                        .required('Confirm password is required'),
                });
            default:
                return null;
        }
    };

    // Handle submit based on the current step

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            switch (step) {
                case 1:
                    // Check if the entered email matches the user's registered email
                    if (values.email !== user?.email) {
                        alert('The provided email does not match the registered email.');
                        break;
                    }
                    // If email matches, proceed with sending the verification code
                    await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/user/sendCode`, { email: values.email });
                    setEmailForReset(values.email); // Store the email for later use
                    setStep(2);
                    break;
                case 2:
                    // Store the entered code for sending in the next step
                    setVerificationCode(values.code);
                    const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/user/checkCode`, {
                        email: emailForReset,
                        code: values.code,
                    });

                    if (response.data.message === 'success' && response.data.data === 'correct code') {
                        setStep(3); // If verification successful, proceed to password reset
                    } else {
                        alert('Verification code is incorrect.');
                    }
                    break;
                case 3:
                    // Send email, newPassword, and stored code for the final password reset
                    await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/forgetPassword`, {
                        email: emailForReset,
                        newPassword: values.newPassword,
                        code: verificationCode, // Include the code from step 2
                    });
                    alert('Your password has been updated successfully!');
                    resetForm();
                    setStep(1); // Reset to the initial step
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('An error occurred:', error.response?.data?.err || 'Please try again later.');
            alert(error.response?.data?.err || 'An error occurred. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };
    
    return (
        <section className={styles.forgotPassword}>
            <h2>Forgot Password</h2>
            <Formik
                initialValues={getInitialValues()}
                validationSchema={validationSchema()}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <motion.div>
                        <Form>
                            {step === 1 && (
                                <>
                                    <div>
                                        <label htmlFor="email">Email Address</label>
                                        <Field name="email" type="email" />
                                        <ErrorMessage name="email" component="div" className="error" />
                                    </div>
                                    <button type="submit" disabled={isSubmitting} aria-label="Send Verification Code">
                                        Send Verification Code
                                    </button>
                                </>
                            )}
                            {step === 2 && (
                                <>
                                    <div>
                                        <label htmlFor="code">Verification Code</label>
                                        <Field name="code" type="text" />
                                        <ErrorMessage name="code" component="div" className="error" />
                                    </div>
                                    <button type="submit" disabled={isSubmitting} aria-label="Verify Code">
                                        Verify Code
                                    </button>
                                </>
                            )}
                            {step === 3 && (
                                <>
                                    <div>
                                        <label htmlFor="newPassword">New Password</label>
                                        <Field name="newPassword" type="password" />
                                        <ErrorMessage name="newPassword" component="div" className="error" />
                                    </div>
                                    <div>
                                        <label htmlFor="confirmNewPassword">Confirm New Password</label>
                                        <Field name="confirmNewPassword" type="password" />
                                        <ErrorMessage name="confirmNewPassword" component="div" className="error" />
                                    </div>
                                    <button type="submit" disabled={isSubmitting} aria-label="Reset Password">
                                        Reset Password
                                    </button>
                                </>
                            )}
                            
                        </Form>
                        
                    </motion.div>
                )}
                {}
            </Formik>
        </section>
    );
};

export default ForgotPassword;

