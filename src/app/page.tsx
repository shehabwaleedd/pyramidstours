'use client'
import React, { useState, useEffect } from 'react'
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.scss";
import TestimonialsCards from "@/components/testimonialHomePage"
import SearchForm from "@/components/landing";
import { lazy, Suspense } from "react";
import Skeleton from "@/animation/skeleton";
const ToursHomePage = lazy(() => import('@/components/toursHomePage'));
import Opening from "@/animation/opening";

export default function Home() {
  const { hasAnimationShown, setHasAnimationShown } = useAuth();
  const [renderOpening, setRenderOpening] = useState(false);

  useEffect(() => {
    if (!hasAnimationShown && !sessionStorage.getItem("hasAnimationShown")) {
      setRenderOpening(true);
    }
  }, [hasAnimationShown])



  return (
    <>
      {/* {renderOpening && <Opening setHasAnimationShown={setHasAnimationShown}/>} */}

      <main className={styles.main}>
        <SearchForm />
        <Suspense fallback={<Skeleton />}>
          <ToursHomePage />
        </Suspense>
        <TestimonialsCards />
      </main>
    </>
  );
}
