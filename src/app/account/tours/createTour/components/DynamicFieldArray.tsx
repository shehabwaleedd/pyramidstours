import React from 'react';
import { FieldArray, useField, useFormikContext, ErrorMessage } from 'formik';
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io';
import styles from '../page.module.scss';
import { DynamicFieldArrayProps, Option } from '@/types/createTour';

const DynamicFieldArray: React.FC<DynamicFieldArrayProps> = ({ name, label, fieldType, options,

}) => {
    const { setFieldValue } = useFormikContext<any>();
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

export default DynamicFieldArray;