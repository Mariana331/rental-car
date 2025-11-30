import css from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className={css.home}>
        <div className={css.box}>
          <h1 className={css.title}>Find your perfect rental car</h1>
          <p className={css.text}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <Link className={css.button} href={"/catalog"}>
            View Catalog
          </Link>
        </div>
      </div>
    </main>
  );
}
