import React from 'react'
import styles from "./style.module.scss"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { height } from '../anim'
const DesktopMenu = () => {
    const Data = [
        {
            label: "About",
            href: "/about"
        },
        {
            label: "Contact",
            href: "/contact"
        },
        {
            label: "Tailor Tour",
            href: "/tailor-tour"
        }
    ]
    return (
        <motion.section className={styles.desktopMenu}initial="initial" animate="enter" exit="exit" variants={height}>
            {Data.map((item, index) => {
                return (
                    <div className={styles.desktopMenu__item} key={index}>
                        <Link href={item.href}><p>{item.label}</p></Link>
                    </div>
                )
            })}
        </motion.section>
    )
}

export default DesktopMenu