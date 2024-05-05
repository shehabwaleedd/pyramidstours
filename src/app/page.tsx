
import React from 'react'
import styles from "./page.module.scss";
import SearchForm from "@/components/landing";
import ToursHomePage from '@/components/toursHomePage';
import TestimonialsCards from '@/components/testimonialHomePage';
export default function Home() {



  return (
    <main className={styles.main}>
      <SearchForm />
      <ToursHomePage />
      <TestimonialsCards />
    </main>
  );
}
