import React from 'react'
import styles from "./page.module.scss"
import Link from 'next/link'
import Image from 'next/image'

export function generateMetadata() {
    return {
        title: 'Contact - Pyramids Egypt Tour | Best Tours In Egypt',
        description: ' Pyramids Egypt Tour is a travel agency in Giza, Egypt. We offer tours to the pyramids of Egypt, the Sphinx, and other historical sites. Contact us for more information.',
        image: '/assets/backgrounds/1.webp',
        url: 'https://pyramidsegypttour.com/contact',
        type: 'website',
        siteName: 'Pyramids Egypt Tour',
        keywords: [
            "Pyramids Egypt Tour",
            "Travel Agency",
            "Giza",
            "Egypt",
            "Tours",
            "Pyramids",
            "Sphinx",
            "Historical Sites",
        ],
        openGraph: {
            title: 'Contact',
            description: ' Pyramids Egypt Tour is a travel agency in Giza, Egypt. We offer tours to the pyramids of Egypt, the Sphinx, and other historical sites. Contact us for more information.',
            image: '/assets/backgrounds/1.webp',
            url: 'https://pyramidsegypttour.com/contact',
            type: 'website',
        },
        robots: "index, follow",
        language: "en",
        favicon: {
            ico: "/favicon.ico",
            webp: "/favicon.webp",
            png: "/favicon.png",
        },
        manifest: "/manifest.json",
        alternates: {
            canonical: "https://pyramidsegypttour.com/contact",
        }
    }
}


const Contact = () => {

    return (
        <main className={styles.contact}>
            <h1 style={{ display: "none" }}> Contact - Pyramids Egypt Tour | Best Tours In Egypt</h1>
            <Image src="/assets/backgrounds/2.jpg"
                height={1000}
                width={1920}
                alt='register background'
            />
            <section className={styles.contact_lower}>
                <div className={styles.contact_lower_content}>
                    <p>(Events inquiry)</p>
                    <Link href="mailto:hello@pyramidsegypttour.com" target="_blank" rel="noopener noreferrer" aria-label='Pyramids Egypt Tour Email Address'>
                        hello@pyramids<br />-egypttour.com
                    </Link>
                </div>
                <div className={styles.contact_lower_content}>
                    <p>(New business)</p>
                    <Link href="mailto:business@pyramidsegypttour.com.com" target="_blank" rel="noopener noreferrer" aria-label='Pyramids Egypt Tour Business Email Address'>
                        business@pyramids<br />-egypttour.com
                    </Link>
                </div>
                <div className={styles.contact_lower_content}>
                    <p>(Phone number)</p>
                    <Link href="tel:+20 114 854 4091" target="_blank" rel="noopener noreferrer" aria-label='Pyramids Egypt Tour Phone Number'>
                        +20 114 854 4091
                    </Link>
                </div>
            </section>
        </main>
    )
}

export default Contact