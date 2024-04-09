'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Formik, Form} from 'formik';
import axios from 'axios';
import styles from "./page.module.scss"
import { useTourById } from '@/lib/tours/useTourById';
import Loading from '../../../../../animation/loading/Loading';
import Link from 'next/link';
import { IoArrowBack } from "react-icons/io5";
import {  FormValues, Img, ImageFile, CurrentImage } from '@/types/editTour';
import { repeatedTimes, duration, presetOptionNames, presetWeekDays, presetInclusions, presetExclusions } from '../../createTour/components/presets';
import DynamicFieldArray from '../../createTour/components/DynamicFieldArray';
import CustomField from '../../createTour/components/CustomField';
import CheckboxGroupFieldArray from '../../createTour/components/ChecboxGroupFieldArray';
import PricingOptions from '../../createTour/components/PricingOptions';
import ImagesUploader from './components/EditImagesUploader';
import ImageUploader from './components/EditImageUploader';



const EditTour = () => {
    const router = useRouter();
    const [mainImgUrl, setMainImgUrl] = useState<string | null>(null);
    const [mainImg, setMainImg] = useState<File | null>(null);
    const [newImageFiles, setNewImageFiles] = useState<ImageFile[]>([]);
    const [currentImages, setCurrentImages] = useState<CurrentImage[]>([])
    const { id } = useParams();
    const { tour, loading } = useTourById(id as string);

    useEffect(() => {
        if (tour) {
            const mappedImages: CurrentImage[] = tour.images.map((image: Img) => ({
                url: image.url,
                public_id: image.public_id, 
            }));
            setCurrentImages(mappedImages);
            setMainImgUrl(tour.mainImg.url);
        }
    }, [tour]);


    const initialValues: FormValues = {
        title: tour?.title ?? '',
        description: tour?.description ?? '',
        mainImg: null,
        images: [],
        options: tour?.options.map(option => ({
            name: option.name,
            price: option.price || 0, 
        })) || [],
        isRepeated: tour?.isRepeated ?? false,
        repeatTime: tour?.repeatTime ?? [],
        repeatDays: tour?.repeatDays ?? [],
        dateDetails: tour?.dateDetails ?? '',
        location: {
            from: tour?.location.from ?? '',
            to: tour?.location.to ?? ''
        },
        inclusions: tour?.inclusions ?? [],
        exclusions: tour?.exclusions ?? [],
        adultPricing: tour?.adultPricing ?? [],
        childrenPricing: tour?.childrenPricing ?? [],
        duration: tour?.duration ?? [],
        subtitle: tour?.subtitle ?? '',
        hasOffer: tour?.hasOffer ?? false,

    };

    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const formData = new FormData();
        newImageFiles.forEach((file, index) => {
            formData.append(`images`, file.file);
        });
        if (mainImg && mainImg instanceof File) {
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
            if (key !== "mainImg" && key !== "images" && key !== "adultPricing" && key !== "childrenPricing") {
                const value = values[key];
                if (typeof value === "object" && !Array.isArray(value) && value !== null) {
                    Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                        if (nestedKey !== "_id" && (typeof nestedValue === "string" || nestedValue instanceof Blob)) {
                            formData.append(`${key}[${nestedKey}]`, nestedValue);
                        }
                    });
                } else if (Array.isArray(value)) {
                    value.forEach((item, index) => {
                        if (typeof item === "object" && item !== null) {
                            Object.entries(item).forEach(([nestedKey, nestedValue]) => {
                                if (nestedKey !== "_id" && (typeof nestedValue === "string" || nestedValue instanceof Blob)) {
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
        const token = localStorage.getItem('token');
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/tour/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token
                },
            });
            if (response.status === 200 && response.data.message === 'success') {
                router.push('/account/tours');
            } else {
                throw new Error(response.data.err || 'An error occurred');
            }
        } catch (error) {
            console.error('Error updating tour:', error);
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <main className={styles.editTour}>
            <div className={styles.editTour__container}>
                <div className={styles.group}>
                    <Link href="/account/tours">
                        <IoArrowBack />
                    </Link>
                    <h1>Edit Tour</h1>
                </div>
                {loading ? <Loading height={100} /> : (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit} className={styles.form}>
                        {({ values, setFieldValue, isSubmitting }) => (
                            <Form className={styles.editTour__container_content}>
                                <CustomField name="title" label="Title" fieldType='input' />
                                <CustomField name="description" label="Description" fieldType="textarea" />
                                <ImageUploader mainImg={mainImg} setMainImg={setMainImg} mainImgUrl={mainImgUrl} setMainImgUrl={setMainImgUrl} />
                                <ImagesUploader uploadedImages={newImageFiles} setUploadedImages={setNewImageFiles} currentImages={currentImages} setCurrentImages={setCurrentImages} />
                                <DynamicFieldArray name="options" label="Options" fieldType="select" options={presetOptionNames.map((opt) => ({ value: opt.name, label: opt.name }))} />
                                <CheckboxGroupFieldArray name="repeatTime" options={repeatedTimes} setFieldValue={setFieldValue} values={values.repeatTime} />
                                <CheckboxGroupFieldArray name="repeatDays" options={presetWeekDays} setFieldValue={setFieldValue} values={values.repeatDays} />
                                <CustomField name="dateDetails" label="Date Details" fieldType="textarea" />
                                <div className={styles.group}>
                                    <CustomField name="location.from" setFieldValue={setFieldValue} fieldType="input" label='Starting location' />
                                    <CustomField name="location.to" setFieldValue={setFieldValue} fieldType="input" label='Destination' />
                                </div>
                                <CheckboxGroupFieldArray name="inclusions" options={presetInclusions.map((inc) => ({ value: inc, label: inc }))} setFieldValue={setFieldValue} values={values.inclusions} />
                                <CheckboxGroupFieldArray name="exclusions" options={presetExclusions.map((inc) => ({ value: inc, label: inc }))} setFieldValue={setFieldValue} values={values.exclusions} />
                                <div className={styles.group}>
                                    <PricingOptions name="adultPricing" />
                                    <PricingOptions name="childrenPricing" />
                                </div>
                                <CustomField name="duration" label="Duration" fieldType='select' options={duration.map((d) => ({ value: d, label: d }))} />
                                <CustomField name="subtitle" label="Subtitle" fieldType='textarea' />
                                <CustomField name="hasOffer" label="Is Offer" fieldType='checkbox' />
                                <button type="submit" disabled={isSubmitting} className={styles.submitButton}>{isSubmitting ? 'Updating...' : 'Update Tour'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </main>
    )
}

export default EditTour