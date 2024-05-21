
import React from 'react'
import styles from "./page.module.scss";
import SearchForm from "@/components/landing";
import ToursHomePage from '@/components/toursHomePage';
import TestimonialsCards from '@/components/testimonialHomePage';
import { serverUseTestimonials } from '@/lib/serverTestimonials';
async function fetchTestimonials () {
  const testimonials = await serverUseTestimonials();
  return testimonials;
} 



export default async function Home() {

    const testimonials = await fetchTestimonials() ?? []; 

  return (
    <main className={styles.main}>
      <SearchForm />
      <ToursHomePage />
      <TestimonialsCards data={testimonials} />
    </main>
  );
}
