import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import usePhotos from "../photos/usePhotos";

const RotatingPics = () => {
  const { grouped: aboutPics } = usePhotos(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTdn96jdQ2YtCL9IUCi0q7ByZwIAdx5h10I7AgZHVX3YLhk51X-BrxFmQ8gg2t7MVvavM7l3AwrMaNa/pub?gid=76408374&single=true&output=csv"
  );
  const merged = aboutPics.flat();
  const images = merged.map((p) => p.src);
  const alts = merged.map((p) => p.alt);
  const links = merged.map((p) => p.link);

  const [rotIndex, setRotIndex] = useState(0); // rot

  useEffect(() => {
    if (images.length === 0) return;

    const id = setInterval(() => {
      setRotIndex((prev) => (prev + 1) % images.length);
    }, 5000); // rotate every 5s

    return () => clearInterval(id);
  }, [images]);
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.a
          key={rotIndex}
          href={links[rotIndex]}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.125 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={images[rotIndex]}
            alt={alts[rotIndex]}
            style={{
              width: "900px",
              height: "600px",
              objectFit: "cover",
              borderRadius: "20px",
            }}
          />
        </motion.a>
      </AnimatePresence>
    </>
  );
};

export default RotatingPics;
