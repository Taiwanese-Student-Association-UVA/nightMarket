import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Archive.module.css";
import FacebookPageEmbed from "./FacebookPageEmbed";
import StaticImageGrid from "./StaticImageGrid";

const heroSlides = [
  {
    src: require("../../assets/Photos/NM1.jpg"),
    title: "TSA 24-25 Exec with TECRO at Night Market",
    tag: "Like Taiwan's Night Markets!",
  },
  {
    src: require("../../assets/Photos/L1.jpg"),
    title: "Lantern Painting",
    tag: "Arts & Crafts!",
  },
  {
    src: require("../../assets/Photos/D1.jpg"),
    title: "Dumpling Making",
    tag: "Free Food Events!",
  },
  {
    src: require("../../assets/Photos/M1.jpg"),
    title: "Mid-Autumn Festival",
    tag: "Cultural Celebrations!",
  },
];

const newsletterList = [
  {
    slug: "coming-soon",
    title: "Newsletter Archive",
    excerpt: "View all of our past newsletters here!",
    date: "2025-2026",
    href: "https://us14.campaign-archive.com/home/?u=45792a76bc10b7924d7ccb62e&id=53139167b0",
  },
  
];

function useAutoplay(count: number, delay = 5000) {
  const [i, setI] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setI((v) => (v + 1) % count);
    }, delay);
    return () => clearInterval(id);
  }, [count, delay]);

  return {
    index: i,
    setIndex: setI,
    onMouseEnter: () => (paused.current = true),
    onMouseLeave: () => (paused.current = false),
  };
}

const Archive: React.FC = () => {
  const slideCount = heroSlides.length;
  const { index, setIndex, onMouseEnter, onMouseLeave } =
    useAutoplay(slideCount, 5500);

  const startX = useRef<number | null>(null);
  const onTouchStart: React.TouchEventHandler = (e) =>
    (startX.current = e.touches[0].clientX);
  const onTouchEnd: React.TouchEventHandler = (e) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 40) setIndex((v) => (v - 1 + slideCount) % slideCount);
    if (dx < -40) setIndex((v) => (v + 1) % slideCount);
    startX.current = null;
  };

  const trackStyle = useMemo(
    () => ({ transform: `translateX(${-index * 100}%)` }),
    [index]
  );

  const FB_WIDTH = 500;
  const FB_HEIGHT = 750;

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Archive</h1>

      <section
        className={styles.hero}
        aria-label="Highlights"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className={styles.heroViewport}>
          <div className={styles.heroTrack} style={trackStyle}>
            {heroSlides.map((s, i) => (
              <article className={styles.slide} key={i}>
                <div className={styles.slideImgWrapper}>
                  <img className={styles.slideImg} src={s.src} alt={s.title} />
                  <div className={styles.slideOverlay}>
                    <div className={styles.slideTag}>{s.tag}</div>
                    <h3 className={styles.slideTitle}>{s.title}</h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button
          className={`${styles.navBtn} ${styles.prev}`}
          aria-label="Previous slide"
          onClick={() => setIndex((v) => (v - 1 + slideCount) % slideCount)}
        >
          ‹
        </button>
        <button
          className={`${styles.navBtn} ${styles.next}`}
          aria-label="Next slide"
          onClick={() => setIndex((v) => (v + 1) % slideCount)}
        >
          ›
        </button>

        <div className={styles.dots} role="tablist" aria-label="Slide selector">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Gallery</h2>
          <a className={styles.viewAll} href="https://www.facebook.com/tsauvagallery" target="_blank" rel="noreferrer">
            View on Facebook
          </a>
        </div>
        <div className={styles.fbGalleryRow}>
          <div className={styles.fbCol} style={{ width: FB_WIDTH, height: FB_HEIGHT }}>
            <FacebookPageEmbed
              pageUrl="https://www.facebook.com/tsauvagallery"
              tabs="timeline"
              height={FB_HEIGHT}
            />
          </div>
          <div className={styles.staticCol} style={{ width: FB_WIDTH, height: FB_HEIGHT }}>
            <StaticImageGrid width={FB_WIDTH} height={FB_HEIGHT} />
          </div>
        </div>
      </section>

            <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Newsletters</h2>
          <Link className={styles.viewAll} to="https://us14.campaign-archive.com/home/?u=45792a76bc10b7924d7ccb62e&id=53139167b0">
            View All
          </Link>
        </div>

        <ul className={styles.newsList}>
          {newsletterList.map((n, i) => (
            <li key={`${n.slug}-${i}`} className={styles.newsItem}>
              <Link
                to={n.href ?? "https://us14.campaign-archive.com/home/?u=45792a76bc10b7924d7ccb62e&id=53139167b0"}
                className={styles.newsCard}
                aria-label={`${n.title ?? "Coming Soon"} — ${n.date ?? ""}`}
              >
                <div className={styles.newsThumb} />
                <div className={styles.newsBody}>
                  <div className={styles.newsMeta}>
                    <span className={styles.newsTitle}>{n.title ?? "Newsletter Archive"}</span>
                    <time className={styles.newsDate}>{n.date ?? "2025-2026"}</time>
                  </div>
                  <p className={styles.newsExcerpt}>{n.excerpt ?? "View all of our past newsletters here!"}</p>
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

export default Archive;