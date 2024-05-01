import React from 'react'
import styles from "./page.module.scss"
import Link from 'next/link'


export function generateMetadata() {
    return {
        title: 'Contact - Pyramids Egypt Tour',
        description: ' Pyramids Egypt Tour is a travel agency in Giza, Egypt. We offer tours to the pyramids of Egypt, the Sphinx, and other historical sites. Contact us for more information.',
        image: '/assets/backgrounds/1.webp',
        url: 'https://www.pyramidsegypttour.com/contact',
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
            url: 'https://www.pyramidsegypttour.com/contact',
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
    }
}


const Contact = () => {

    return (
        <main className={styles.contact}>
            <div className={styles.contact_lower}>
                <div className={styles.contact_lower_content}>
                    <p>(Events inquiry)</p>
                    <Link href="mailto:business@f365-global.com" target="_blank" rel="noopener noreferrer">
                        events@f365<br />-global.com
                    </Link>
                </div>
                <div className={styles.contact_lower_content}>
                    <p>(New business)</p>
                    <Link href="mailto:business@f365-global.com" target="_blank" rel="noopener noreferrer">
                        business@f365-global.com
                    </Link>
                </div>
                <div className={styles.contact_lower_content}>
                    <p>(Phone number)</p>
                    <Link href="tel:+971 50 123 4567" target="_blank" rel="noopener noreferrer">
                        +971 50 123 4567
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default Contact