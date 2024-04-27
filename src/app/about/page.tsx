import React from 'react'
import styles from "./page.module.scss"
import Image from 'next/image'
import AboutLower from './AboutLower'

export default function About() {

    return (
        <main className={styles.about}>
            <section className={styles.about_upper}>
                <Image src="/backgroundss/Giza.webp" alt="about" width={1920} height={1080} />
                <div className={styles.about_upper_text}>
                    <h1>
                        &apos;Travel Transforms the World—And Us Along the Way. <br />
                        Each Journey Holds the Promise of a Unique Revelation.&apos;
                    </h1>
                </div>
            </section>
            <AboutLower />
        </main>
    )
}
