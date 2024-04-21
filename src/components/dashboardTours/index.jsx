import React from 'react'
import { motion } from 'framer-motion'
import styles from "./style.module.scss"
import Image from 'next/image'
import { useRouter } from "next/navigation"
import Loading from '@/animation/loading/Loading'
import axios from 'axios'
import { useAuth } from '@/context/AuthContext'


const DashboardTours = ({ tours, loading, title }) => {
    const router = useRouter();
    const { user } = useAuth();
    const handleEditClick = (eventId) => {
        router.push(`/account/tours/edit/${eventId}`);
    };

    const handleDeleteClick = async (eventId) => {
        const isConfirm = confirm("Are you sure you want to delete this event?");
        if (isConfirm) {
            try {
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/tour/${eventId}`, {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                });

                if (response.status === 200) {
                    alert("Event deleted successfully.");
                } else {
                    throw new Error("Failed to delete event.");
                }
            } catch (error) {
                console.error("Error deleting event:", error);
                alert("There was a problem deleting the event, please try again later.");
            }
        }
    };



    if (loading) {
        return <Loading height={100} />
    }




    return (
        <motion.section className={styles.userTours} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {title && <h1>{title}</h1>}
            <div className={styles.userTours__container}>
                {tours?.map((event, index) => (
                    <div key={index} className={styles.userTours__container_card}>
                        <div className={styles.userTours__container_card_top}>
                            <Image src={event.mainImg ? event.mainImg.url : "/noimage.png"} alt={event.title} width={500} height={500} quality={100} />
                            <div className={styles.userTours__container_card_top_bottom}>
                                <div className={styles.userTours__container_card_top_bottom_lower}>
                                    <button onClick={() => handleEditClick(event._id)}>
                                        <span style={{ backgroundColor: "#2e2e2e", color: "var(--container-color)" }}>
                                            Edit
                                        </span>
                                    </button>

                                    <button onClick={() => handleDeleteClick(event._id)}>
                                        <span style={{ backgroundColor: "#ef6363" }}>
                                            Delete
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.userTours__container_card_bottom}>
                            <div className={styles.userTours__container_card_bottom_top}>
                                <div>
                                    <h3 className={styles.title}>{event.title.slice(0, 20)}...</h3>
                                </div>
                            </div>
                            <p className={styles.p}>
                                {event.description.slice(0, 150)}..
                            </p>
                            <div className={styles.userTours__container_card_bottom_lower}>
                                <p>{event.category}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    )
}

export default DashboardTours