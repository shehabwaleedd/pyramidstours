import styles from './style.module.scss';
import { translate } from '../../anim';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
    return (
        <div className={styles.footer}>
            <ul>
                <motion.li
                    custom={[0.3, 0]}
                    variants={translate} initial="initial"
                    animate="enter"
                    exit="exit">
                    <span>Pyramids Egypt Tour - </span> Travel Agency.
                </motion.li>
            </ul>
            <ul>
                <motion.li
                    custom={[0.3, 0]}
                    variants={translate} initial="initial"
                    animate="enter"
                    exit="exit">
                    <span>Location: </span> Giza, Egypt.
                </motion.li>
            </ul>
            <ul>
                <motion.li
                    custom={[0.3, 0]}
                    variants={translate} initial="initial"
                    animate="enter"
                    exit="exit">
                    Privacy Policy
                </motion.li>
                <motion.li
                    custom={[0.3, 0]}
                    variants={translate} initial="initial"
                    animate="enter"
                    exit="exit">
                    Terms & Conditions
                </motion.li>
            </ul>
            <ul>
                <motion.li
                    custom={[0.3, 0]}
                    variants={translate} initial="initial"
                    animate="enter"
                    exit="exit">
                    <span>Designed & Developed By </span> <Link style={{ color: "var(--accent-color)" }} href="https://cairo-studio.com" target='_blank' referrerPolicy='no-referrer' rel="noreferrer">Cairo Studio</Link>
                </motion.li>
            </ul>
        </div>
    )
}
