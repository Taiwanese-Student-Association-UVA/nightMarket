
import React from "react";
import { Link } from "react-router-dom";
import styles from "../Archive.module.css";
import tsaLogo from "../../../assets/logo.png";


const latestNewsletter = {
  title: "September 2025 Newsletter",
  date: "September 1, 2025",
  link: "https://us14.campaign-archive.com/?u=45792a76bc10b7924d7ccb62e&id=53139167b0",
  excerpt: "Check out our latest updates and events!",
};

const newsletters = [
  { slug: "coming-soon", title: "Coming Soon", date: "Coming Soon", excerpt: "Coming Soon", href: "/archive/newsletters/coming-soon" },
];


const Newsletters: React.FC = () => {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Newsletters</h1>
      <section className={styles.section}>
        <div className={styles.sectionHeader}></div>
        {/* Latest Newsletter */}
        <div style={{ marginBottom: "2rem" }}>
          <a href={latestNewsletter.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={tsaLogo} alt="TSA Logo" style={{ width: 80, height: 70, marginRight: 16 }} />
              <div>
                <h2 style={{ margin: 0 }}>{latestNewsletter.title}</h2>
                <p style={{ margin: 0, color: "#666" }}>{latestNewsletter.date}</p>
                <p style={{ margin: 0 }}>{latestNewsletter.excerpt}</p>
              </div>
            </div>
          </a>
        </div>
        {/* Newsletter List */}
        <ul className={styles.newsList}>
          {newsletters.map((n) => (
            <li key={n.slug} className={styles.newsItem}>
              <Link to={n.href} className={styles.newsCard}>
                <div className={styles.newsThumb}>
                  <img src={tsaLogo} alt="TSA Logo" style={{ width: 80, height: 70 }} />
                </div>
                <div className={styles.newsBody}>
                  <div className={styles.newsMeta}>
                    <span className={styles.newsTitle}>{n.title}</span>
                    <time className={styles.newsDate}>{n.date}</time>
                  </div>
                  <p className={styles.newsExcerpt}>{n.excerpt}</p>
                  <span className={styles.newsCTA}>Read More</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Newsletters;
