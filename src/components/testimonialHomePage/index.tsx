'use client';
import React, { useState } from 'react';
import "./style.css"
import { Testimonial } from '@/types/common';
import Marquee from 'react-fast-marquee';
import TestimonialCard from "@/components/testimonialCard"
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
const ShowMore = dynamic(() => import('@/components/testimonialCard/showMore'), { ssr: false });


// Component declaration
const TestimonialsCards = ({ data }: { data: Testimonial[] }) => {
    const [selectedTestimonialId, setSelectedTestimonialId] = useState<string | null>(null);

    const handleDetailsOpen = (testimonialId: string) => {
        setSelectedTestimonialId(testimonialId); // Set the selected testimonial ID
    };

    const handleDetailsClose = () => {
        setSelectedTestimonialId(null); // Close the details view
    };

    return (
        <>
            <section className="testimonials">
                <h2 className="testimonials__title">Testimonials</h2>
                <Marquee className="testimonials__swiper" pauseOnHover={true}>
                    {data.map((testimonial, index) => (
                        <div key={testimonial._id} className="rfm-initial-child-container">
                            <TestimonialCard
                                testimonial={testimonial}
                                isSelected={selectedTestimonialId === testimonial._id}
                                onDetailsOpen={() => handleDetailsOpen(testimonial._id)}
                                onDetailsClose={handleDetailsClose}
                            />
                        </div>
                    ))}
                </Marquee>
            </section>
            <AnimatePresence mode="wait">
                {selectedTestimonialId && (
                    <ShowMore testimonial={data.find(testimonial => testimonial._id === selectedTestimonialId)!} onDetailsClose={handleDetailsClose} />
                )}
            </AnimatePresence>
        </>
    );
};

export default TestimonialsCards;
