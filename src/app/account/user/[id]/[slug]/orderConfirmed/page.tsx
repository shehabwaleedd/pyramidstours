'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Confetti from 'react-confetti'
import { useAuth } from '@/context/AuthContext';
import { useTourById } from '@/lib/tours/useTourById';
import styles from "./page.module.scss"
import { FaRegCheckCircle } from "react-icons/fa";
import Loading from '@/animation/loading/Loading';
import useSubscriptionById from '@/lib/subscriptions/useSubscriptionById';
import common from "@/app/page.module.scss"


const OrderConfirmed = () => {
    const { user } = useAuth()
    const { slug } = useParams<{ slug: string }>();
    const { subscription, loading } = useSubscriptionById(slug);
    const router = useRouter();
    const [showConfetti, setShowConfetti] = useState<boolean>(false);

    console.log(subscription, "SUB")


    useEffect(() => {
        if (subscription && !loading) {
            setShowConfetti(true); // Trigger confetti when the tour is successfully fetched
            setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds
        }
    }, [subscription, loading]);

    if (loading) {
        return <Loading height={100} />
    }

    return (
        <main className={styles.confirmOrder}>
            <FaRegCheckCircle
                className={styles.confirmOrder__icon}
                style={{ color: "green", fontSize: "3rem" }}
            />
            {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
            <h1> Your Tour is successfully booked! </h1>
            <div className={styles.confirmOrder__container}>
                Order Details:
                <ul>
                    <li>
                        <p>Tour:</p>
                        <span>{subscription?.tourDetails?.title}</span>
                    </li>
                    <li>
                        <p>Date:</p>
                        <span>{subscription?.date}</span>
                    </li>
                    <li>
                        <p>Time:</p>
                        <span>{subscription?.time}</span>
                    </li>
                    <li>
                        <p>Price:</p>
                        <span>{subscription?.totalPrice}</span>
                    </li>
                    <li>
                        <p>Status</p>
                        <span>{subscription?.payment}</span>
                    </li>
                </ul>
                <button className={common.submitButton} onClick={() => router.push('/')}>Return Home</button>
            </div>
        </main>
    )
}

export default OrderConfirmed