'use client'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from "./page.module.scss"
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

const Page = () => {
    const [errorFromDataBase, setErrorFromDataBase] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const { handleLoginSuccess, isLoggedIn } = useAuth();

    const router = useRouter();
    let validationSchema = yup.object({
        email: yup.string().email().required("Email is required"),
        password: yup.string().required("Password is required"),

    })

    const loginFormik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            setErrorFromDataBase(''); // Reset server error message before each submission
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/login`, values);

                // Assuming success message means HTTP status 200
                if (response.status === 200 && response.data.message === "success") {
                    const userData = response.data.data;
                    handleLoginSuccess(response.data.token, response.data.data);

                    if (!userData.confirmedEmail) {
                        router.push('/register/verify');
                    } else {
                        router.push('/account');
                    }
                } else {
                    throw new Error('Login failed for an unknown reason.');
                }
            } catch (err) {
                if (err.response && Array.isArray(err.response.data)) {
                    const messages = err.response.data.map(e => e).join('\n');
                    setErrorFromDataBase(messages);
                } else {
                    // Assuming err.response.data or err.response.statusText contains the error message you want to display
                    const errorMessage = err?.response?.data?.message || err?.response?.statusText || 'An unexpected error occurred during login.';
                    setErrorFromDataBase(errorMessage);
                }
            } finally {
                setIsLoading(false);
            }
        },
    });

    if (isLoggedIn) {
        router.push('/account');
    }


    return (
        <main className={styles.container}>
            <Image src="/assets/backgrounds/1.jpg"
                height={1000}
                width={1920}
                alt='register background'
            />
            <section className={styles.container__formSection}>
                <h1> Next tour is awaiting </h1>
                <form onSubmit={loginFormik.handleSubmit} className={styles.form}>
                    <label htmlFor="email"> Email </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete='email'
                        onBlur={loginFormik.handleBlur}
                        required
                        onChange={loginFormik.handleChange}
                        value={loginFormik.values.email}
                        className={styles.input}
                    />
                    {loginFormik.touched.email && loginFormik.errors.email && (
                        <div className={styles.error}>{loginFormik.errors.email}</div>
                    )}
                    <label htmlFor="password"> Password </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete='current-password'
                        onBlur={loginFormik.handleBlur}
                        required
                        onChange={loginFormik.handleChange}
                        value={loginFormik.values.password}
                        className={styles.input}
                    />
                    {loginFormik.touched.password && loginFormik.errors.password && (
                        <div className={styles.error}>{loginFormik.errors.password}</div>
                    )}
                    <button type="submit" className={styles.button} disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
                    {errorFromDataBase && <div className={styles.error}>{errorFromDataBase}</div>}


                    <div className={styles.link}>
                        <Link href="/forgotPassword">
                            <span className={styles.link}>Forgot password? Don&apos;t worry, click here</span>
                        </Link>
                    </div>
                    <div className={styles.link}>
                        <Link href="/register">
                            <span>Don&apos;t have an account? Sign up</span>
                        </Link>
                    </div>
                </form>
            </section>
        </main>

    )
}

export default Page