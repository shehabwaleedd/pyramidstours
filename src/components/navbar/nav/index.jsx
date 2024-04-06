import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { height } from '../anim';
import Body from './Body';
import Footer from './Footer';
import { useEffect } from 'react';

const Data = [
  { id: 0, title: "Home", href: "/", expandable: false },
  { id: 1, title: "About Us", href: "/about", expandable: false },
  { id: 2, title: "Contact Us", href: "/contact", expandable: false },
  {
    id: 3,
    title: "Egypt Travel Packages",
    href: "/packages",
    expandable: true,
    desc: [
      { title: "3 Days 2 Nights", href: "/packages/3-days-2-nights" },
      { title: "4 Days 3 Nights", href: "/packages/4-days-3-nights" },
      { title: "5 Days 4 Nights", href: "/packages/5-days-4-nights" },
      { title: "6 Days 5 Nights", href: "/packages/6-days-5-nights" },
      { title: "7 Days 6 Nights", href: "/packages/7-days-6-nights" },
      { title: "8 Days 7 Nights", href: "/packages/8-days-7-nights" },
      { title: "10 Days 9 Nights", href: "/packages/10-days-9-nights" },
      { title: "12 Days 11 Nights", href: "/packages/12-days-11-nights" },
    ]
  },
  {
    id: 4,
    title: "Airport Transfers",
    href: "/airport-transfers",
    expandable: true,
    desc: [
      { title: "Cairo Airport Transfers", href: "/airport-transfers/cairo-airport-transfers" },
      { title: "Luxor Airport Transfers", href: "/airport-transfers/luxor-airport-transfers" },
    ]
  },
  { id: 5, title: "Cairo Day Tours", href: "/cairo-day-tours", expandable: false },
  { id: 6, title: "Luxor Day Tours", href: "/luxor-day-tours", expandable: false },
  { id: 7, title: "Aswan Day Tours", href: "/aswan-day-tours", expandable: false },
  { id: 8, title: "Nile Cruise Trips", href: "/nile-cruises", expandable: false },
  { id: 9, title: "Shore Excursions", href: "/shore-excursions", expandable: false },
  { id: 10, title: "Top Rated Tours", href: "/tours/top-rated-tours", expandable: false },
  { id: 11, title: "Payment Policy", href: "/policy", expandable: false },
  // Add other sections as needed...
];


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
          <Body Data={Data} />
          <Footer />
        </div>
      </div>
    </motion.div >
  )
}