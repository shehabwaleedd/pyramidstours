'use client'
import React, { useState } from 'react'
import { Formik, Form } from 'formik';
import axios from 'axios'
import styles from "./page.module.scss"
import Image from 'next/image';
import { ImageFile, FormValues } from '@/types/createTour';
import { repeatedTimes, duration, presetOptionNames, presetWeekDays, presetInclusions, presetExclusions } from './components/presets';
import DynamicFieldArray from './components/DynamicFieldArray';
import CheckboxGroupFieldArray from './components/ChecboxGroupFieldArray';
import CustomField from './components/CustomField';
import PricingOptions from './components/PricingOptions';
import ImageUploader from './components/ImageUploader';
import ImagesUploader from './components/ImagesUploader';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'; // Add this import for styles
import ReactQuillField from './components/ReactQuillField';

const initialValues: FormValues = {
    title: '',
    description: '',
    mainImg: null,
    images: [],
    options: [{ name: '', price: 0 }],
    isRepeated: false,
    repeatTime: [],
    repeatDays: [],
    dateDetails: '',
    location: { from: '', to: '' },
    inclusions: [],
    exclusions: [],
    adultPricing: [{ adults: 1, price: 0 }],
    childrenPricing: [{ children: 1, price: 0 }],
    duration: [],
    subtitle: '',
    hasOffer: false,
};




const CreateTour = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [uploadedImages, setUploadedImages] = useState<ImageFile[]>([]);
    const [mainImg, setMainImg] = useState<File | null>(null);

    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Unauthorized");
            return;
        }
        const formData = new FormData();
        uploadedImages.forEach((file, index) => {
            formData.append(`images`, file.file);
        });
        if (mainImg) {
            formData.append('mainImg', mainImg);
        }

        values.adultPricing.forEach((item: { adults: { toString: () => any; }; price: { toString: () => string | Blob; }; }, index: any) => {
            formData.append(`adultPricing[${index}][adults]`, item.adults?.toString() ?? '0');
            formData.append(`adultPricing[${index}][price]`, item.price.toString());
        });

        values.childrenPricing.forEach((item: { children: { toString: () => any; }; price: { toString: () => string | Blob; }; }, index: any) => {
            formData.append(`childrenPricing[${index}][children]`, item.children?.toString() ?? '0');
            formData.append(`childrenPricing[${index}][price]`, item.price.toString());
        });


        Object.keys(values).forEach(key => {
            if (key !== "mainImg" && key !== "images") {
                const value = values[key];
                if (typeof value === "object" && !Array.isArray(value) && value !== null) {
                    Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                        if (typeof nestedValue === "string" || nestedValue instanceof Blob) {
                            formData.append(`${key}[${nestedKey}]`, nestedValue);
                        }
                    });
                } else if (Array.isArray(value)) {
                    value.forEach((item, index) => {
                        if (typeof item === "object" && item !== null) {
                            Object.entries(item).forEach(([nestedKey, nestedValue]) => {
                                if (typeof nestedValue === "string" || nestedValue instanceof Blob) {
                                    formData.append(`${key}[${index}][${nestedKey}]`, nestedValue.toString());
                                }
                            });
                        } else {
                            formData.append(`${key}[${index}]`, item.toString());
                        }
                    });
                } else {
                    formData.append(key, value.toString());
                }
            }
        });


        try {
            setLoading(true);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/tour`, formData, {
                headers: {
                    token,
                    'Content-Type': 'multipart/form-data'
                },
            });
            if (response.status === 200) {
                setSuccess(true);
            }
        } catch (error: any) {
            setError(error.response?.data?.message || error.response?.err);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    }

    return (
        <main className={styles.createTour}>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">Tour created successfully!</p>}
            <section className={styles.createTour__upper}>
                <Image src="/assets/backgrounds/2.jpg" alt="Create Tour" width={1920} height={1080} />
            </section>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, isSubmitting, setFieldValue }) => (
                    <section className={styles.createTour__container}>
                        <Form className={styles.createTour__container_content}>
                            <div className={styles.group}>
                                <CustomField name="title" setFieldValue={setFieldValue} label='title' fieldType="input" />
                                <CustomField name="duration" setFieldValue={setFieldValue} fieldType="select" options={duration.map((time) => ({ value: time, label: time }))} label='Duration' />
                            </div>
                            <ReactQuillField name="description" label="Description" value={values.description} onChange={setFieldValue} />
                            <ImageUploader mainImg={mainImg} setMainImg={setMainImg} />
                            <ImagesUploader uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />
                            <DynamicFieldArray name="options" label="Options" fieldType="select" options={presetOptionNames.map((opt) => ({ value: opt.name, label: opt.name }))} />
                            <div className={styles.formField}>
                                <CheckboxGroupFieldArray name="inclusions" options={presetInclusions.map((inc) => ({ value: inc, label: inc }))} setFieldValue={setFieldValue} values={values.inclusions} />
                                <CheckboxGroupFieldArray name="exclusions" options={presetExclusions.map((exc) => ({ value: exc, label: exc }))} setFieldValue={setFieldValue} values={values.exclusions} />
                            </div>
                            <div className={styles.group}>
                                <PricingOptions name="adultPricing" />
                                <PricingOptions name="childrenPricing" />
                            </div>
                            <ReactQuillField name="subtitle" label="Iternary" value={values.subtitle} onChange={setFieldValue} />
                            <CheckboxGroupFieldArray name="repeatDays" options={presetWeekDays} setFieldValue={setFieldValue} values={values.repeatDays} />
                            <CheckboxGroupFieldArray name="repeatTime" options={repeatedTimes} setFieldValue={setFieldValue} values={values.repeatTime} />
                            <div className={styles.group}>
                                <CustomField name="location.from" setFieldValue={setFieldValue} fieldType="input" label='Starting location' />
                                <CustomField name="location.to" setFieldValue={setFieldValue} fieldType="input" label='Destination' />
                            </div>
                            <CustomField name="dateDetails" fieldType="textarea" setFieldValue={setFieldValue} label='Date Details (e.g. "Every Monday and Friday from 9:00 AM to 5:00 PM")' />
                            <div className={styles.groupCheckboxes}>
                                <CustomField name="isRepeated" fieldType="checkbox" setFieldValue={setFieldValue} label='Is this tour repeated?' />
                                <CustomField name="hasOffer" fieldType="checkbox" setFieldValue={setFieldValue} label='Is this tour has an offer?' />
                            </div>
                            <button type="submit" className={styles.submitButton} disabled={isSubmitting || loading}>
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </Form>
                    </section>
                )}
            </Formik>
        </main >
    )
}

export default CreateTour