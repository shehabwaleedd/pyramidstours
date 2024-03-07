import React from 'react'
import styles from "./style.module.scss"
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__upper}>
                <div className={styles.footer__upper__left}>
                    <h2>Contact Us</h2>
                    <ul>
                        <li>
                            <a href="mailto:hello@pyramidsegypttour.com"> hello@pyramidsegypttour.com
                            </a>
                        </li>
                        <li>
                            <a href="tel:+971508028407"> +971 50 802 8407</a>
                        </li>
                    </ul>

                </div>
                <div className={styles.footer__upper__right}>
                    <h2>Follow us</h2>
                    <div className={styles.footer__upper__right_container}>
                        <div>
                            <ul>
                                <li>
                                    <a href="https://www.instagram.com/pyramidsegypttour/" target='_blank' rel="noreferrer">
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/pyramidsegypttour" target='_blank' rel="noreferrer">
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/pyramidsegypttour" target='_blank' rel="noreferrer">
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.footer__upper__right_container_list}>
                    <h2>Sitemap</h2>
                    <ul>
                        <li>
                            <Link href="/tours">
                                Tours
                            </Link>
                        </li>
                        <li>
                            <Link href="/cities">
                                Cities
                            </Link>
                        </li>
                        <li>
                            <Link href="/about">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link href="/terms" rel="noreferrer">
                                Terms
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacy" rel="noreferrer">
                                Privacy
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.footer__footer}>
                <div className={styles.footer__footer_logoz}>
                    <h2>Pyramids Egypt Tour</h2>

                </div>
                <div className={styles.footer__footer_lower}>
                    <span>
                        Made by <Link href="https://cairo-studio.com">Cairo Studio</Link>
                    </span>
                    <span>
                        Copyright © F365 2024
                    </span>
                </div>
            </div>
        </footer >
    )
}

export default Footer