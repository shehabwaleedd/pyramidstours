import React from 'react'
import { Field } from 'formik'
import styles from '../../page.module.scss'
import { TourType } from '@/types/homePageTours'


const Participants = ({
    tour,
    values,
    setFieldValue
}: {
    tour: TourType,
    values: { adults: number, children: number },
    setFieldValue: (field: string, value: number) => void
}) => {
    return (
        <div className={styles.headGroup}>
            <div className={styles.group}>
                <label htmlFor='adult-count'>Number of Adults</label>
                <Field id="adult-count" type="number" name="adults" min={1} max={tour?.adultPricing?.length} readOnly />
                <div className={styles.incrementBtns}>
                    <button type="button" onClick={() => setFieldValue('adults', values.adults + 1)} aria-label="Increment number of adults">+</button>
                    <button type="button" onClick={() => setFieldValue('adults', Math.max(1, values.adults - 1))} aria-label="Decrement number of adults">-</button>
                </div>
            </div>
            <div className={styles.group}>
                <label htmlFor="child-count">Number of Children</label>
                <Field id="child-count" type="number" name="children" min={0} max={tour?.childrenPricing?.length} readOnly />
                <div className={styles.incrementBtns}>
                    <button type="button" onClick={() => setFieldValue('children', values.children + 1)} aria-label="Increment number of children">+</button>
                    <button type="button" onClick={() => setFieldValue('children', Math.max(0, values.children - 1))} aria-label="Decrement number of children">-</button>
                </div>
            </div>
        </div>
    )
}

export default Participants