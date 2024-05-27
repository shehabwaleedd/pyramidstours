'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from "./style.module.scss";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import axios from 'axios';
import { toast } from 'sonner';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { TourType } from '@/types/homePageTours';
import Cookies from 'js-cookie';
import useWindowWidth from '@/hooks/useWindowWidth';


const DashboardTours = ({ tours, loading, title }: { tours: TourType[], loading: boolean, title: string }) => {
    const [currentTours, setCurrentTours] = useState<TourType[]>([]);
    const router = useRouter();
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth !== null && windowWidth < 768;
    const token = Cookies.get('token');

    useEffect(() => {
        setCurrentTours(tours);
    }, [tours]);

    const handleEditClick = (slug: string) => {
        router.push(`/account/tours/edit/${slug}`);
    };

    const saveOrder = async () => {
        const orderedTours = currentTours.map((item: any, index: number) => ({ _id: item._id, index: index + 1 }));
        try {
            await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/tour/order`, orderedTours, {
                headers: {
                    'Content-Type': 'application/json',
                    token: Cookies.get("token"),
                },
            });
            toast.success('Order saved successfully.');
        } catch (error) {
            console.error('Error saving order:', error);
            toast.error('There was a problem saving the order, please try again later.');
        }
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const items = Array.from(currentTours);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setCurrentTours(items);
    };

    const handleDeleteClick = async (eventId: string) => {
        const isConfirm = confirm("Are you sure you want to delete this event?");
        if (isConfirm) {
            try {
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/tour/${eventId}`, {
                    headers: {
                        token,
                    },
                });

                if (response.status === 200) {
                    toast.success("Tour deleted successfully.");
                    setCurrentTours(currentTours.filter(tour => tour._id !== eventId));
                } else {
                    throw new Error("Failed to delete tour.");
                }
            } catch (error) {
                console.error("Error deleting tour:", error);
                toast.error("There was a problem deleting the event, please try again later.");
            }
        }
    };

    if (loading && !currentTours.length) {
        return <div>Loading...</div>;
    }

    if (!currentTours.length) {
        return <div>No tours available</div>;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <motion.section className={styles.userTours} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className={styles.upper}>
                    {title && <h1>{title}</h1>}
                    <button onClick={saveOrder} style={{ marginTop: '20px' }}>Save Order</button>
                </div>
                <Droppable droppableId="tours">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className={styles.userTours__container}>
                            {Array.isArray(currentTours) && currentTours.map((event, index) => (
                                <Draggable key={event._id} draggableId={event._id} index={index}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={styles.userTours__container_card}>
                                            <div className={styles.userTours__container_card_top}>
                                                <Image
                                                    src={event.mainImg.url}
                                                    alt={event.title}
                                                    width={500}
                                                    height={250}
                                                    sizes="(min-width: 1040px) calc(30vw - 35px), (min-width: 780px) 41.25vw, 90vw"
                                                    priority
                                                />
                                                {isMobile ? (
                                                    <h3 className={styles.title}>
                                                        {event.title.slice(0, 10)}...
                                                    </h3>
                                                ) : (
                                                    <h3 className={styles.title}>
                                                        {event.title}
                                                    </h3>
                                                )}
                                            </div>
                                            <div className={styles.btns}>
                                                <button onClick={() => handleEditClick(event._id)} style={{ backgroundColor: "#2e2e2e", color: "var(--container-color)" }}>
                                                    <span>Edit</span>
                                                </button>
                                                <button onClick={() => handleDeleteClick(event._id)} style={{ backgroundColor: "#ef6363" }}>
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </motion.section>
        </DragDropContext>
    )
}

export default DashboardTours;
