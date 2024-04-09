import React from 'react'
import styles from './style.module.scss'
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__upper}>
                <h2>
                    Pyramids Egypt Tour
                </h2>
            </div>
            <div className={styles.footer__lower}>
                <ul>
                    <li>
                        <span>
                            Pyramids Egypt Tour @2024
                        </span>
                    </li>
                    <li>
                        <Link href="#">Facebook </Link>
                    </li>
                    <li>
                        <Link href="#">Instagram </Link>
                    </li>
                    <li>
                        <Link href="#">Twitter </Link>
                    </li>
                    <li>
                        <Link href="/privacy">Privacy </Link>
                    </li>
                    <li>
                        <span>
                            Made by <Link href="https://www.cairo-studio.com" style={{color: "var(--accent-color)"}}> Cairo Studio</Link>
                        </span>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer