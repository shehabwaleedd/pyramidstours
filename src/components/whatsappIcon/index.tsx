import React from 'react'
import { FaWhatsapp } from "react-icons/fa";
import styles from "./style.module.scss"
const WhatsappIcon = () => {
    return (
        <section className={styles.whatsapp}>
            <a href="whatsapp://send?text=Hello, I want&phone=+201148544091" target="_blank" rel="noreferrer" aria-label="Contact us on Whatsapp">
                <FaWhatsapp />
            </a>
        </section>
    )
}

export default WhatsappIcon