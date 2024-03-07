import styles from "./page.module.scss";
import Landing from "@/components/landing"
import Tours from "@/components/toursTest"
export default function Home() {
  return (
    <main className={styles.main}>
      <Landing />
      <Tours />
    </main>
  );
}
