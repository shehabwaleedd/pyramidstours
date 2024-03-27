'use client'
import React, { useState, useEffect } from 'react'
import { Formik, Form, FieldArray, ErrorMessage, Field, useField, useFormikContext } from 'formik';
import axios from 'axios'
import styles from "./page.module.scss"
import { IoIosRemoveCircleOutline, IoIosAddCircleOutline } from "react-icons/io";
import Image from 'next/image';
import { DynamicFieldArrayProps, Option, ImageUploaderProps, FormValues, CustomFieldProps, PricingOptionsProps, ImagesUploaderProps, CheckboxGroupFieldArrayProps } from '@/types/createTour';
import { repeatedTimes, duration, presetOptionNames, presetWeekDays, presetInclusions, presetExclusions } from './components/presets';


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
    tourParticipants: [],
};


const DynamicFieldArray: React.FC<DynamicFieldArrayProps> = ({ name, label, fieldType, options }) => {
    const { values, setFieldValue } = useFormikContext<any>(); // Use your form values interface instead of any
    const [field, , helpers] = useField<Option[]>(name);

    return (
        <FieldArray name={name}>
            {({ push, remove }) => (
                <div className={styles.formField}>
                    <label>{label}</label>
                    {field.value.map((option, index) => (
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
        <div className={styles.formField}>
            <label>{name}</label>
            <div className={styles.group}>
                {options.map((option, index) => (
                    <div key={index} className={styles.group}>
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
        </div>
    );
};






const CustomField: React.FC<CustomFieldProps> = ({ name, label, type = "text", fieldType = "input", setFieldValue, options, onChange }) => {
    if (type === "file") {
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
                    <Field id={name} name={name} type={type}
                        placeholder={label}
                    />
                )}
                <ErrorMessage name={name} component="div" className={styles.error} />
            </div>
        );
    }
};


const PricingOptions: React.FC<PricingOptionsProps> = ({ name }) => {
    const { values } = useFormikContext<FormValues>();
    const isAdultPricing = name === 'adultPricing';

    return (
        <div className={styles.formField}>
            <label>{isAdultPricing ? 'Adults Pricing' : 'Children Pricing'}</label>
            <div className={styles.group}>
                <fieldset>
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
                                    type="button"
                                    onClick={() => push(isAdultPricing ? { adults: values[name].length + 1, price: 0 } : { children: values[name].length + 1, price: 0 })}
                                >
                                    Add {isAdultPricing ? 'Adult Pricing' : 'Children Pricing'}
                                </button>
                            </>
                        )}
                    </FieldArray>
                </fieldset>
            </div>
        </div>
    );
};



const ImageUploader: React.FC<ImageUploaderProps> = ({ mainImg, setMainImg }) => {

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setMainImg(file);
    };

    return (
        <div className={styles.createEvent__container_content}>
            <label htmlFor="mainImg">Event&apos;s Main Image</label>
            <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
            />
            {mainImg && (
                <Image
                    src={URL.createObjectURL(mainImg)}
                    alt="Event Main Image"
                    title='Event Main Image'
                    width={500}
                    height={500}
                />
            )}
        </div>
    );
};

const ImagesUploader: React.FC<ImagesUploaderProps> = ({ uploadedImages, setUploadedImages }) => {

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedImages(Array.from(e.target.files));
        }
    };

    return (
        <div className={styles.createEvent__container_content}>
            <label htmlFor="images">Event&apos;s Gallery Images</label>
            <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                multiple
            />
            {uploadedImages.map((image, index) => (
                <Image
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Event Gallery Image ${index + 1}`}
                    title={`Event Gallery Image ${index + 1}`}
                    width={500}
                    height={500}
                />
            ))}
        </div>
    );
}


const CreateTour = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
    const [mainImg, setMainImg] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setMainImg(e.target.files[0]);
        }
    };





    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Unauthorized");
            return;
        }

        console.log("Main image:", mainImg);
        console.log("Uploaded images:", uploadedImages);
        console.log("Adult pricing:", values.adultPricing);
        console.log("Children pricing:", values.childrenPricing);


        const formData = new FormData();
        // Append gallery images
        uploadedImages.forEach((file, index) => {
            formData.append(`images`, file);
        });
        if (mainImg) {
            formData.append('mainImg', mainImg);
        }

        values.adultPricing.forEach((item, index) => {
            formData.append(`adultPricing[${index}][adults]`, item.adults?.toString() ?? '0');
            formData.append(`adultPricing[${index}][price]`, item.price.toString());
        });

        values.childrenPricing.forEach((item, index) => {
            formData.append(`childrenPricing[${index}][children]`, item.children?.toString() ?? '0');
            formData.append(`childrenPricing[${index}][price]`, item.price.toString());
        });




        Object.keys(values).forEach(key => {
            if (key !== "mainImg" && key !== "images") {
                const value = values[key];
                if (typeof value === "object" && !Array.isArray(value) && value !== null) {
                    Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                        // Assert that nestedValue is a string or Blob, as required by formData.append
                        if (typeof nestedValue === "string" || nestedValue instanceof Blob) {
                            formData.append(`${key}[${nestedKey}]`, nestedValue);
                        }
                    });
                } else if (Array.isArray(value)) {
                    value.forEach((item, index) => {
                        if (typeof item === "object" && item !== null) {
                            Object.entries(item).forEach(([nestedKey, nestedValue]) => {
                                // Ensure nestedValue is converted to a string or is a Blob
                                if (typeof nestedValue === "string" || nestedValue instanceof Blob) {
                                    formData.append(`${key}[${index}][${nestedKey}]`, nestedValue.toString());
                                }
                            });
                        } else {
                            // Assert that item is a string for formData.append
                            formData.append(`${key}[${index}]`, item.toString());
                        }
                    });
                } else {
                    // Assert value is a string, as formData.append requires string or Blob
                    formData.append(key, value.toString());
                }
            }
        });

        try {
            setLoading(true);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/tour`, formData, {
                headers: {
                    token,
                    'Content-Type': 'multipart/form-data' // If you are sending files, make sure to set this
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
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, isSubmitting, setFieldValue }) => ( // Add setFieldValue here
                    <section className={styles.createTour__container}>
                        <Form className={styles.createTour__container_content}>
                            <div className={styles.group}>
                                <CustomField name="title" setFieldValue={setFieldValue} label='title' fieldType="input" />
                                <CustomField name="duration" setFieldValue={setFieldValue} fieldType="select" options={duration.map((time) => ({ value: time, label: time }))} label='Duration' />
                            </div>
                            <CustomField name="description" fieldType="textarea" setFieldValue={setFieldValue} label='Description' />
                            <ImageUploader mainImg={mainImg} setMainImg={setMainImg} />
                            <ImagesUploader uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />
                            <DynamicFieldArray name="options" label="Options" fieldType="select" options={presetOptionNames.map((opt) => ({ value: opt.name, label: opt.name }))} />
                            <div className={styles.formField}>
                                <CheckboxGroupFieldArray name="inclusions" options={presetInclusions.map((inc) => ({ value: inc, label: inc }))} setFieldValue={setFieldValue} values={values.inclusions} />
                                <CheckboxGroupFieldArray name="exclusions" options={presetExclusions.map((exc) => ({ value: exc, label: exc }))} setFieldValue={setFieldValue} values={values.exclusions} />
                            </div>
                            <PricingOptions name="adultPricing" />
                            <PricingOptions name="childrenPricing" />
                            <CustomField name="subtitle" setFieldValue={setFieldValue} fieldType="textarea" label='Subtitle (optional)' />
                            <CheckboxGroupFieldArray name="repeatDays" options={presetWeekDays} setFieldValue={setFieldValue} values={values.repeatDays} />
                            <CheckboxGroupFieldArray name="repeatTime" options={repeatedTimes} setFieldValue={setFieldValue} values={values.repeatTime} />
                            <div className={styles.group}>
                                <CustomField name="location.from" setFieldValue={setFieldValue} fieldType="input" label='Starting location' />
                                <CustomField name="location.to" setFieldValue={setFieldValue} fieldType="input" label='Destination' />
                            </div>
                            <CustomField name="dateDetails" fieldType="textarea" setFieldValue={setFieldValue} label='Date Details (e.g. "Every Monday and Friday from 9:00 AM to 5:00 PM")' />
                            <CustomField name="isRepeated" type="checkbox" fieldType="input" setFieldValue={setFieldValue} label='Is this tour repeated?' />
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