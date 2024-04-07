
import React from 'react';
import { Field, FieldArray, useFormikContext } from 'formik';
import styles from '../page.module.scss';
import { FormValues, PricingOptionsProps } from '@/types/createTour';


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
            </div>
        </div>
    );
};

export default PricingOptions;