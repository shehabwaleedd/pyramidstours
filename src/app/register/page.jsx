'use client'

import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import styles from "./page.module.scss"
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const Register = () => {
    const [errorFromDataBase, setErrorFromDataBase] = useState('')
    const [avatar, setAvatar] = useState(null);
    const router = useRouter();


    let validationSchema = yup.object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        age: yup.number().positive("Age must be a positive number").integer("Age must be an integer").required("Age is required"),
        password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, 'at least 6 charchter and start with upperCase').required(),
        rePassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
        phone: yup.number().required("Phone is required").positive("Phone must be a positive number").integer("Phone must be an integer"),
        nationality: yup.string().required("Country is required"),
        gender: yup.string(),
    })

    const handleAvatarChange = (event) => {
        setAvatar(event.currentTarget.files[0]);
    };

    const registerFormik = useFormik({
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
            Object.keys(values).forEach(key => formData.append(key, values[key]));
            if (avatar) formData.append('avatar', avatar);

            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/register`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                localStorage.setItem('token', response.data.token);
                router.push('/'); // Navigate to home or dashboard
            } catch (error) {
                console.log(error.response);
                setErrorFromDataBase(error.response?.data?.err || 'An error occurred');
            } finally {
                setSubmitting(false);
            }
        },
    });


    return (
        <main className={styles.register}>
            <Image src="/assets/backgrounds/1.jpg"
                height={1000}
                width={1920}
                alt='register background'
            />
            <form className={styles.register__form} onSubmit={registerFormik.handleSubmit}>
                <h1> Let the journey begin </h1>
                <div className={styles.register__form__group}>
                    <div className={styles.register__form__group_column}>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="text" placeholder="Name" className={styles.register__input} name="name" onChange={registerFormik.handleChange} value={registerFormik.values.name} />
                    </div>
                    <div className={styles.register__form__group_column}>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input type="email" placeholder="Email" className={styles.register__input} name="email" onChange={registerFormik.handleChange} value={registerFormik.values.email} />
                    </div>

                </div>

                <div className={styles.register__form__group}>
                    <div className={styles.register__form__group_column}>
                        <label htmlFor="gender">
                            Gender
                        </label>
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
                        <label htmlFor="birthDate">
                            Age
                        </label>
                        <select name="age" onChange={registerFormik.handleChange} value={registerFormik.values.age} className={styles.register__input}>
                            <option value="">Select Age</option>

                            {Array.from({ length: 50 }, (_, i) => i + 17).map((age) => <option key={age} value={age}>{age}</option>)}
                        </select>

                    </div>

                </div>

                <div className={styles.register__form__group}>

                    <div className={styles.register__form__group_column}>
                        <label htmlFor="nationality">
                            Nationality
                        </label>
                        <CountryDropdown
                            value={registerFormik.values.nationality}
                            onChange={(val) => registerFormik.setFieldValue('nationality', val)}
                            priorityOptions={
                                ['GB', 'CA', 'AU', 'DE', 'AE',
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
                    <div className={styles.register__form__group_column}>
                        <label htmlFor="tel"> Phone </label>
                        <input type="tel" placeholder="Phone" className={styles.register__input} name="phone" onChange={registerFormik.handleChange} value={registerFormik.values.phone} />
                    </div>

                </div>
                {registerFormik.errors.name ? <div className={styles.register__error}>{registerFormik.errors.name}</div> : null}
                {registerFormik.errors.email ? <div className={styles.register__error}>{registerFormik.errors.email}</div> : null}
                {registerFormik.errors.gender ? <div className={styles.register__error}>{registerFormik.errors.gender} </div> : null}
                {registerFormik.errors.phone ? <div className={styles.register__error}>{registerFormik.errors.phone}</div> : null}
                <div className={styles.register__form__group__passwords}>
                    <div className={styles.register__form__group_column}>
                        <label htmlFor="password"> Password</label>
                        <input type="password" placeholder="Password" className={styles.register__input} name="password" onChange={registerFormik.handleChange} value={registerFormik.values.password}
                            autoComplete="new-password"
                        />
                    </div>
                    <div className={styles.register__form__group_column}>
                        <label htmlFor="password">Repeat Password</label>
                        <input type="password" placeholder="Repeat Password" className={styles.register__input} name="rePassword" onChange={registerFormik.handleChange} value={registerFormik.values.rePassword} />
                    </div>

                </div>
                {registerFormik.errors.password ? <div className={styles.register__error}>{registerFormik.errors.password}</div> : null}
                {registerFormik.errors.rePassword ? <div className={styles.register__error}>{registerFormik.errors.rePassword}</div> : null}
                <div className={styles.register__form__group}>
                    <div className={styles.register__form__group_column}>
                        <label htmlFor="avatar">Profile Picture</label>
                        <input type="file" id="avatar" name="avatar" onChange={handleAvatarChange} />
                        {avatar && <Image src={URL.createObjectURL(avatar)} alt="Profile Preview" height={50} width={50} />}
                        {registerFormik.errors.avatar && <div className={styles.register__error}>{registerFormik.errors.avatar}</div>}
                    </div>
                </div>

                <button type="submit" disabled={registerFormik.isSubmitting} className={styles.register__btn}>{registerFormik.isSubmitting ? 'Registering...' : 'Register'}</button>
                <Link href="/login"> <span className={styles.register__login}>Already have an account? Login</span></Link>
                {errorFromDataBase ? <div className={styles.register__error}>{errorFromDataBase}</div> : null}
            </form>



        </main>
    )
}

export default Register