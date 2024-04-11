import styles from "./page.module.scss";
import TestimonialsCards from "@/components/testimonialHomePage"
import SearchForm from "@/components/landing";
import ToursHomePage from "@/components/toursHomePage";




export default function Home() {
  
  return (
    <main className={styles.main}>
      <SearchForm />
      <ToursHomePage />
      <TestimonialsCards />
    </main>
  );
}
