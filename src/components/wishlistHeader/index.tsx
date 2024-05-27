import React from 'react';
import styles from "./style.module.scss";
import { motion } from 'framer-motion';
import { TourType } from '@/types/homePageTours';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { getVariants } from '@/animation/animate';  
import useWindowWidth from '@/hooks/useWindowWidth'; 

const WishlistHeader = ({ wishlistOpen }: { wishlistOpen: boolean }) => {
    const { wishlist, clearWishlist } = useWishlist();
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth !== null && windowWidth < 768;

    if (!wishlist) {
        return null;
    }

    return (
        <motion.section
            className={styles.wishlistHeader}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={getVariants(isMobile)}
        >
            {wishlistOpen && (
                <motion.div className={styles.wishlistHeader__container}>
                    <div className={styles.wishlistHeader__upper}>
                        <h3>Wishlist</h3>
                    </div>
                    <div className={styles.wishlistHeader__lower}>
                        {wishlist.length > 0 ? (
                            <>
                                {wishlist.map((tour: TourType) => (
                                    <Link key={tour._id} className={styles.wishlistHeader__lower_card} href={`/tours/${tour._id}`} aria-label={`View ${tour.title}`}>
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
                        <button onClick={clearWishlist} className={styles.wishlistHeader__lower_button} style={{ color: "var(--accent-color)" }}>Clear Wishlist</button>
                    </div>
                </motion.div>
            )}
        </motion.section>
    );
};

export default WishlistHeader;
