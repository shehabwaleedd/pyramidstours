// app/payment-policy/page.tsx

import React from 'react';

export function generateMetadata() {
    // Metadata for SEO purposes
    return {
        title: 'Payment and Refund Policy - Pyramids Egypt Tours',
        description: 'Read our payment and refund policy for bookings with Pyramids Egypt Tours.',
    };
}

export default async function PaymentPolicy() {
    return (
        <div style={{padding: "1rem", maxWidth: '800px', margin: '6vh auto', display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h1>Payment and Refund Policy</h1>

            <section>
                <h2>Introduction</h2>
                <p>
                    This Payment and Refund Policy outlines the terms and conditions regarding payments and refunds for tours and services booked through Pyramids Egypt Tours (https://pyramidsegypttour.com). By booking a tour with us, you agree to the terms stated below.
                </p>
            </section>

            <section>
                <h2>Payment Terms</h2>
                <p>
                    To secure your booking, a deposit or full payment is required at the time of booking. Payment can be made using major credit cards, debit cards, or other payment methods as listed on our website.
                </p>
                <ul>
                    <li><strong>Deposit:</strong> A non-refundable deposit of [specific amount or percentage] is required to secure your booking.</li>
                    <li><strong>Full Payment:</strong> Full payment must be made [specific days] before the tour date.</li>
                    <li><strong>Late Payments:</strong> If full payment is not received by the due date, your booking may be canceled without a refund.</li>
                </ul>
            </section>

            <section>
                <h2>Cancellation and Refund Policy</h2>
                <p>
                    We understand that plans can change. Our flexible refund policy is designed to accommodate your needs while protecting our business interests.
                </p>
                <ul>
                    <li><strong>Cancellations by You:</strong></li>
                    <ul>
                        <li>Cancellations made more than two weeks before the tour date: Full refund.</li>
                        <li>Cancellations made within three days before the tour date: 75% of the original amount will be refunded.</li>
                        <li>Cancellations made within two days before the tour date: 50% of the original amount will be refunded.</li>
                        <li>Cancellations made within one day before the tour date: 25% of the original amount will be refunded.</li>
                        <li>Cancellations made on the same day as the tour: No refund.</li>
                    </ul>
                    <li><strong>Cancellations by Us:</strong></li>
                    <ul>
                        <li>In the unlikely event that we need to cancel a tour, you will receive a full refund of all payments made.</li>
                        <li>We are not responsible for any additional costs or expenses incurred as a result of our cancellation.</li>
                    </ul>
                </ul>
            </section>

            <section>
                <h2>Changes to Bookings</h2>
                <p>
                    If you need to make changes to your booking, please contact us as soon as possible. While we will do our best to accommodate your request, we cannot guarantee that changes can be made. Any changes may be subject to additional fees.
                </p>
            </section>

            <section>
                <h2>Refund Process</h2>
                <p>
                    To request a refund, please contact our customer support at support@pyramidsegypttour.com with your booking details. Refunds will be processed within [specific days] to the original payment method.
                </p>
            </section>

            <section>
                <h2>Customer Responsibilities</h2>
                <p>
                    It is the responsibility of the customer to ensure that all personal and payment information provided is accurate. We are not liable for any issues arising from incorrect information.
                </p>
            </section>

            <section>
                <h2>Contact Us</h2>
                <p>
                    If you have any questions or concerns about our payment and refund policy, please contact us at support@pyramidsegypttour.com.
                </p>
            </section>
        </div>
    );
};
