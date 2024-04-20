import styles from "./page.module.scss";
import TestimonialsCards from "@/components/testimonialHomePage"
import SearchForm from "@/components/landing";
import { lazy, Suspense } from "react";
import Skeleton from "@/animation/skeleton";
const ToursHomePage = lazy(() => import('@/components/toursHomePage'));


export default function Home() {

  return (
    <main className={styles.main}>
      <SearchForm />
      <Suspense fallback={<Skeleton />}>
        <ToursHomePage />
      </Suspense>
      <TestimonialsCards />
    </main>
  );
}
