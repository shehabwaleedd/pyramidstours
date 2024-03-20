'use client'
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import styles from './page.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface FormValues {
    userName: string;
    email: string;
    description: string;
    rate: number;
}

const CreateTestimonials: React.FC = () => {
    const [errorFromDataBase, setErrorFromDataBase] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const [avatar, setAvatar] = useState<File | null>(null);
    const router = useRouter();
    const formik = useFormik<FormValues>({
        initialValues: {
            userName: '',
            email: '',
            description: '',
            rate: 0, // Initial rate is 0
        },
        validationSchema: yup.object({
            userName: yup.string().required("Name is required"),
            email: yup.string().email("Invalid email address").required("Email is required"),
            description: yup.string().required("Description is required").min(100, "Description must be at least 100 characters").max(650, "Description can't exceed 650 characters"),
            rate: yup.number().min(1, "Please select a rate").required("Rate is required"),
        }),
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append('userName', values.userName);
                formData.append('email', values.email);
                formData.append('description', values.description);
                formData.append('rate', values.rate.toString());
                if (avatar) formData.append('avatar', avatar); // Add the avatar if it exists

                const response = await axios.post('https://tours-b5zy.onrender.com/testimonial', formData);

                if (response.status === 200 && response.data.message === 'success') {
                    router.push('/');
                } else {
                    setErrorFromDataBase(response.data.err || "An error occurred");
                }
            } catch (error) {
                setErrorFromDataBase(error instanceof Error ? error.message : "An error occurred");
            }
        },
    });

    // Handle star rating selection
    const handleRating = (rate: number) => {
        setRating(rate);
        formik.setFieldValue('rate', rate);
    };

    // Handle file input change for avatar
    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            setAvatar(event.currentTarget.files[0]);
        }
    };


    return (
        <main className={styles.testimonials}>
            <Image src="/assets/backgrounds/1.jpg"
                height={1000}
                width={1920}
                alt='register background'
                placeholder='blur'
                blurDataURL='/assets/backgrounds/1.jpg'
            />
            <form onSubmit={formik.handleSubmit} className={styles.testimonials__form}>
                <div className={styles.testimonials__form__group}>
                    <div className={styles.register__form__group_column}>
                        <label htmlFor="userName"> Name </label>
                        <input
                            type="text"
                            name="userName"
                            onChange={formik.handleChange}
                            value={formik.values.userName}
                            placeholder="Name"
                        />
                    </div>
                    <div className={styles.register__form__group_column}>
                        <label htmlFor="email"> Email </label>
                        <input
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            placeholder="Email"
                        />
                    </div>
                </div>
                {formik.errors.userName && formik.touched.userName && <div className={styles.error}>{formik.errors.userName}</div>}
                {formik.errors.email && formik.touched.email && <div className={styles.error}>{formik.errors.email}</div>}
                <div className={styles.register__form__group_column}>
                    <label> Rate </label>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} onClick={() => handleRating(star)} style={{ color: rating >= star ? 'gold' : 'grey' }}>
                            {rating >= star ? '★' : '☆'}
                        </span>
                    ))}
                </div>
                {formik.errors.rate && formik.touched.rate && <div className={styles.error}>{formik.errors.rate}</div>}
                <div className={styles.register__form__group_column}>
                    <label htmlFor="description"> Description </label>
                    <textarea
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        placeholder="Description"
                    />
                </div>
                {formik.errors.description && formik.touched.description && <div className={styles.error}>{formik.errors.description}</div>}

                <div className={styles.register__form__group_column}>
                    <label htmlFor="avatar"> Avatar </label>
                    <input
                        type="file"
                        name="avatar"
                        onChange={handleAvatarChange}
                    />
                    {avatar && (
                        <div className={styles.testimonials__form__group__avatar}>
                            <Image src={URL.createObjectURL(avatar)}
                                height={100}
                                width={100}
                                alt='avatar'
                            />
                        </div>
                    )}
                </div>
                <button type="submit" className={styles.register__btn} disabled={formik.isSubmitting}> {formik.isSubmitting ? 'Submitting...' : 'Submit'}</button>
            </form>
            {errorFromDataBase && <div className={styles.error}>{errorFromDataBase}</div>}
        </main>
    );
};

export default CreateTestimonials;
