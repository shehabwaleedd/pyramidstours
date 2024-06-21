import React from 'react'
import styles from "./page.module.scss"
import Image from 'next/image'
import AboutLower from './AboutLower'

export async function generateMetadata() {
    const title = "About Us - Pyramids Egypt Tours | Best Egypt Travel Packages & Tours";
    const description = "Learn about Pyramids Egypt Tours and our dedication to providing the best Egypt travel experiences. Discover our range of Egypt travel packages.";
    const keywords = [
        "Egypt travel packages",
        "Egypt tours",
        "Pyramids of Giza",
        "Nile cruises",
        "Cairo tours",
        "Luxor tours",
        "Aswan tours",
        "Alexandria tours",
        "Red Sea resorts",
        "Egyptian museums",
        "Ancient Egyptian sites",
        "Historical tours in Egypt",
        "Egypt vacation packages",
        "Desert safaris in Egypt",
        "Diving in the Red Sea",
        "Cultural tours in Egypt",
        "Egypt sightseeing tours",
        "Family tours in Egypt",
        "Luxury travel in Egypt",
        "Egypt adventure tours",
        "Egypt travel deals",
        "Best places to visit in Egypt",
        "Guided tours of Egypt",
        "Egypt holiday packages",
        "Egyptian heritage tours",
        "Cairo day trips",
        "Giza pyramids tour",
        "Egypt travel guide",
        "Egypt tourist attractions",
        "Egypt tourism 2024"
    ];    
    const url = "https://pyramidsegypttour.com/about";
    const imageUrl = "/backgroundss/Giza.webp";

    return {
        title,
        description,
        keywords,
        url,
        openGraph: {
            title,
            description,
            url,
            type: 'website',
            images: [
                {
                    url: imageUrl,
                    width: 800,
                    height: 600,
                    alt: "About Pyramids Egypt Tours",
                },
            ],
            site_name: 'Pyramids Egypt Tours',
        },
        twitter: {
            title,
            description: "Discover Pyramids Egypt Tours - Learn about our mission, values, and the best Egypt travel experiences we offer. Explore Egypt with us!",
            card: 'summary_large_image',
            image: imageUrl,
        },
        alternates: {
            canonical: url,
        }
    }
}


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
