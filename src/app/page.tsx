
import React from 'react'
import styles from "./page.module.scss";
import SearchForm from "@/components/landing";
import ToursHomePage from '@/components/toursHomePage';
import dynamic from 'next/dynamic';
import { serverUseTestimonials } from '@/lib/serverTestimonials';
import Opening from '@/animation/opening';
const TestimonialsCards = dynamic(() => import('@/components/testimonialHomePage'), { ssr: false });
async function fetchTestimonials() {
  const testimonials = await serverUseTestimonials();
  return testimonials;
}



export default async function Home() {

  const testimonials = await fetchTestimonials() ?? [];

  return (
    <>
      <Opening />
      <main className={styles.main}>
        <SearchForm />
        <ToursHomePage />
        <TestimonialsCards data={testimonials} />
      </main>
    </>
  );
}
