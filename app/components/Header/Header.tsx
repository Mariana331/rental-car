import css from "./Header.module.css";
import cssMain from "@/app/page.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={css.header}>
      <div className={cssMain.container}>
        <div className={css.logo}>
          <Link href="/" aria-label="Home">
            <svg className={css.logo_icon} width="104" height="16">
              <use href="/public/" />
            </svg>
          </Link>
        </div>
        <nav className={css.nav} aria-label="Main Navigation">
          <ul className={css.navigation}>
            <li className={css.nav_text}>
              <Link href="/">Home</Link>
            </li>
            <li className={css.nav_text}>
              <Link href="/catalog">Catalog</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
