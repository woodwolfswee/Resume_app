import Image from "next/image";
import styles from "./page.module.css";
import Login from "../pages/login";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Login /> {/* Render the login page instead of the default content */}
      </main>
    </div>
  );
}
