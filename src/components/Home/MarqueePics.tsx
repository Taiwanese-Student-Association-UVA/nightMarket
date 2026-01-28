import styles from "./Home.module.css";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import usePhotos from "../photos/usePhotos";

const MarqueePics = () => {
  const { grouped: marqueePics } = usePhotos(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTdn96jdQ2YtCL9IUCi0q7ByZwIAdx5h10I7AgZHVX3YLhk51X-BrxFmQ8gg2t7MVvavM7l3AwrMaNa/pub?gid=0&single=true&output=csv"
  );
  return (
    <>
      {marqueePics.map((row, index) => (
        <Marquee
          key={index}
          speed={40}
          gradient={false}
          direction={index % 2 === 1 ? "right" : "left"}
        >
          {row.map((photo, i) => (
            <a key={i} href={photo.link} target="_blank" rel="noreferrer">
              <motion.img
                src={photo.src}
                alt={photo.alt}
                className={styles.pictures}
                initial={{ opacity: 0.5 }}
                whileInView={{ opacity: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ opacity: 1 }}
                animate={{}}
              />
            </a>
          ))}
        </Marquee>
      ))}
    </>
  );
};

export default MarqueePics;
