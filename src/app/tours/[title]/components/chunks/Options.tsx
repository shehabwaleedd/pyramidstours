import React from 'react'
import styles from '../../page.module.scss'
import { TourType } from '@/types/homePageTours'


const Options = ({
    tour,
    optionCounts,
    handleIncrement,
    handleDecrement,
    currency,
    currencySymbol,
    convertPrice
}: {
    tour: TourType,
    optionCounts: { [key: string]: number },
    handleIncrement: (optionId: string) => void,
    handleDecrement: (optionId: string) => void,
    currency: string,
    currencySymbol: string,
    convertPrice: (price: number, toCurrency: string) => string
}) => {
    return (
        <div className={styles.eventDetails__lower_left_options}>
            <div className={styles.eventDetails__lower_left_options__header}>
                <h2>Options</h2>
            </div>
            <div className={styles.column}>
                {tour?.options?.map(option => (
                    <div key={option._id} className={styles.column}>
                        <span>{option.name} - {currencySymbol}{convertPrice(parseFloat(option.price), currency)}</span>
                        <div className={styles.incrementBtns_group}>
                            <input
                                type="number"
                                value={optionCounts[option._id] || 0}
                                readOnly
                            />
                            <div className={styles.incrementBtns}>
                                <button type="button" onClick={() => handleDecrement(option._id)} aria-label="Decrement number of options">-</button>
                                <button type="button" onClick={() => handleIncrement(option._id)} aria-label="Increment number of options">+</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Options