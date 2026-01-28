import styles from "./Partners.module.css";
import {
  Chaps,
  Extreme,
  ComingSoon,
  packet,
} from "../../assets/partners/index";
import { ezCard } from "../../assets/index";
import LayeredCards from "./LayeredCards";

const FloatingLogo = () => {
  return (
    <img src={ezCard} alt="floating EZCard" className={styles.floatingImage} />
  );
};

const Partners = () => {
  return (
    <>
      <div className={styles.partnerBG}>
        <div className={styles.Header}>
          <FloatingLogo />
          <h1>
            <strong>Introducing TSA's EZCards!</strong>
          </h1>
          <p>
            This year we are introducing our brand new TSA EasyCard! This card
            is your passport to exclusive perks, discounts, and EasyCard only
            benefits all year long. For just{" "}
            <strong>
              <em>$12</em>
            </strong>
            , you’ll unlock over{" "}
            <strong>
              <em>$50</em>
            </strong>{" "}
            in value through savings at local businesses, priority access at TSA
            events, and free extras made just for you!
          </p>
          <br />
          <h2>Our Current Partners</h2>
          <hr />
          <div className={styles.pictures}>
            <a
              href="https://www.chapsicecream.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Chaps} alt="Chaps Ice Cream logo" />
            </a>
            <a
              href="https://www.extremepizza.com/location/charlottesville-virginia/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Extreme} alt="Extreme Pizza logo" />
            </a>
            <img src={ComingSoon} alt="Placeholder for incoming partners" />
          </div>
        </div>
        <div className={styles.information}>
          <LayeredCards />
        </div>
        <div className={styles.Package}>
          <p>
            <strong>
              Interested in becoming a <em>partner</em>?
            </strong>
            <h2>Become One Today!</h2>
            Explore our partnership package below to take the next steps toward
            joining our community of partners.
          </p>
          <iframe src={packet} title="25-26 TSA Partnership Package"></iframe>
        </div>
      </div>
    </>
  );
};

export default Partners;
