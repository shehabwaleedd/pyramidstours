'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Formik, Form } from 'formik';
import axios from 'axios';
import styles from "./page.module.scss"
import { useTourById } from '@/lib/tours/useTourById';
import Loading from '../../../../../animation/loading/Loading';
import Link from 'next/link';
import { IoArrowBack } from "react-icons/io5";
import { Img, ImageFile, CurrentImage } from '@/types/editTour';
import { FormValues } from '@/types/createTour';
import { repeatedTimes, duration, presetOptionNames, presetWeekDays, presetInclusions, categoryOptions, presetExclusions, presetLocations } from '../../createTour/components/presets';
import DynamicFieldArray from '../../createTour/components/DynamicFieldArray';
import CustomField from '../../createTour/components/CustomField';
import CheckboxGroupFieldArray from '../../createTour/components/ChecboxGroupFieldArray';
import PricingOptions from '../../createTour/components/PricingOptions';
import ImagesUploader from './components/EditImagesUploader';
import ImageUploader from './components/EditImageUploader';
import ReactQuillField from '../../createTour/components/ReactQuillField';


const EditTour = () => {
    const router = useRouter();
    const [mainImgUrl, setMainImgUrl] = useState<string | null>(null);
    const [mainImg, setMainImg] = useState<File | null>(null);
    const [newImageFiles, setNewImageFiles] = useState<ImageFile[]>([]);
    const { id } = useParams();
    const { tour, loading } = useTourById(id as string);

    useEffect(() => {
        if (tour) {
            setMainImgUrl(tour.mainImg.url);
            setNewImageFiles(tour.images.map((img: CurrentImage) => ({ file: new File([], ''), previewUrl: img.url })));
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
        location: {
            from: tour?.location.from ?? '',
            to: tour?.location.to ?? ''
        },
        inclusions: tour?.inclusions ?? [],
        exclusions: tour?.exclusions ?? [],
        adultPricing: tour?.adultPricing ?? [],
        childrenPricing: tour?.childrenPricing ?? [],
        duration: tour?.duration ?? [],
        hasOffer: tour?.hasOffer ?? false,
        historyBrief: tour?.historyBrief ?? '',
        category: tour?.category ?? '',
        tags: tour?.tags ?? [],
        itinerary: tour?.itinerary ?? '',
        mapDetails: tour?.mapDetails ?? '',

    };

    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const formData = new FormData();
        newImageFiles.forEach((image) => {
            formData.append('images', image.file);
        })

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
                if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
                    // For nested objects like location
                    Object.keys(value).forEach(subKey => {
                        formData.append(`${key}[${subKey}]`, value[subKey]);
                    });
                } else if (Array.isArray(value)) {
                    value.forEach((item, index) => {
                        if (typeof item === 'object') {
                            Object.keys(item).forEach(subKey => {
                                formData.append(`${key}[${index}][${subKey}]`, item[subKey].toString());
                            });
                        } else {
                            formData.append(`${key}[${index}]`, item);
                        }
                    });
                } else {
                    formData.append(key, value.toString());
                }
            }
        });

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const token = localStorage.getItem('token');
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/tour/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token
                },
            });
            if (response.status === 200 && response.data.message === 'success') {
                router.push('/account');
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
                    <Link href="/account" aria-label="Go back to account page">
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
                                <div className={styles.group}>
                                    <CustomField name="title" label="Title" fieldType='input' />
                                    <CustomField name="duration" label="Duration" fieldType='select' options={duration.map((d) => ({ value: d, label: d }))} />
                                </div>
                                <ReactQuillField name="description" label="Description" value={values.description} onChange={setFieldValue} />
                                <div className={styles.group}>
                                    <CustomField name="location.from" setFieldValue={setFieldValue} fieldType="select" label='Starting location' options={presetLocations.map((loc) => ({ value: loc.value, label: loc.label }))} />
                                    <CustomField name="location.to" setFieldValue={setFieldValue} fieldType="select" label='Destination' options={presetLocations.map((loc) => ({ value: loc.value, label: loc.label }))} />
                                </div>
                                <ImageUploader mainImg={mainImg} setMainImg={setMainImg} mainImgUrl={mainImgUrl} setMainImgUrl={setMainImgUrl} />
                                <ImagesUploader uploadedImages={newImageFiles} setUploadedImages={setNewImageFiles} />
                                <DynamicFieldArray name="options" label="Options" fieldType="select" options={presetOptionNames.map((opt) => ({ value: opt.name, label: opt.name }))} />
                                <CheckboxGroupFieldArray name="repeatTime" options={repeatedTimes} setFieldValue={setFieldValue} values={values.repeatTime} />
                                <CheckboxGroupFieldArray name="repeatDays" options={presetWeekDays} setFieldValue={setFieldValue} values={values.repeatDays} />
                                <CustomField name="category" label="Category" fieldType='select' options={categoryOptions.map((cat) => ({ value: cat.value, label: cat.label }))} />
                                <ReactQuillField name="historyBrief" label="History Brief" value={values.historyBrief} onChange={setFieldValue} />
                                <ReactQuillField name="itinerary" label="Itinerary" value={values.itinerary} onChange={setFieldValue} />
                                <CustomField name="mapDetails" label="Google Map Link" fieldType='input' />
                                <div className={styles.formField}>
                                    <CheckboxGroupFieldArray name="inclusions" options={presetInclusions.map((inc) => ({ value: inc, label: inc }))} setFieldValue={setFieldValue} values={values.inclusions} />
                                    <CheckboxGroupFieldArray name="exclusions" options={presetExclusions.map((inc) => ({ value: inc, label: inc }))} setFieldValue={setFieldValue} values={values.exclusions} />
                                    <CheckboxGroupFieldArray name="tags" options={categoryOptions.map((cat) => ({ value: cat.value, label: cat.label }))} setFieldValue={setFieldValue} values={values.tags} />
                                </div>
                                <div className={styles.group}>
                                    <PricingOptions name="adultPricing" />
                                    <PricingOptions name="childrenPricing" />
                                </div>
                                <div className={styles.group}>
                                    <CustomField name="hasOffer" label="Is Offer" fieldType='checkbox' />
                                    <CustomField name='isRepeated' label='Is Repeated' fieldType='checkbox' />
                                </div>
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