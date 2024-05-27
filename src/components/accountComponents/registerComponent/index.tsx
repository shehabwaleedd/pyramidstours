// app/components/RegisterComponent.tsx
'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { motion } from 'framer-motion';
import { getVariants } from '@/animation/animate';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import useWindowWidth from '@/hooks/useWindowWidth';
import styles from '@/components/loginForm/style.module.scss';
import { CountryDropdown } from 'react-country-region-selector';

interface RegisterComponentProps {
    setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterComponent: React.FC<RegisterComponentProps> = ({ setIsLoginOpen }) => {
    const [errorFromDataBase, setErrorFromDataBase] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { setUser } = useAuth();
    const { handleLoginSuccessForm, handleLoginIsOpen } = useWishlist();
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth !== null && windowWidth < 768;

    const validationSchema = yup.object().shape({
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().required("Password is required"),
        name: yup.string().required("Name is required"),
        rePassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
        nationality: yup.string().required("Nationality is required"),
        gender: yup.string().required("Gender is required"),
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
            const url = `/api/user/register`;
            const dataToSend = values;

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
            variants={getVariants(isMobile)}
        >
            <div className={styles.loginUpper}>
                <h2>Register To Continue</h2>
                <button onClick={() => setIsLoginOpen(false)} className={styles.closeButton}>close</button>
            </div>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <div className={styles.group}>
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
                </div>
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
                </div>
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
                {formik.touched.password && formik.errors.password && (
                    <div className={styles.error}>{formik.errors.password}</div>
                )}
                <button type="submit" disabled={isLoading} className={styles.button} aria-label={isLoading ? 'Loading' : 'Register'}>
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
                {errorFromDataBase && <div className={styles.error}>{errorFromDataBase}</div>}
                <div className={styles.link}>
                    <button type="button" onClick={handleLoginIsOpen} aria-label="Already have an account? Login">Already have an account? Login</button>
                </div>
            </form>
        </motion.section>
    );
};

export default RegisterComponent;
