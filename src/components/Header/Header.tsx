import { Link } from "react-router-dom";
import styles from "./Header.module.css";
const logo = require("../../assets/logo.png");

const Header = () => {
  const navItems = [
    "home",
    "about",
    "events",
    "partners",
    "sponsors",
    "archive",
    // "merch",
    // "games",
  ];

  return (
      <header className={styles.outerHeader}>
        <div className={styles.hoverWrapper}>
          <div className={styles.logoContainer}>
            <Link to="/">
              <img src={logo} alt="TSA Logo" className={styles.logoImage} />
            </Link>
          </div>

          <div className={`${styles.headerContainer} ${styles.hidden}`}>
            <nav className={styles.navGroup}>
              {navItems.map((item) => (
                  <Link
                      key={item}
                      to={item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`}
                  >
                    {item}
                  </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
  );
};

export default Header;
