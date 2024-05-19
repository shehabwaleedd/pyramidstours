import React from 'react'
import styles from "../styles.module.scss"


const Days = ({ days, selectedDay, setSelectedDay }: { days: string[], selectedDay: string, setSelectedDay: (value: string) => void }) => {
    return (
        <div className={styles.formField}>
            <label htmlFor="days-select">Days</label>
            <select id="days-select" aria-labelledby="days-label" value={selectedDay} onChange={e => setSelectedDay(e.target.value)}>
                <option value="">Days</option>
                {days.map((day, index) => (
                    <option key={index} value={day}>{day}</option>
                ))}
            </select>
        </div>)
}

export default Days