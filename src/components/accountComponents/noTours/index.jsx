import React from 'react'
import { TransitionButton } from '@/components/transitionLink'
import styles from "./style.module.scss"

const NoTours = () => {
    return (
        <section className={styles.noToursFound}>
            <p>It looks like you don&apos;t have any events yet. Click the button below to create your first event.</p>
            <TransitionButton href="/account/events/createEvent" label="Create Event" />
        </section>)
}

export default NoTours