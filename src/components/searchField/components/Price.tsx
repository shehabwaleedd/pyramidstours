import React from 'react'
import styles from "../styles.module.scss"

const Price = ({priceRanges, inputPrice, setInputPrice} : { priceRanges: string[], inputPrice: string, setInputPrice: (value: string) => void  }) => {
    return (
        <div className={styles.formField}>
            <label htmlFor="price-select">Price From $</label>
            <select id="price-select" aria-labelledby="price-label" value={inputPrice} onChange={e => setInputPrice(e.target.value)}>
                <option value="">Price From $</option>
                {priceRanges.map((range, index) => (
                    <option key={index} value={range}>{range}$</option>
                ))}
            </select>
        </div>)
}

export default Price