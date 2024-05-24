'use client'

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import styles from "./page.module.scss";
import Link from 'next/link';
import Image from 'next/image';
import { CountryDropdown } from 'react-country-region-selector';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const Register = () => {
    const [avatar, setAvatar] = useState<File | null>(null);
    const { handleLoginSuccess } = useAuth();
    interface FormValues {
        name: string;
        email: string;
        age: string;
        password: string;
        rePassword: string;
        phone: string;
        nationality: string;
        gender: string;
    }

    const validationSchema = yup.object({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
        age: yup.number().positive("Age must be a positive number").integer("Age must be an integer").required("Age is required"),
        password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, 'Password must be at least 8 characters long and contain at least one letter and one number').required('Password is required'),
        rePassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
        phone: yup.number().required("Phone is required").positive("Phone must be a positive number").integer("Phone must be an integer"),
        nationality: yup.string().required("Nationality is required"),
        gender: yup.string().required('Gender is required'),
    });

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            setAvatar(event.currentTarget.files[0]);
        }
    };

    const registerFormik = useFormik<FormValues>({
        initialValues: {
            name: '',
            email: '',
            age: '',
            password: '',
            rePassword: '',
            phone: '',
            nationality: '',
            gender: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
                formData.append(key, (values as any)[key]);
            });
            if (avatar) formData.append('avatar', avatar);

            try {
                const response = await axios.post('/api/user/register', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                if (response.data.message === 'success') {
                    handleLoginSuccess(response.data.token, response.data.data);
                } else {
                    toast.error(response.data.error || 'An error occurred');
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.error || 'An error occurred';
                setSubmitting(false);
                toast.error(errorMessage);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const displayFormikErrors = () => {
        if (registerFormik.errors.name) toast.error(registerFormik.errors.name);
        if (registerFormik.errors.email) toast.error(registerFormik.errors.email);
        if (registerFormik.errors.gender) toast.error(registerFormik.errors.gender);
        if (registerFormik.errors.phone) toast.error(registerFormik.errors.phone);
        if (registerFormik.errors.password) toast.error(registerFormik.errors.password);
        if (registerFormik.errors.rePassword) toast.error(registerFormik.errors.rePassword);
    };

    return (
        <main className={styles.register}>
            <Image
                src="/assets/backgrounds/1.jpg"
                height={1000}
                width={1920}
                alt='register background'
            />
            <form className={styles.register__form} onSubmit={registerFormik.handleSubmit}>
                <h1>Let the journey begin</h1>
                <div className={styles.register__form__group}>
                    <div className={styles.register__form__group_column}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            className={styles.register__input}
                            name="name"
                            onChange={registerFormik.handleChange}
                            value={registerFormik.values.name}
                            onBlur={displayFormikErrors}
                        />
                    </div>
                    <div className={styles.register__form__group_column}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className={styles.register__input}
                            name="email"
                            onChange={registerFormik.handleChange}
                            value={registerFormik.values.email}
                            onBlur={displayFormikErrors}
                        />
                    </div>
                </div>
                <div className={styles.register__form__group}>
                    <div className={styles.register__form__group_column}>
                        <label htmlFor="gender">Gender</label>
                        <select
                            name="gender"
                            onChange={registerFormik.handleChange}
                            value={registerFormik.values.gender}
                            onBlur={registerFormik.handleBlur}
                            className={styles.register__input}
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className={styles.register__form__group_column}>
                        <label htmlFor="age">Age</label>
                        <select
                            name="age"
                            onChange={registerFormik.handleChange}
                            value={registerFormik.values.age}
                            className={styles.register__input}
                            onBlur={displayFormikErrors}
                        >
                            <option value="">Select Age</option>
                            {Array.from({ length: 50 }, (_, i) => i + 17).map(age => (
                                <option key={age} value={age}>{age}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={styles.register__form__group}>
                    <div className={styles.register__form__group_column}>
                        <label htmlFor="nationality">Nationality</label>
                        <CountryDropdown
                            value={registerFormik.values.nationality}
                            onChange={val => registerFormik.setFieldValue('nationality', val)}
                        />
                    </div>
                    <div className={styles.register__form__group_column}>
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="tel"
                            placeholder="Phone"
                            className={styles.register__input}
                            name="phone"
                            onChange={registerFormik.handleChange}
                            value={registerFormik.values.phone}
                            onBlur={displayFormikErrors}
                        />
                    </div>
                </div>
                <div className={styles.register__form__group__passwords}>
                    <div className={styles.register__form__group_column}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className={styles.register__input}
                            name="password"
                            onChange={registerFormik.handleChange}
                            value={registerFormik.values.password}
                            autoComplete="new-password"
                            onBlur={displayFormikErrors}
                        />
                    </div>
                    <div className={styles.register__form__group_column}>
                        <label htmlFor="rePassword">Repeat Password</label>
                        <input
                            type="password"
                            placeholder="Repeat Password"
                            className={styles.register__input}
                            name="rePassword"
                            onChange={registerFormik.handleChange}
                            value={registerFormik.values.rePassword}
                            onBlur={displayFormikErrors}
                        />
                    </div>
                </div>
                <div className={styles.register__form__group}>
                    <div className={styles.register__form__group_column}>
                        <label htmlFor="avatar">Profile Picture</label>
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            onChange={handleAvatarChange}
                        />
                        {avatar && <Image src={URL.createObjectURL(avatar)} alt="Profile Preview" height={50} width={50} />}
                    </div>
                </div>
                <button type="submit" disabled={registerFormik.isSubmitting} className={styles.register__btn} aria-label="Register Button">
                    {registerFormik.isSubmitting ? 'Registering...' : 'Register'}
                </button>
                <Link href="/login" aria-label="Already have an account? Login">
                    <span className={styles.register__login}>Already have an account? Login</span>
                </Link>
            </form>
        </main>
    );
};

export default Register;
