
import React from 'react'
import styles from "./page.module.scss";
import SearchForm from "@/components/landing";
import ToursHomePage from '@/components/toursHomePage';
import dynamic from 'next/dynamic';
import { serverUseTestimonials } from '@/lib/serverTestimonials';
import Skeleton from '@/animation/skeleton';
const TestimonialsCards = dynamic(() => import('@/components/testimonialHomePage'), { ssr: false, loading: () => <Skeleton />, });

async function fetchTestimonials() {
  const testimonials = await serverUseTestimonials();
  return testimonials;
}

export default async function Home() {

  const testimonials = await fetchTestimonials() ?? [];


  return (
    <main className={styles.main}>
      <h1 style={{ display: "none" }}> Pyramids Egypt Tours - Best Egypt Travel Packages & Tours</h1>
      <SearchForm />
      <ToursHomePage />
      <TestimonialsCards data={testimonials} />
    </main>
  );
}
