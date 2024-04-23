'use client'

import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from "./page.module.scss"
import Loading from "../../../../../animation/loading/Loading"
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Link from 'next/link';
import { useAuth } from '../../../../../context/AuthContext';

const EditUser = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validationSchema = yup.object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        age: yup.number().positive("Age must be a positive number").integer("Age must be an integer").required("Age is required"),
        phone: yup.number().required("Phone is required"),
        country: yup.string().required("Country is required"),
        region: yup.string().required("Region is required"),
        company: yup.string().required("Company is required"),
        position: yup.string().required("Position is required"),
        gender: yup.string().required("Gender is required"),
    });

    const formik = useFormik({
        enableReinitialize: true, 
        initialValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            country: user?.country || '',
            region: user?.region || '',
            company: user?.company || '',
            position: user?.position || '',
            age: user?.age || '',
            gender: user?.gender || '',
        },
        validationSchema,
        onSubmit: async (values) => {

            setLoading(true);
            setError('');
            const formData = new FormData();

            // Append form values to FormData
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value);
            });
            try {
                const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, formData, {
                    headers:
                    {
                        token: localStorage.getItem('token'),
                    },
                });
                if (response.status === 200 && response.data.message === "success") {
                    router.push('/account');
                } else {
                    throw new Error('Failed to update user');
                }
            } catch (error) {
                setError(error.response?.data.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        },
    });

    if (!user) {
        return <Loading height={100} />; // Or any other loading indicator
    }


    return (
        <main className={styles.editUserInfo}>
            <form onSubmit={formik.handleSubmit} className={styles.editUserInfo__form}>
                <Link href='/account'>
                    Back to Account
                </Link>
                <h1>Edit your account</h1>
                <div className={styles.editUserInfo__form__group}>
                    <div className={styles.combined}>
                        <div className={styles.editUserInfo__form__group_column}>
                            <label htmlFor="name">
                                Name
                            </label>
                            <input type="text" placeholder="Name" className={styles.editUserInfo__input} name="name" onChange={formik.handleChange} value={formik.values.name} />
                        </div>
                        <div className={styles.editUserInfo__form__group_column}>
                            <label htmlFor="email">
                                Email
                            </label>
                            <input type="email" placeholder="Email" className={styles.editUserInfo__input} name="email" onChange={formik.handleChange} value={formik.values.email} />
                        </div>
                        <div className={styles.editUserInfo__form__group}>
                            <div className={styles.editUserInfo__form__group_column}>
                                <label htmlFor="phone"> Phone </label>
                                <input type="text" placeholder="Phone" className={styles.editUserInfo__input} name="phone" onChange={formik.handleChange} value={formik.values.phone} />
                            </div>

                        </div>
                    </div>

                    {formik.touched.name && formik.errors.name && (
                        <div className={styles.editUserInfo__error}>{formik.errors.name}</div>
                    )}
                    {formik.touched.email && formik.errors.email && (
                        <div className={styles.editUserInfo__error}>{formik.errors.email}</div>
                    )}
                    {formik.touched.phone && formik.errors.phone && (
                        <div className={styles.editUserInfo__error}>{formik.errors.phone}</div>
                    )}
                </div>
                <div className={styles.editUserInfo__form__group}>
                    <div className={styles.combined}>
                        <div className={styles.editUserInfo__form__group_column}>
                            <label htmlFor="birthDate">
                                Age
                            </label>
                            <select name="age" onChange={formik.handleChange} value={formik.values.age} className={styles.editUserInfo__input}>
                                <option value="">Select Age</option>

                                {Array.from({ length: 50 }, (_, i) => i + 17).map((age) => <option key={age} value={age}>{age}</option>)}
                            </select>

                        </div>
                        <div className={styles.editUserInfo__form__group_column}>
                            <label htmlFor="gender">
                                Gender
                            </label>
                            <select
                                name="gender"
                                id="gender"
                                onChange={formik.handleChange}
                                value={formik.values.gender}
                                className={styles.editUserInfo__input}
                                onBlur={formik.handleBlur}

                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    {formik.touched.age && formik.errors.age && (
                        <div className={styles.editUserInfo__error}>{formik.errors.age}</div>
                    )}
                    {formik.touched.gender && formik.errors.gender && (
                        <div className={styles.editUserInfo__error}>{formik.errors.gender}</div>
                    )}

                    <div className={styles.combined}>
                        <div className={styles.editUserInfo__form__group_column}>
                            <label htmlFor="country">
                                Country
                            </label>
                            <CountryDropdown
                                value={formik.values.country}
                                onChange={(val) => formik.setFieldValue('country', val)}
                                priorityOptions={
                                    ['US', 'GB', 'CA', 'AU', 'DE',
                                        'EG', 'FR', 'ES', 'NL', 'BR',
                                        'PT', 'MX', 'IN', 'CN', 'JP',
                                        'RU', 'IT', 'SE', 'NO', 'DK',
                                        'FI', 'BE', 'CH', 'AT', 'IE',
                                        'SG', 'ZA', 'NZ', 'AR', 'CL',
                                        'CO', 'PE', 'VE', 'EC', 'UY',
                                    ]
                                }
                            />
                        </div>
                        <div className={styles.editUserInfo__form__group_column}>
                            <label htmlFor="region">
                                Region
                            </label>
                            <RegionDropdown
                                country={formik.values.country}
                                value={formik.values.region}
                                onChange={(val) => formik.setFieldValue('region', val)} />
                        </div>
                    </div>


                    {formik.touched.country && formik.errors.country && (
                        <div className={styles.editUserInfo__error}>{formik.errors.country}</div>
                    )}
                    {formik.touched.region && formik.errors.region && (
                        <div className={styles.editUserInfo__error}>{formik.errors.region}</div>
                    )}
                </div>
                <div className={styles.editUserInfo__form__group}>
                    <div className={styles.combined}>
                        <div className={styles.editUserInfo__form__group_column}>
                            <label htmlFor="text"> Company </label>
                            <input type="text" placeholder="Company" className={styles.editUserInfo__input} name="company" onChange={formik.handleChange} value={formik.values.company} />
                        </div>
                        <div className={styles.editUserInfo__form__group_column}>
                            <label htmlFor="text"> Position </label>
                            <input type="text" placeholder="Position" className={styles.editUserInfo__input} name="position" onChange={formik.handleChange} value={formik.values.position} />
                        </div>
                    </div>
                </div>
                <button type="submit" className={styles.editUserInfo__btn} disabled={loading}> {loading ? 'Updating...' : 'Update'}</button>
                    {error && <div className={styles.editUserInfo__error}>{error}</div>}
            </form>
        </main>
    );
};

export default EditUser;
