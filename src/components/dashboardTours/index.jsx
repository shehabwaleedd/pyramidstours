import React from 'react'
import { motion } from 'framer-motion'
import styles from "./style.module.scss"
import Image from 'next/image'
import { useRouter } from "next/navigation"
import Loading from '@/animation/loading/Loading'
import axios from 'axios'
import { useAuth } from '@/context/AuthContext'


const DashboardTours = ({ tours, loading, title, refreshTours }) => {
    const router = useRouter();
    const { user } = useAuth();
    const handleEditClick = (eventId) => {
        router.push(`/account/tours/edit/${eventId}`);
    };

    const handleDeleteClick = async (eventId) => {
        const isConfirm = confirm("Are you sure you want to delete this event?");
        if (isConfirm) {
            try {
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/event/${eventId}`, {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                });

                if (response.status === 200) {
                    alert("Event deleted successfully.");
                    await refreshTours();
                } else {
                    throw new Error("Failed to delete event.");
                }
            } catch (error) {
                console.error("Error deleting event:", error);
                alert("There was a problem deleting the event, please try again later.");
            }
        }
    };

    // changing event.status to approved 
    const handlePublishClick = async (eventId) => {
        console.log('User Role:', user.role);
        console.log('Event Status:', event.status);
        const isConfirmed = window.confirm("Are you sure you want to publish this event?");
        if (isConfirmed) {
            try {
                // Prepare the data to update the event status to "published"
                const data = { status: "published" };
                const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/tour/changeState/${eventId}`, data, {
                    headers: {
                        token: localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                });

                // Check if the request was successful
                if (response.status === 200) {
                    alert("Event published successfully.");
                    await refreshTours();
                } else {
                    throw new Error("Failed to publish event.");
                }
            } catch (error) {
                console.error("Error publishing event:", error);
                alert("There was a problem publishing the event, please try again later.");
            }
        }
    };

    const handleDisplayedClick = async (eventId, toDisplay) => {

        const isConfirmed = window.confirm(toDisplay ? "Are you sure you want to hide this event from home page?" : "Are you sure you want to display this event in home page?");
        if (isConfirmed) {
            try {
                // Prepare the data to update the event status to "published"
                const data = { isDisplayed: !toDisplay };
                const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/tour/${eventId}`, data, {
                    headers: {
                        token: localStorage.getItem("token"),
                        "Content-Type": "multipart/form-data",
                    },
                });

                // Check if the request was successful
                if (response.status === 200) {
                    alert("Event display status changed successfully.");
                    await refreshTours();
                } else {
                    throw new Error("Failed to change event display status.");
                }
            } catch (error) {
                console.error("Error changing event display status:", error);
                alert("There was a problem changing the event display status, please try again later.");
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
                                    <h2>{event.title.slice(0, 20)}...</h2>
                                </div>
                            </div>
                            <p>
                                {event.description.slice(0, 150)}...
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