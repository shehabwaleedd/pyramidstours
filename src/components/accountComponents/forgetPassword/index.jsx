import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import styles from "./style.module.scss";

const ForgotPassword = () => {
    const { user } = useAuth();
    const userRegisteredEmail = user?.email;
    const [step, setStep] = useState(1); 
    const [verificationCode, setVerificationCode] = useState(''); 
    const [emailForReset, setEmailForReset] = useState(''); 

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
                    if (values.email !== userRegisteredEmail) {
                        alert('The provided email does not match the registered email.');
                        break;
                    }
                    const { data } = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/user/sendCode`, {
                        email: values.email,
                    });
                    setVerificationCode(data.code);
                    setEmailForReset(values.email);
                    setStep(2); // Move to the next step
                    break;
                case 2:
                    // Check the entered code matches the sent code
                    if (values.code !== verificationCode) {
                        alert('Verification code is incorrect.');
                        break;
                    }
                    setStep(3); // Move to the next step
                    break;
                case 3:

                    await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/forgetPassword`, {
                        email: emailForReset,
                        newPassword: values.newPassword,
                    });
                    alert('Your password has been updated successfully!');
                    resetForm();
                    setStep(1); 
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred. Please try again later.');
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
                    <motion.div
                        initial={{ x: '-100vw' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100vw' }}
                        transition={{ type: 'spring', stiffness: 150 }}
                    >
                        <Form>
                            {step === 1 && (
                                <>
                                    <div>
                                        <label htmlFor="email">Email Address</label>
                                        <Field name="email" type="email" />
                                        <ErrorMessage name="email" component="div" className="error" />
                                    </div>
                                    <button type="submit" disabled={isSubmitting}>
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
                                    <button type="submit" disabled={isSubmitting}>
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
                                    <button type="submit" disabled={isSubmitting}>
                                        Reset Password
                                    </button>
                                </>
                            )}
                        </Form>
                    </motion.div>
                )}
            </Formik>
        </section>
    );
};

export default ForgotPassword;

