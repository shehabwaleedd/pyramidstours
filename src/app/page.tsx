import styles from "./page.module.scss";
import Testimonials from "@/components/testimonials";
import TestimonialsCards from "@/components/testimonialHomePage"
import SearchForm from "@/components/landing";




export default function Home() {
  
  return (
    <main className={styles.main}>
      <SearchForm />
      <Testimonials />
      <TestimonialsCards />
    </main>
  );
}
