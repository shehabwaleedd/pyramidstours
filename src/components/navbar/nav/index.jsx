import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { height } from '../anim';
import Body from './Body';
import Footer from './Footer';
import { useEffect } from 'react';

const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Tours",
    href: "/events",
  },
  {
    title: "Cities",
    href: "/services",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
]

export default function Index({ setNavOpen, navOpen }) {

  useEffect(() => { // Corrected this line
      
  }, [navOpen]); // Also, added navOpen as a dependency

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={height}
      className={styles.nav}>

      <div className={styles.wrapper}>
        <button className={styles.hamburger} onClick={() => setNavOpen(false)}>
          X
        </button>
        <div className={styles.container}>
          <Body links={links} />
          <Footer />
        </div>
      </div>
    </motion.div >
  )
}