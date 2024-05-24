'use client';
import styles from './style.module.scss';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { height } from '../anim';
import Body from './Body';
import Footer from './Footer';
import Image from './Image';
import MobileNav from "../nav"
import useWindowWidth from '@/hooks/useWindowWidth';

const links = [
  {
    title: "Home",
    href: "/",
    src: "home.webp"
  },
  {
    title: "Tours",
    href: "/tours",
    src: "tours.webp"
  },
  {
    title: "About",
    href: "/about",
    src: "about.webp"
  },
  {
    title: "Contact",
    href: "/contact",
    src: "contact.webp"
  }
]

export default function Index() {
  const width = useWindowWidth();
  const mobile = width < 1024;
  const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 });

  return (
    <motion.div variants={height} initial="initial" animate="enter" exit="exit" className={styles.nav}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {!mobile ? (
            <>
              <Body links={links} selectedLink={selectedLink} setSelectedLink={setSelectedLink} />
              <Footer />
            </>
          ) : (
            <MobileNav />
          )}
        </div>
        {!mobile && <Image src={links[selectedLink.index].src} isActive={selectedLink.isActive}
          width={selectedLink.isActive ? "100%" : "0"} height={selectedLink.isActive ? "100%" : "0"}
          alt={links[selectedLink.index].title} title={links[selectedLink.index].title} />}
      </div>
    </motion.div>
  )
}