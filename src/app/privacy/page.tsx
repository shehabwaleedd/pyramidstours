// app/privacy/page.tsx

import React from 'react';

export function generateMetadata() {
    return {
        title: "Privacy Policy - Pyramids Egypt Tours",
        description: "We are committed to protecting your privacy and ensuring your personal data is handled with care. This privacy policy explains how we collect, use, and protect your information when you use our website and services.",
        url: "https://pyramidsegypttour.com/privacy"
    };
}

export default async function Privacy() {
    return (
        <div style={{padding: "1rem", maxWidth: '800px', margin: '6vh auto', display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h1>Privacy Policy</h1>

            <section>
                <h2>Introduction</h2>
                <p>
                    Welcome to Pyramids Egypt Tours (https://pyramidsegypttour.com). We are committed to protecting your privacy and ensuring your personal data is handled with care. This privacy policy explains how we collect, use, and protect your information when you use our website and services.
                </p>
            </section>

            <section>
                <h2>Data Collection</h2>
                <p>
                    We collect the following types of information:
                </p>
                <ul>
                    <li><strong>Personal Information:</strong> This includes your name, email address, phone number, and payment details when you book a tour or service.</li>
                    <li><strong>Usage Data:</strong> We use Google Analytics to collect data on how you interact with our website, such as pages visited and time spent on each page.</li>
                    <li><strong>Subscription Data:</strong> Details about your subscriptions, including selected options and payment history.</li>
                </ul>
            </section>

            <section>
                <h2>Use of Data</h2>
                <p>
                    We use your data for the following purposes:
                </p>
                <ul>
                    <li><strong>Service Provision:</strong> To process bookings, manage subscriptions, and provide receipts.</li>
                    <li><strong>User Experience:</strong> To enhance your experience on our website and tailor our services to your needs.</li>
                    <li><strong>Communication:</strong> To send you updates about your bookings, subscriptions, and other relevant information.</li>
                </ul>
            </section>

            <section>
                <h2>Protection Measures</h2>
                <p>
                    We implement various security measures to ensure your personal data is safe, including:
                </p>
                <ul>
                    <li><strong>Encryption:</strong> Your payment details are encrypted during transactions.</li>
                    <li><strong>Access Control:</strong> Only authorized personnel can access your data.</li>
                    <li><strong>Regular Audits:</strong> We regularly review our security practices to keep your information secure.</li>
                </ul>
            </section>

            <section>
                <h2>User Rights</h2>
                <p>
                    You have the following rights regarding your personal data:
                </p>
                <ul>
                    <li><strong>Access:</strong> You can request access to your personal data we hold.</li>
                    <li><strong>Correction:</strong> You can request correction of inaccurate or incomplete data.</li>
                    <li><strong>Deletion:</strong> You can request deletion of your personal data.</li>
                    <li><strong>Restriction:</strong> You can request to restrict processing of your data.</li>
                    <li><strong>Objection:</strong> You can object to the processing of your data for certain purposes.</li>
                </ul>
            </section>

            <section>
                <h2>Third-party Affiliations</h2>
                <p>
                    We do not share your personal information with any third parties. Your data is used solely for the purposes outlined in this policy.
                </p>
            </section>

            <section>
                <h2>Policy Changes</h2>
                <p>
                    We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.
                </p>
            </section>

            <section>
                <h2>Contact Us</h2>
                <p>
                    If you have any questions or concerns about this privacy policy or your personal data, please contact us at support@pyramidsegypttour.com.
                </p>
            </section>
        </div>
    );
};
