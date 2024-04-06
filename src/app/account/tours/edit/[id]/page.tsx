'use client'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Formik, Form, FieldArray, ErrorMessage, Field, useField, useFormikContext, } from 'formik';
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io';
import axios from 'axios';
import styles from "./page.module.scss"
import Image from 'next/image';
import { useTourById } from '@/lib/tours/useTourById';
import Loading from '../../../../../animation/loading/Loading';
import Link from 'next/link';
import { IoArrowBack } from "react-icons/io5";
import { DynamicFieldArrayProps, Option, FormValues, CustomFieldProps, PricingOptionsProps, ImageUploaderProps, ImageFile, CheckboxGroupFieldArrayProps, ImagesUploaderProps } from '@/types/editTour';
import { repeatedTimes, duration, presetOptionNames, presetWeekDays, presetInclusions, presetExclusions } from '../../createTour/components/presets';




const CustomField: React.FC<CustomFieldProps> = ({ name, label, fieldType = "input", setFieldValue, options, onChange }) => {
    if (fieldType === "file") {
        return (
            <div className={styles.formField}>
                <label htmlFor={name}>{label}</label>
                <input
                    id={name}
                    name={name}
                    type="file"
                    onChange={onChange}
                    accept="image/*"
                    multiple={name === "images"}
                />
                <ErrorMessage name={name} component="div" className={styles.error} />
            </div>
        );
    } else if (fieldType === "select" && options) {
        return (
            <div className={styles.formField}>
                <label htmlFor={name}>{label}</label>
                <Field as="select" name={name}>
                    <option value="">Select {name}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </Field>
                <ErrorMessage name={name} component="div" className={styles.error} />
            </div>
        );
    } else {
        return (
            <div className={styles.formField}>
                <label htmlFor={name}>{label}</label>
                {fieldType === "textarea" ? (
                    <Field as="textarea" id={name} name={name}
                        placeholder={label}
                    />
                ) : (
                    <Field id={name} name={name} type={fieldType}
                        placeholder={label}
                    />
                )}
                <ErrorMessage name={name} component="div" className={styles.error} />
            </div>
        );
    }
};

const DynamicFieldArray: React.FC<DynamicFieldArrayProps> = ({ name, label, fieldType, options }) => {
    const { values, setFieldValue } = useFormikContext<any>(); // Use your form values interface instead of any
    const [field] = useField<Option[]>(name);

    return (
        <FieldArray name={name}>
            {({ push, remove }) => (
                <div className={styles.formField}>
                    <label>{label}</label>
                    {Array.isArray(field.value) && field.value.map((option, index) => (
                        <div key={index} className={styles.group}>
                            {fieldType === 'select' && options ? (
                                <select
                                    value={option.name}
                                    onChange={(e) => setFieldValue(`${name}[${index}].name`, e.target.value)}
                                >
                                    <option value="">Select an Option</option>
                                    {options.map((o: { value: string; label: string }, idx: number) => (
                                        <option key={idx} value={o.value}>{o.label}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    value={option.name}
                                    onChange={(e) => setFieldValue(`${name}[${index}].name`, e.target.value)}
                                />
                            )}
                            <input
                                type="number"
                                value={option.price}
                                onChange={(e) => setFieldValue(`${name}[${index}].price`, Number(e.target.value))}
                                placeholder="Price"
                            />
                            <button type="button" onClick={() => remove(index)}><IoIosRemoveCircleOutline /></button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => push({ name: options?.[0].value || '', price: 0 })}
                    >
                        <IoIosAddCircleOutline /> Add {label}
                    </button>
                    <ErrorMessage name={name} component="div" className={styles.error} />
                </div>
            )}


        </FieldArray>
    );
};

const CheckboxGroupFieldArray: React.FC<CheckboxGroupFieldArrayProps> = ({ name, options, setFieldValue, values }) => {

    const handleChange = (optionValue: string) => {
        const newValues = values.includes(optionValue)
            ? values.filter((value) => value !== optionValue)
            : [...values, optionValue];
        setFieldValue(name, newValues);
    };

    return (
        <div className={styles.checkboxField}>
            <label>{name}</label>
            <div className={styles.group}>
                {options.map((option, index) => (
                    <div key={index} className={styles.groupCheckboxes}>
                        <label>
                            {option.label}
                        </label>
                        <input
                            type="checkbox"
                            name={name}
                            value={option.value}
                            checked={values.includes(option.value)}
                            onChange={() => handleChange(option.value)}
                        />
                    </div>
                ))}
            </div>
            <ErrorMessage name={name} component="div" className={styles.error} />
        </div>
    );
};

const ImagesUploader: React.FC<ImagesUploaderProps> = ({
    uploadedImages,
    setUploadedImages,
    currentImages,
    setCurrentImages,
}) => {


    const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const files = event.target.files;
        if (files) {
            const fileArray = Array.from(files).map((file) => ({
                file,
                previewUrl: URL.createObjectURL(file),
            }));
            setUploadedImages([...uploadedImages, ...fileArray]);
        }
    };

    const handleRemoveUploaded = (index: number) => {
        const newImages = [...uploadedImages];
        newImages.splice(index, 1);
        setUploadedImages(newImages);
    };

    const handleRemoveCurrent = (index: number) => {
        const newImages = [...currentImages];
        newImages.splice(index, 1);
        setCurrentImages(newImages);
    };

    return (
        <div className={styles.pricingField}>
            <input type="file" onChange={handleImageChange} accept="image/*" />
            <div className={styles.formField}>
                <h4>Uploaded Images:</h4>
                {uploadedImages.map((image, index) => (
                    <div key={index}>
                        <Image src={image.previewUrl} alt="Uploaded image" width={500} height={500} />
                        <button onClick={() => handleRemoveUploaded(index)}>Remove</button>
                    </div>
                ))}
            </div>
            <div className={styles.formField}>
                <h4>Current Images:</h4>
                <div className={styles.group}>
                    {currentImages?.map((image, index) => (
                        <div key={index} className={styles.formField}>
                            <Image src={image.url} alt="Current image" width={500} height={500} />
                            <button onClick={() => handleRemoveCurrent(index)}>Remove</button>
                        </div>
                    ))}
                </div>
            </div>
            <ErrorMessage name="images" component="div" className={styles.error} />
        </div>
    );
};


const ImageUploader: React.FC<ImageUploaderProps> = ({ mainImg, setMainImg }) => {

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setMainImg(file);
    };

    return (
        <div className={styles.pricingField}>
            <label htmlFor="mainImg">Event&apos;s Main Image</label>
            <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
            />
            {mainImg && (
                <Image
                    src={mainImg.url}
                    alt="Event Main Image"
                    title='Event Main Image'
                    width={500}
                    height={500}
                />
            )}
        </div>
    );
};

const PricingOptions: React.FC<PricingOptionsProps> = ({ name }) => {
    const { values } = useFormikContext<FormValues>();
    const isAdultPricing = name === 'adultPricing';

    return (
        <div className={styles.pricingField}>
            <label>{isAdultPricing ? 'Adults Pricing' : 'Children Pricing'}</label>
            <div className={styles.formField}>
                <legend>{isAdultPricing ? 'Adults Pricing' : 'Children Pricing'}</legend>
                <FieldArray name={name}>
                    {({ push, remove }) => (
                        <>
                            {values[name].map((item, index) => (
                                <div key={index} className={styles.formField}>
                                    <label htmlFor={`${name}[${index}].price`}>{index + 1} {isAdultPricing ? 'Adult(s)' : 'Child(ren)'}</label>
                                    <Field
                                        name={`${name}[${index}].price`}
                                        type="number"
                                        className={styles.inputField}
                                        placeholder={`Price for ${index + 1} ${isAdultPricing ? 'adult(s)' : 'child(ren)'}`}
                                    />
                                    <button type="button" onClick={() => remove(index)}>Remove</button>
                                </div>
                            ))}
                            <button
                                className={styles.addbtn}
                                type="button"
                                onClick={() => push(isAdultPricing ? { adults: values[name].length + 1, price: 0 } : { children: values[name].length + 1, price: 0 })}>
                                Add {isAdultPricing ? 'Adult Pricing' : 'Children Pricing'}
                            </button>
                        </>
                    )}
                </FieldArray>

                <ErrorMessage name={name} component="div" className={styles.error} />
            </div>
        </div>
    );
};


const EditTour = () => {
    const router = useRouter();
    const [mainImg, setMainImg] = useState<File | null>(null);
    const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
    const [imageFiles, setImageFiles] = useState<string[]>([]);
    const { id } = useParams();
    const { tour, loading } = useTourById(id as string);

    useEffect(() => {
        if (tour) {
            setMainImg(tour.mainImg);
            setImageFiles(tour.images);
        }
    }, [tour]);

    const initialValues: FormValues = {
        title: tour?.title ?? '',
        description: tour?.description ?? '',
        mainImg: null,
        images: [],
        options: tour?.options ?? [],
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

    };

    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const formData = new FormData();
        newImageFiles.forEach((file, index) => {
            formData.append(`images`, file);
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
                                <ImageUploader mainImg={mainImg} setMainImg={setMainImg} />
                                <ImagesUploader uploadedImages={newImageFiles} setUploadedImages={setNewImageFiles} currentImages={imageFiles} setCurrentImages={setImageFiles} />
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
                                <button type="submit" disabled={isSubmitting} className={styles.submitButton}>{isSubmitting ? 'Updating...' : 'Update Tour'}
                                </button>
                                {/* display errors */}

                            </Form>
                        )}


                    </Formik>
                )}
            </div>
        </main>
    )
}

export default EditTour