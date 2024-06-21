// app/components/LoginComponent.tsx
'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { motion } from 'framer-motion';
import { mobileVariants } from '@/animation/animate';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import styles from '@/components/loginForm/style.module.scss';
import Link from 'next/link';


const LoginComponent: React.FC = () => {

    const [errorFromDataBase, setErrorFromDataBase] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { setUser } = useAuth();
    const { handleLoginSuccessForm, handleRegisterIsOpen, setIsLoginOpen, isLoginOpen } = useWishlist();

    const validationSchema = yup.object().shape({
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            const url = `/api/user/login`;
            const dataToSend = { email: values.email, password: values.password };

            try {
                const response = await axios.post(url, dataToSend);
                if (response.data.message === 'success') {
                    setUser(response.data.data);
                    handleLoginSuccessForm(response.data.token, response.data.data);
                    setIsLoginOpen(false);
                } else {
                    setErrorFromDataBase(response.data.err || 'An unexpected error occurred.');
                }
            } catch (error: any) {
                setErrorFromDataBase(error.response.data.err || "An unexpected error occurred.");
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <motion.section
            className={styles.container__formSection}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={mobileVariants}>
            <div className={styles.loginUpper}>
                <h2>Login To Continue</h2>
                <button onClick={() => setIsLoginOpen(false)} className={styles.closeButton}>close</button>
            </div>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <div className={styles.group}>
                    <div className={styles.column}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            autoComplete="email"
                            onBlur={formik.handleBlur}
                            required
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </div>
                </div>
                <div className={styles.group}>
                    <div className={styles.column}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            onBlur={formik.handleBlur}
                            required
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                    </div>
                </div>
                {formik.touched.password && formik.errors.password && (
                    <div className={styles.error}>{formik.errors.password}</div>
                )}
                <button type="submit" disabled={isLoading} className={styles.button} aria-label={isLoading ? 'Loading' : 'Login'}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                {errorFromDataBase && <div className={styles.error}>{errorFromDataBase}</div>}
                <div className={styles.link}>
                    <button type="button" onClick={handleRegisterIsOpen} aria-label="Don't have an account? Sign up">Don&apos;t have an account? Sign up</button>
                </div>
                <div className={styles.link}>
                    <Link href="/forgotPassword" aria-label="Forgot your password? Don't worry, click here">
                        Forgot your password? Don&apos;t worry, click here
                    </Link>
                </div>
            </form>
        </motion.section>
    );
};

export default LoginComponent;
