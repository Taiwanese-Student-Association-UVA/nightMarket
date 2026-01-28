import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MobileHeader.module.css";
import logo from "../../assets/logo.png";

const MobileHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);

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
        <>
            <header className={styles.mobileHeader}>
                <div className={styles.logoContainer}>
                    <Link to="/">
                        <img src={logo} alt="TSA Logo" className={styles.logoImage}/>
                    </Link>
                </div>
                <button
                    className={styles.hamburger}
                    onClick={() => setMenuOpen(true)}
                    aria-label="Open menu"
                >
                    &#9776;
                </button>
            </header>

            <div
                className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}
                onClick={() => setMenuOpen(false)}
            >
                <button
                    className={styles.closeMenu}
                    onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                    }}
                    aria-label="Close menu"
                >
                    &times;
                </button>

                <nav
                    className={styles.mobileNavGroup}
                    onClick={(e) => e.stopPropagation()}
                >
                    {navItems.map((item) => (
                        <Link
                            key={item}
                            to={item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default MobileHeader;
