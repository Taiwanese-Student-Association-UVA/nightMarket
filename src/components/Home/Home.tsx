import styles from "./Home.module.css";
import { ezCard } from "../../assets/index";
import MarqueePics from "./MarqueePics";
import RotatingPics from "./RotatingPics";
import Socials from "./Socials";

const Home = () => {
  return (
    <>
      <div className={styles.beginning}>
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeSection}>
            <MarqueePics />
          </div>
        </div>
        <div className={styles.glass}>
          <div className={styles.beginningText}>
            <h1>
              Welcome to
              <br />
              TSA@UVA
            </h1>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.about}>
          <strong>
            <h2>
              <strong>Who we are...</strong>
            </h2>
          </strong>
          <div className={styles.rotatingImages}>
            <RotatingPics />
          </div>
          <p>
            UVA's Taiwanese Student Association (TSA) is a student-run,
            undergraduate community celebrating Taiwanese culture on Grounds.
            Through cultural showcases, friendly socials, and service
            projects—including Night Market and Taste of Taiwan—we deepen
            appreciation for Taiwan and create a welcoming home for students of
            every background.
          </p>

          <div className={styles.social}>
            <h3>Follow us on our socials!</h3>
            <Socials />
          </div>
          <div className={styles.forms}>
            <h3>Become a member today!</h3>
            <a
              href="https://forms.office.com/r/4G44DqZ5qD"
              target="_blank"
              rel="noreferrer"
            >
              <button>Member Form</button>
            </a>
          </div>
        </div>
        <div className={styles.ezcard}>
          <h2>
            <strong>Our EZCards</strong>
          </h2>
          <p>
            This year we are introducing our brand new TSA EasyCard! This card
            is your passport to exclusive perks, discounts, and EasyCard only
            benefits all year long. For just $12, you'll unlock over $50 in
            value through savings at local businesses, priority access at TSA
            events, and free extras made just for you!
          </p>
          <p>
            To learn how to use our EZCards or read up on all of the perks you
            can get, click on the EZCard below!
          </p>
          <div className={styles.pic}>
            <a href="partners">
              <img src={ezCard} alt="TSA EzCard" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
