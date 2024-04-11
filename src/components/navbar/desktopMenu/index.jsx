'use client';
import styles from './style.module.scss';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { height } from '../anim';
import Body from './Body';
import Footer from './Footer';
import Image from './Image';

const links = [
  {
    title: "Home",
    href: "/",
    src: "home.webp"
  },
  {
    title: "Tours",
    href: "/shotours",
    src: "tours.webp"
  },
  {
    title: "About Us",
    href: "/about",
    src: "about.webp"
  },
  {
    title: "Tailor Your Tour",
    href: "/tailor",
    src: "book.webp"
  },
  {
    title: "Contact",
    href: "/contact",
    src: "contact.webp"
  }
]

export default function Index() {

  const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 });

  return (
    <motion.div variants={height} initial="initial" animate="enter" exit="exit" className={styles.nav}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Body links={links} selectedLink={selectedLink} setSelectedLink={setSelectedLink} />
          <Footer />
        </div>
        <Image src={links[selectedLink.index].src} isActive={selectedLink.isActive}
          width={selectedLink.isActive ? "100%" : "0"} height={selectedLink.isActive ? "100%" : "0"}
          alt={links[selectedLink.index].title} title={links[selectedLink.index].title}

        />
      </div>
    </motion.div>
  )
}