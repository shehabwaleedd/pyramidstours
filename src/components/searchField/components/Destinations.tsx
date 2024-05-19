import React from 'react'
import styles from "../styles.module.scss"

const Destinations = ({ destinations, selectedDestination, setSelectedDestination }: { destinations: string[]; selectedDestination: string, setSelectedDestination: (value: string) => void }) => {
    return (
        <div className={styles.formField}>
            <label htmlFor="destination-select">Destination</label>
            <select id="destination-select" aria-labelledby="destination-label" value={selectedDestination} onChange={e => setSelectedDestination(e.target.value)}>
                <option value="">Destination</option>
                {destinations.map((dest, index) => (
                    <option key={index} value={dest}>{dest}</option>
                ))}
            </select>
        </div>
    )
}

export default Destinations