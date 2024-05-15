'use client'
import React from 'react'
import useWindowWidth from '@/hooks/useWindowWidth'
import styles from "./page.module.scss"
import Image from 'next/image'

const AboutLower = () => {
    const width = useWindowWidth()
    const isMobile = width !== null && width < 1168;

    const data = [
        {
            image: "/assets/backgrounds/3.webp",
            title: "Why are we doing this?",
            desc: "We believe that travel is a transformative experience that can change the world. We want to help people discover the world and themselves through travel. We believe that travel is a transformative experience that can change the world. We want to help people discover the world and themselves through travel."

        },
        {
            image: "/assets/backgrounds/4.webp",
            title: "From Egypt, To the whole world!",
            desc: "Our believe in the power of travel to change the world is what drives us. We want to help people discover the world and themselves through travel. We believe that travel is a transformative experience that can change the world. We want to help people discover the world and themselves through travel."
        },
        {
            image: "/assets/backgrounds/5.webp",
            title: "How are we doing this?",
            desc: "With the passion of Sherief the founder, we are working hard to make travel more accessible to everyone. We believe that travel is a transformative experience that can change the world. We want to help people discover the world and themselves through travel. We believe that travel is a transformative experience that can change the world. We want to help people discover the world and themselves through travel."
        },
    ]
    return (
        <section className={styles.about_lower}>
            {data.map((item, index) => (
                <div key={index} className={styles.about_lower_card} style={{ flexDirection: isMobile ? "column-reverse" : (index % 2 === 0 ? "row" : "row-reverse") }}>
                    <Image src={item.image} alt="about" width={1920} height={1080} />
                    <div className={styles.about_lower_card_text}>
                        <span> 0{index + 1}</span>
                        <h2>{item.title}</h2>
                        <p>{item.desc}</p>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default AboutLower