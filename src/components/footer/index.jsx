import React from 'react'
import styles from './style.module.scss'
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Image src="/footer.webp" alt="Footer Background" width={900} height={900} />
            <section className={styles.footer_abs}>
                <section className={styles.footer__upper}>
                    <h2>
                        Pyramids Egypt Tour
                    </h2>
                </section>
                <section className={styles.footer__lower}>
                    <ul>
                        <li>
                            <span>
                                Pyramids Egypt Tour @2024
                            </span>
                        </li>
                        <li>
                            <Link href="#" aria-label="Facebook">Facebook </Link>
                        </li>
                        <li>
                            <Link href="#" arial-label="Instagram Page">Instagram </Link>
                        </li>
                        <li>
                            <Link href="/privacy" aria-label="Privacy Policy">Privacy </Link>
                        </li>
                        <li>
                            <span>
                                Made by <Link href="https://www.cairo-studio.com" style={{ color: "var(--accent-color)" }} aria-label="Cairo Studio"> Cairo Studio</Link>
                            </span>
                        </li>
                    </ul>
                </section>
            </section>

        </footer>
    )
}

export default Footer