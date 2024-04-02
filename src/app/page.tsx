import styles from "./page.module.scss";
import Landing from "@/components/landing"
import Testimonials from "@/components/testimonials";
import TestimonialsCards from "@/components/testimonialHomePage"
import { useAllTours } from "@/lib/tours/useAllTours";




export default function Home() {
  
  return (
    <main className={styles.main}>
      <Landing />
      <Testimonials />
      <TestimonialsCards />
    </main>
  );
}
