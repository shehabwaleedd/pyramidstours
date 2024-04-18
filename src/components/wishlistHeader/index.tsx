import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import styles from "./style.module.scss"
import { motion, AnimatePresence } from 'framer-motion'
import { TourType } from '@/types/homePageTours'
import Image from 'next/image'
import Link from 'next/link'
const WishlistHeader = ({ wishlistOpen }: { wishlistOpen: boolean }) => {

    const { wishlist, clearWishlist } = useAuth()

    if (!wishlist) {
        return null
    }



    return (
        <motion.section className={styles.wishlistHeader} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {wishlistOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className={styles.wishlistHeader__container}>
                    <div className={styles.wishlistHeader__upper}>
                        <h3>Wishlist</h3>
                    </div>
                    <div className={styles.wishlistHeader__lower}>
                        {wishlist.length > 0 ? (
                            <>
                                {wishlist.map((tour: TourType) => (
                                    <Link key={tour._id} className={styles.wishlistHeader__lower_card} href={`/tours/${tour._id}`}>
                                        <Image src={tour?.mainImg?.url} alt="Tour" width={50} height={50} objectFit="cover" />
                                        <div className={styles.cardContent}>
                                            <div>
                                                <h4>{tour?.title?.slice(0, 25)}...</h4>
                                                <p>{tour?.description?.replace(/<[^>]*>/g, '').slice(0, 40)}...</p>
                                            </div>
                                            <div>
                                                <span>From ${tour?.adultPricing?.find(p => p.adults === 1)?.price ?? 'N/A'}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </>
                        ) : (
                            <p>No tours are being added in wishlist.</p>
                        )}
                    </div>
                    <div className={styles.btns}>
                        {/* <button className={styles.wishlistHeader__lower_button} style={{ color: "var(--title-color)" }}>View Full Wishlist</button> */}
                        <button onClick={clearWishlist} className={styles.wishlistHeader__lower_button} style={{ color: "var(--accent-color)" }}>Clear Wishlist</button>
                    </div>
                </motion.div>
            )

            }
        </motion.section>
    )
}

export default WishlistHeader