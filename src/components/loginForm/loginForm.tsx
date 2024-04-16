'use client'
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import Link from 'next/link';
import styles from "./style.module.scss"
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import global from "../../app/page.module.scss"
import { CountryDropdown } from 'react-country-region-selector';


interface FormValues {
    email: string;
    password: string;
    name?: string;
    rePassword?: string;
    nationality?: string;
    gender?: string;
}

interface AuthFormProps {
    initialMode?: 'login' | 'register';
}



const LoginForm = ({ isLoginOpen, setIsLoginOpen }: { isLoginOpen: boolean, setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [errorFromDataBase, setErrorFromDataBase] = useState<string>('');
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { handleLoginSuccess, setUser } = useAuth();

    const validationSchema = yup.object().shape({
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().required("Password is required"),
        ...(mode === 'register' && {
            name: yup.string().required("Name is required"),
            rePassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
            nationality: yup.string().required("Nationality is required"),
            gender: yup.string().required("Gender is required"),
        })
    });


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: '',
            rePassword: '',
            nationality: '',
            gender: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            const url = mode === 'login' ? `${process.env.NEXT_PUBLIC_BASE_URL}/user/login` : `${process.env.NEXT_PUBLIC_BASE_URL}/user/register`;
            const dataToSend = mode === 'login' ? { email: values.email, password: values.password } : values;

            try {
                const response = await axios.post(url, dataToSend);
                if (response.data.message === 'success') {
                    console.log("Setting user data");
                    setUser(response.data.data);
                    console.log("Handling login success");
                    handleLoginSuccess(response.data.token, response.data.data); 
                    console.log("Closing login form");
                    setIsLoginOpen(false);
                } else {
                    console.log("Fail")
                    setErrorFromDataBase(response.data.message || 'An unexpected error occurred.');
                }

            } catch (error: any) {
                setErrorFromDataBase(error.response.err || "An unexpected error occurred.");
            } finally {
                setIsLoading(false);
            }
        },
    });


    return (
        <>
            {isLoginOpen &&
                <motion.section className={`${global.bottomGlass} ${styles.container__formSection}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                    <div className={styles.loginUpper}>
                        <h2 className={global.h1Global}>{mode === 'login' ? 'Login To Continue Booking' : 'Register To Continue Booking'}</h2>
                        <button onClick={() => setIsLoginOpen(false)} className={styles.closeButton}>close</button>
                    </div>
                    <form onSubmit={formik.handleSubmit} className={styles.form}>
                        <div className={styles.group}>
                            {mode === 'register' && (
                                <>
                                    <div className={styles.column}>
                                        <label htmlFor="name">Name</label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            onChange={formik.handleChange}
                                            value={formik.values.name}
                                        />
                                    </div>
                                </>
                            )}
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

                            {mode === 'register' && (
                                <div className={styles.column}>
                                    <label htmlFor="rePassword">Confirm Password</label>
                                    <input
                                        id="rePassword"
                                        name="rePassword"
                                        type="password"
                                        onChange={formik.handleChange}
                                        value={formik.values.rePassword}
                                    />
                                </div>
                            )}

                        </div>
                        {mode === 'register' && (
                            <>


                                <div className={styles.group}>
                                    <div className={styles.column}>
                                        <label htmlFor="nationality">Nationality</label>
                                        <CountryDropdown value={formik.values.nationality} onChange={val => formik.setFieldValue('nationality', val)} />
                                    </div>
                                    <div className={styles.column}>
                                        <label htmlFor="gender">Gender</label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            onChange={formik.handleChange}
                                            value={formik.values.gender}
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </>
                        )}

                        {formik.touched.password && formik.errors.password && (
                            <div className={styles.error}>{formik.errors.password}</div>
                        )}
                        <button type="submit" disabled={isLoading}
                            className={styles.button}
                        >
                            {isLoading ? (mode === 'login' ? 'Logging in...' : 'Registering...') : (mode === 'login' ? 'Login' : 'Register')}
                        </button>
                        {errorFromDataBase && <div className={styles.error}>{errorFromDataBase}</div>}
                        <div className={styles.link}>
                            {mode === 'login' ? (
                                <button onClick={() => setMode('register')}>Don&apos;t have an account? Sign up</button>
                            ) : (
                                <button onClick={() => setMode('login')}>Already have an account? Login</button>
                            )}
                        </div>
                        <div className={styles.link}>
                            <Link href="/forgetPassword">
                                Forgot your password? Don&apos;t worry, click here
                            </Link>
                        </div>
                    </form>
                </motion.section>
            }
        </>
    )
}

export default LoginForm