import React from 'react';
import styles from '../page.module.scss';
import { CheckboxGroupFieldArrayProps } from '@/types/createTour';


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
            <div className={styles.groupCheckboxes}>
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

export default CheckboxGroupFieldArray;