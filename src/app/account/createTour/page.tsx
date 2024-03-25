'use client'
import React, { useState, useEffect } from 'react'
import { Formik, Form, FieldArray, ErrorMessage, Field, useField, useFormikContext } from 'formik';
import axios from 'axios'
import styles from "./page.module.scss"
import { IoIosRemoveCircleOutline, IoIosAddCircleOutline } from "react-icons/io";

interface Image {
    url: string;
    public_id: string;
}
interface DynamicFieldArrayProps {
    name: string;
    label: string;
    fieldType: 'input' | 'select'; // Assuming we might still want the flexibility
    options?: Array<{ label: string; value: string }>; // For the select dropdown
}

interface Option {
    name?: string;
    price?: number;
}

interface PricingDetail {
    adults?: number;
    children?: number;
    pricePerPerson: number;
    totalPrice?: number; // Make optional if dynamically calculated
}


interface FormValues {
    title: string;
    description: string;
    mainImg: Image;
    images: Image[];
    options: Option[];
    isRepeated: boolean;
    repeatTime: number[];
    repeatDays: ("Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday")[];
    dateDetails?: string;
    location: {
        from: string;
        to: string;
    };
    inclusions: string[];
    exclusions: string[];
    adultPricing: PricingOption[];
    childrenPricing: PricingOption[];
    duration?: string[];
    subtitle?: string;
    tourParticipants: string[]; // Assuming you will use strings to represent ObjectId for simplicity
}

const initialValues: FormValues = {
    title: '',
    description: '',
    mainImg: { url: '', public_id: '' },
    images: [],
    options: [{ name: '', price: 0 }],
    isRepeated: false,
    repeatTime: [],
    repeatDays: [],
    dateDetails: '',
    location: { from: '', to: '' },
    inclusions: [],
    exclusions: [],
    adultPricing: [{ value: '1', pricePerPerson: 0 }],
    childrenPricing: [{ value: '1', pricePerPerson: 0 }],
    duration: [],
    subtitle: '',
    tourParticipants: [],
};

interface CustomFieldProps {
    name: string;
    label?: string;
    type?: 'text' | 'number' | 'select' | 'checkbox' | 'file';
    fieldType?: 'input' | 'textarea' | 'select'; // New prop to determine the field type
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
    options?: Array<{ label: string; value: string }>;
}

interface GroupSize {
    label: string;
    value: number;
}

interface PricingOption {
    value: string;
    pricePerPerson: number;
}

interface PricingOptionsProps {
    name: string; // The name of the field in the Formik form (e.g., "adultPricing" or "childrenPricing")
    groupSizes: GroupSize[];
}


const presetOptionNames = [
    { name: "Ticket for great pyramids" },
    { name: "Ticket for sphinx" },
    { name: "Ticket for egyptian museum" },
    { name: "Ticket for khan el khalili" },
    { name: "Ticket for citadel" },
    { name: "Ticket for mohamed ali mosque" },
    { name: "Ticket for coptic cairo" },
    { name: "Ticket for islamic cairo" },
    { name: "Ticket for al azhar park" },
    { name: "Ticket for al azhar mosque" },
    { name: "Ticket for cairo tower" },
    { name: "Ticket for nile cruise" },
    { name: "Ticket for felucca ride" },
    { name: "Ticket for sound and light show" },
    { name: "Ticket for camel ride" },
    { name: "Ticket for quad bike" },
    { name: "Ticket for hot air balloon" },
    { name: "Ticket for snorkeling" },
    { name: "Ticket for diving" },
    { name: "Ticket for parasailing" },
    { name: "Ticket for banana boat" },
    { name: "Ticket for glass boat" },
    { name: "Ticket for submarine" },
    { name: "Ticket for horse carriage" },
    { name: "Ticket for horse ride" },
    { name: "Ticket for buggy ride" },
    { name: "Ticket for sandboarding" },
    { name: "Ticket for desert safari" },
    { name: "Ticket for bedouin dinner" },
    { name: "Ticket for belly dance show" },
    { name: "Ticket for tanoura show" },
    { name: "Ticket for alabaster factory" },
    { name: "Ticket for papyrus institute" },
    { name: "Ticket for perfume factory" },
    { name: "Ticket for cotton shop" },
    { name: "Ticket for gold shop" },
    { name: "Ticket for silver shop" },
    { name: "Ticket for spice shop" },


];

const presetInclusions = [
    "Free Wi-Fi.",
    "Complimentary breakfast.",
    "Airport transfers.",
    "Welcome drink.",
    // Add more inclusions as needed...
];

const presetExclusions = [
    "Airfare not included.",
    "Dinner not included.",
    "Personal expenses not covered.",
    "Insurance not included.",
    // Add more exclusions as needed...
];

const presetWeekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]

const adultGroupSizes: GroupSize[] = [
    { label: "1 adult", value: 1 },
    { label: "2 adults", value: 2 },
    { label: "3 adults", value: 3 },
    { label: "4 adults", value: 4 },
    { label: "5 adults", value: 5 },
    { label: "6 adults", value: 6 },
    { label: "7 adults", value: 7 },
    { label: "8 adults", value: 8 },
    { label: "9 adults", value: 9 },
    { label: "10 adults", value: 10 }
];

const childrenGroupSizes: GroupSize[] = [
    { label: "1 child", value: 1 },
    { label: "2 children", value: 2 },
    { label: "3 children", value: 3 },
    { label: "4 children", value: 4 },
    { label: "5 children", value: 5 },
    { label: "6 children", value: 6 },
    { label: "7 children", value: 7 },
    { label: "8 children", value: 8 },
    { label: "9 children", value: 9 },
    { label: "10 children", value: 10 }
];


const repeatedTimes = [
    { label: "06:00", value: 6 },
    { label: "07:00", value: 7 },
    { label: "08:00", value: 8 },
    { label: "09:00", value: 9 },
    { label: "10:00", value: 10 },
    { label: "11:00", value: 11 },
    { label: "12:00", value: 12 },
    { label: "13:00", value: 13 },
    { label: "14:00", value: 14 },
    { label: "15:00", value: 15 },
    { label: "16:00", value: 16 },
    { label: "17:00", value: 17 },
    { label: "18:00", value: 18 },
    { label: "19:00", value: 19 },
    { label: "20:00", value: 20 },
    { label: "21:00", value: 21 },
    { label: "22:00", value: 22 },
    { label: "23:00", value: 23 },
    { label: "00:00", value: 0 },
    { label: "01:00", value: 1 },
]


const duration = [
    "1 hour",
    "2 hours",
    "3 hours",
    "4 hours",
    "5 hours",
    "6 hours",
    "7 hours",
    "8 hours",
    "9 hours",
    "10 hours",
    "11 hours",
    "12 hours",
    "13 hours",
    "14 hours",
    "15 hours",
    "16 hours",
    "17 hours",
    "18 hours",
    "19 hours",
    "20 hours",
    "21 hours",
    "22 hours",
    "23 hours",
    "24 hours",
    "25 hours",
    "26 hours",
    "27 hours",
    "28 hours",
    "29 hours",
    "30 hours",
    "31 hours",
    "32 hours",
    "33 hours",
    "34 hours",
    "35 hours",
    "36 hours",
    "37 hours",
    "38 hours",
    "39 hours",
    "40 hours",
    "41 hours",
    "42 hours",
    "43 hours",
    "44 hours",
    "45 hours",
    "46 hours",
    "47 hours",
    "48 hours",
    "49 hours",
    "50 hours",
    "51 hours",
    "52 hours",
    "53 hours",
    "54 hours",
    "55 hours",
    "56 hours",
    "57 hours",
    "58 hours",
    "59 hours",
    "60 hours",
    "61 hours",
    "62 hours",
    "63 hours",
    "64 hours",
    "65 hours",
    "66 hours",
    "67 hours",
    "68 hours",
    "69 hours",
    "70 hours",
    "71 hours",
    "72 hours",
    "73 hours",
    "74 hours",
    "75 hours",
    "76 hours",
    "77 hours",
    "78 hours",
    "79 hours",
    "80 hours",
    "81 hours",
    "82 hours",
    "83 hours",
    "84 hours",
    "85 hours",
    "86 hours",
    "87 hours",
    "88 hours",
    "89 hours",
    "90 hours",
    "91 hours",
    "92 hours",
    "93 hours",
    "94 hours",
    "95 hours",
    "96 hours",
    "97 hours",
    "98 hours",
    "99 hours",
]

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
const CheckboxGroupFieldArray: React.FC<{
    name: string;
    options: Array<{ label: string; value: string }>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    values: string[];
}> = ({ name, options, setFieldValue, values }) => {
    const handleChange = (value: string) => {
        if (values.includes(value)) {
            setFieldValue(name, values.filter((item) => item !== value));
        } else {
            setFieldValue(name, [...values, value]);
        }
    };

    return (
        <div className={styles.formField}>
            <label>{name}</label>
            <div className={styles.groupCheckboxes}>
                {options.map((option, index) => (
                    <label key={index} >
                        <input
                            type="checkbox"
                            name={name}
                            value={option.value}
                            checked={values.includes(option.value)}
                            onChange={() => handleChange(option.value)}
                        />
                        {option.label}
                    </label>
                ))}
            </div>
        </div>
    );
};



const CustomField: React.FC<CustomFieldProps> = ({ name, label, type = "text", fieldType = "input", setFieldValue, options }) => {
    if (type === "file") {
        return (
            <div className={styles.formField}>
                <label htmlFor={name}>{label}</label>
                <input
                    id={name}
                    name={name}
                    type="file"
                    onChange={(event) => {
                        const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
                        setFieldValue && setFieldValue(name, file);
                    }}
                    accept="image/*"
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

const PricingOptions: React.FC<PricingOptionsProps> = ({ name, groupSizes }) => {
    return (
        <FieldArray name={name}>
            {({ push, remove, form }) => (
                <div className={styles.formField}>
                    <label>{name}</label>
                    {form.values[name].map((item: PricingDetail, index: number) => (
                        <div key={index} className={styles.group}>
                            <div className={styles.formField}>
                                <label htmlFor={`${name}[${index}].value`}>Group size</label>
                                <Field as="select" name={`${name}[${index}].value`} className={styles.selectField}>
                                    <option value="">Select group size...</option>
                                    {groupSizes.map((size, sizeIndex) => (
                                        <option key={sizeIndex} value={size.value}>{size.label}</option>
                                    ))}
                                </Field>
                            </div>
                            <CustomField
                                name={`${name}[${index}].pricePerPerson`}
                                label="Price per person"
                                fieldType="input"
                                type="number"
                            />
                            <button type="button" onClick={() => remove(index)} className={styles.removeButton}>
                                <IoIosRemoveCircleOutline />
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={() => push({ value: '1', pricePerPerson: 0 })} className={styles.addButton}>
                        <IoIosAddCircleOutline /> Add Pricing Option
                    </button>
                </div>
            )}
        </FieldArray>
    );
};


const appendFormData = ( formData: FormData, values: any, parentKey?: string) => {
    if (values instanceof File) {
        formData.append(parentKey!, values);
    } else if (Array.isArray(values)) {
        values.forEach((value, index) => {
            if (typeof value === 'object' && !(value instanceof File)) {
                appendFormData(formData, value, `${parentKey}[${index}]`);
            } else {
                formData.append(`${parentKey}[]`, value);
            }
        });
    } else if (typeof values === 'object' && values !== null) {
        Object.entries(values).forEach(([key, value]) => {
            appendFormData(formData, value, parentKey ? `${parentKey}[${key}]` : key);
        });
    } else if (parentKey) {
        formData.append(parentKey, values);
    }
};

const CreateTour = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);


    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Unauthorized");
            return;
        }
        const formData = new FormData();

        appendFormData(formData, values);

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
                            <CustomField name='mainImg' fieldType='input' type='file' setFieldValue={setFieldValue} label='Main Image' />
                            <CustomField name='images' fieldType='input' type='file' setFieldValue={setFieldValue} label='Gallery Images' />
                            <DynamicFieldArray name="options" label="Options" fieldType="select" options={presetOptionNames.map((opt) => ({ value: opt.name, label: opt.name }))} />
                            <div className={styles.formField}>
                                <CheckboxGroupFieldArray name="inclusions" options={presetInclusions.map((inc) => ({ value: inc, label: inc }))} setFieldValue={setFieldValue} values={values.inclusions} />
                                <CheckboxGroupFieldArray name="exclusions" options={presetExclusions.map((exc) => ({ value: exc, label: exc }))} setFieldValue={setFieldValue} values={values.exclusions} />
                            </div>
                            <PricingOptions name="adultPricing" groupSizes={adultGroupSizes} />
                            <PricingOptions name="childrenPricing" groupSizes={childrenGroupSizes} />
                            <CustomField name="subtitle" setFieldValue={setFieldValue} fieldType="textarea" label='Subtitle (optional)' />
                            <CheckboxGroupFieldArray name="repeatDays" options={presetWeekDays.map((day) => ({ value: day, label: day }))} setFieldValue={setFieldValue} values={values.repeatDays} />
                            <FieldArray name="repeatTime">
                                {({ push, remove }) => (
                                    <div className={styles.formField}>
                                        <label>Repeat Times</label>
                                        {values.repeatTime.map((time, index) => (
                                            <div key={index} className={styles.group}>
                                                <Field as="select" name={`repeatTime[${index}]`}>
                                                    <option value="">Select a time</option>
                                                    {repeatedTimes.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <button type="button" onClick={() => remove(index)}><IoIosRemoveCircleOutline /></button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => push('')}><IoIosAddCircleOutline /> Add Repeat Time</button>
                                    </div>
                                )}
                            </FieldArray>
                            <div className={styles.group}>
                                <CustomField name="location.from" setFieldValue={setFieldValue} fieldType="input" label='Starting location' />
                                <CustomField name="location.to" setFieldValue={setFieldValue} fieldType="input" label='Destination' />
                            </div>
                            <CustomField name="dateDetails" setFieldValue={setFieldValue} label='Date Details (e.g. "Every Monday and Friday from 9:00 AM to 5:00 PM")' />
                            <CustomField name="isRepeated" type="checkbox" setFieldValue={setFieldValue} label='Is this tour repeated?' />
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