
import React from 'react'
import styles from "./page.module.scss";
import SearchForm from "@/components/landing";
import { lazy, Suspense } from "react";
import Skeleton from "@/animation/skeleton";
const ToursHomePage = lazy(() => import('@/components/toursHomePage'));
const TestimonialsCards = lazy(() => import('@/components/testimonialHomePage'));
export default function Home() {



  return (
    <main className={styles.main}>
      <SearchForm />
      <Suspense fallback={<Skeleton />}>
        <ToursHomePage />
        <TestimonialsCards />
      </Suspense>
    </main>
  );
}
