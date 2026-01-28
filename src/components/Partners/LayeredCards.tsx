import styles from "./Layered.module.css";
import { motion } from "framer-motion";
import { useState } from "react";

const LayeredCards = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const cardData = [
    {
      title: "How it works",
      color: "#2e2d6aff",
      description: (
        <>
          <p>You can enjoy the perks in just three simple steps!</p>
          <ul>
            <li>
              <strong>Get Your Card</strong> - Purchase your EasyCard at TSA
              GBMs, exec office hours (TBD), or at our major events with cash,
              Venmo (@tsaatuva) or Zelle (
              uvataiwanesestudentassociation@gmail.com)
            </li>
            <li>
              <strong>Show & Save</strong> - Simply show your EasyCard at
              checkout or the register at participating businesses and TSA
              tables
            </li>
            <li>
              <strong>Enjoy the Perks</strong> - Discounts, raffle tickets,
              express lines, and more - your card pays for itself fast
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Perks and Benefits",
      color: "#344697ff",
      description: (
        <>
          <p>Here's what you get for just $12:</p>
          <ul>
            <li>
              <strong>Discounts with Local Partners</strong>
              <ul>
                <li>
                  Free topping at Chap's (The Corner & Downtown locations)
                </li>
                <li>10% off at Extreme Pizza (5th Street Station)</li>
                <li>More partners coming soon!</li>
              </ul>
            </li>
            <li>
              <strong>TSA Event Perks</strong>
              <ul>
                <li>
                  Express check-in at Night Market & Taste of Taiwan (skip the
                  line!)
                </li>
                <li>
                  3 extra raffle tickets at Night Market -- get a chance to win
                  tea sets, gift cards, and merch!
                </li>
                <li>10% off ALL TSA merch</li>
                <li>Discounted TSA Semiformal Tickets (Discount info TBD)</li>
                <li>
                  Free professional headshots/photoshoots on the Lawn (Sep 24,
                  4-6PM)
                </li>
              </ul>
            </li>
          </ul>
          <p>Don't wait -- get your TSA EasyCard and start saving!</p>
        </>
      ),
    },
    {
      title: "Where to buy",
      color: "#5d4192ff",
      description: (
        <>
          <p>
            Use{" "}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdus5kf130mc1cx7cntWze_9kLwXQc-exCCTYRY58_nLtwHoA/viewform"
              target="_blank"
              rel="noreferrer"
            >
              <strong>
                <em>this order form</em>
              </strong>
            </a>{" "}
            to purchase your EasyCard! <br />
            Pickup your EasyCards at these events:
          </p>
          <ul>
            <li>General Body Meetings</li>
            <li>Exec Office Hours (coming soon!)</li>
            <li>
              Major TSA Events (Fam Reveals, Mid-Autumn Fest, Taste of Taiwan,
              etc.)
            </li>
          </ul>
          <p>
            Keep up with the latest sales announcements on Instagram{" "}
            <a
              href="https://www.instagram.com/tsaatuva?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D"
              target="_blank"
              rel="noreferrer"
            >
              @tsaatuva!
            </a>
          </p>
        </>
      ),
    },
  ];

  return (
    <div className={styles.cardsContainer}>
      {cardData.map((card, index) => {
        const totalCards = cardData.length;
        const middleIndex = (totalCards - 1) / 2;

        // Calculate rotation: cards fan out from center
        const rotationAngle = (index - middleIndex) * 6;

        // Calculate horizontal offset to create fan effect
        const offsetX = (index - middleIndex) * 400;

        // Calculate z-index: middle cards on top
        const distanceFromMiddle = Math.abs(index - middleIndex);
        const zIndex = totalCards - distanceFromMiddle;

        return (
          <motion.div
            key={index}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            initial={{
              rotate: rotationAngle,
              x: offsetX,
              y: 0,
              scale: 1,
            }}
            animate={{
              rotate: hoveredIndex === index ? 0 : rotationAngle,
              x: hoveredIndex === index ? offsetX : offsetX,
              y: hoveredIndex === index ? -20 : 0,
              scale: hoveredIndex === index ? 1.05 : 1,
              zIndex: hoveredIndex === index ? 100 : zIndex,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className={styles.card}
            style={{
              background: card.color,
              color: "white",
            }}
          >
            <h2 className={styles.cardTitle}>{card.title}</h2>

            <div className={styles.cardDescription}>{card.description}</div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default LayeredCards;
