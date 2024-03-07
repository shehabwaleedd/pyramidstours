'use client'
import React from 'react'
import styles from "./style.module.scss"
import Image from "next/image";

const tours = [
    { src: '/assets/tours/1.jpg', alt: 'tour-1', title: 'VIP inclusive 2-Day Private Tour to All pyramids and Cairo    ', duration: '10 days', price: 'From $3,000', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.' },
    { src: '/assets/tours/2.jpg', alt: 'tour-2', title: 'Giza Pyramids, Sphinx, Egyptian Museum, Khan Al', duration: '15 days', price: 'From $4,000', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.' },
    { src: '/assets/tours/3.jpg', alt: 'tour-3', title: 'Giza Pyramid, Sphinx, Memphis & Sakkara', duration: '20 days', price: 'From $5,000', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.' },
    { src: '/assets/tours/4.jpg', alt: 'tour-4', title: 'Giza Pyramids, Great Sphinx, Camel Ride, and VIP Lunch', duration: '20 days', price: 'From $5,000', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.' },
];

const index = () => {
    return (
        <section className={styles.tours}>
            <h2>Top Rated Tours</h2>
            <div className={styles.line}></div>
            <div className={styles.tours__container}>
                {tours.map((tour, index) => (
                    <div key={index} className={styles.tours__container_card}>
                        <div className={styles.image}>
                            <Image src={tour.src} alt={tour.alt}
                                width={800}
                                height={800}
                            />
                            <div>
                                <span>
                                    {tour.duration}
                                </span>
                                <span style={{backgroundColor: "var(--accent-color)", color: "var(--container-color)"}}>
                                    Offer
                                </span>
                            </div>
                        </div>
                        <h3>{tour.title}</h3>
                        <span>{tour.price}</span>
                        <p>{tour.description}</p>
                        <button> View Tour</button>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default index