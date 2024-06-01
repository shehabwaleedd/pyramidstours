'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./page.module.scss";
import { FaRegCheckCircle, FaRegTimesCircle, FaRegClock } from "react-icons/fa";
import useSubscriptionById from '@/lib/subscriptions/useSubscriptionById';
import common from "@/app/page.module.scss";
import Confetti from 'react-confetti';
import slugify from 'slugify';
import Loading from './loading';


const OrderStatus = ({ params }: { params: { slug: string[] } }) => {
    const router = useRouter();
    const [showConfetti, setShowConfetti] = useState<boolean>(false);

    const subscriptionId = params.slug[0];
    const status = params.slug[1];

    const { subscription, loading } = useSubscriptionById(subscriptionId);

    useEffect(() => {
        if (subscription && !loading && status === 'orderConfirmed') {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
        }
    }, [subscription, loading, status]);

    if (loading) {
        return <Loading />;
    }
    const retryTourSlug = subscription ? slugify(subscription.tourDetails.title ?? '', { lower: true }) : '';

    const renderContent = () => {
        switch (status) {
            case 'orderConfirmed':
                return (
                    <>
                        <FaRegCheckCircle className={styles.confirmOrder__icon} style={{ color: "green", fontSize: "3rem" }} />
                        {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
                        <h1>Your Tour is Successfully Booked!</h1>
                    </>
                );
            case 'orderFailed':
                return (
                    <>
                        <FaRegTimesCircle className={styles.confirmOrder__icon} style={{ color: "red", fontSize: "3rem" }} />
                        <h1>Your Booking Failed</h1>
                    </>
                );
            case 'orderPending':
                return (
                    <>
                        <FaRegClock className={styles.confirmOrder__icon} style={{ color: "orange", fontSize: "3rem" }} />
                        <h1>Your Booking is Pending</h1>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <main className={styles.confirmOrder}>
            <div className={styles.hero} style={{ backgroundImage: `url(${subscription?.tourDetails?.mainImg?.url})` }}>
                <div className={styles.overlay}></div>
            </div>
            <div className={styles.confirmOrder__container}>
                {renderContent()}
                <div className={styles.orderDetails}>
                    <h2>Order Details:</h2>
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
                            <p>Status:</p>
                            <span>{subscription?.payment}</span>
                        </li>
                    </ul>
                    <div className={styles.btns}>
                        <button className={common.submitButton} onClick={() => router.push('/')}>Return Home</button>
                        {status === 'orderFailed' && <button style={{ backgroundColor: "var(--success-color)", color: "var(--title-color)" }} className={common.submitButton} onClick={() => router.push(`/tours/${retryTourSlug}`)}>Try Again</button>}
                    </div>
                    <button className={common.submitButton} onClick={() => router.push('/tours')}>Browse More Tours</button>
                </div>
            </div>
        </main>
    );
};

export default OrderStatus;
