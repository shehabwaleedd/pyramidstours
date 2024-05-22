import React from 'react'
import { Field } from 'formik'
import styles from '../../page.module.scss'
import { TourType } from '@/types/homePageTours'

const Available = ({ tour }: { tour: TourType }) => {
    return (
        <div className={styles.headGroup}>
            <h2>Tour Available in</h2>
            <div className={styles.group}>
                <Field as="select" name="repeatTime" className={styles.Field}>
                    {tour?.repeatTime?.map((time, index) => (
                        <option key={index} value={time}>{time}:00</option>
                    ))}
                </Field>
                <Field as="select" name="repeatDays" className={styles.Field}>
                    {tour?.repeatDays?.map((day, index) => (
                        <option key={index} value={day}>{day}</option>
                    ))}
                </Field>
            </div>
        </div>
    )
}

export default Available