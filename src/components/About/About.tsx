import React, { useState } from "react";
import "./about.css";
import BoardSection from "./BoardSection";
import ContactForm from "./ContactForm";
import { IG, FB, LI, IGhover, FBhover, LIhover } from "../../assets/buttons/index";

const MEMBERSHIP_FORM = "https://forms.office.com/r/4G44DqZ5qD";
const MAILCHIMP_SIGNUP =
  "https://virginia.us14.list-manage.com/subscribe?u=45792a76bc10b7924d7ccb62e&id=53139167b0";

const About: React.FC = () => {
  const [instagramImg, setInstagramImg] = useState(IG);
  const [facebookImg, setFacebookImg] = useState(FB);
  const [linkedinImg, setLinkedinImg] = useState(LI);

  return (
    <main className="page">
      <section className="section">
        <header className="sectionHeader">
          <h1 className="title">About Us</h1>
        </header>

        <div className="twoCol">
          <article className="cardLike">
            <h2 className="sectionTitle">Mission</h2>
            <p className="muted">
              We bring Taiwan to UVA—celebrating culture, welcoming new students, and helping our campus learn about Taiwan’s
              social, cultural, economic, and civic life. Together with APISAA partners, we build community and give back to
              Charlottesville through outreach and fundraising.
            </p>
          </article>

          <article className="cardLike">
            <h2 className="sectionTitle">Constitution</h2>
            <p className="muted">
              Learn how we’re structured and governed—our values, officer roles, elections, and decision processes.
            </p>
            <a
              className="viewAll"
              href="https://drive.google.com/file/d/1mgEBhZye2aRiIFXXImn6tV_c6nXUcmGm/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              View Constitution
            </a>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="ctaCard">
          <h3 className="ctaTitle">Get Involved</h3>
          <div className="ctaActions">
            <a className="btn" href={MEMBERSHIP_FORM} target="_blank" rel="noreferrer">
              Become a member
            </a>
            <a className="btnGhost" href={MAILCHIMP_SIGNUP} target="_blank" rel="noreferrer">
              Join our newsletter
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="twoCol">
          <article className="cardLike">
            <h2 className="sectionTitle">Follow Us</h2>
            <div className="socialRow" style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <a
                href="https://www.instagram.com/tsaatuva?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noreferrer"
                onMouseOver={() => setInstagramImg(IGhover)}
                onMouseOut={() => setInstagramImg(IG)}
                aria-label="Instagram"
              >
                <img src={instagramImg} alt="TSA Instagram" style={{ height: 56 }} />
              </a>
              <a
                href="https://www.facebook.com/groups/tsaatuva"
                target="_blank"
                rel="noreferrer"
                onMouseOver={() => setFacebookImg(FBhover)}
                onMouseOut={() => setFacebookImg(FB)}
                aria-label="Facebook"
              >
                <img src={facebookImg} alt="TSA Facebook" style={{ height: 56 }} />
              </a>
              <a
                href="https://www.linkedin.com/company/tsaatuva/"
                target="_blank"
                rel="noreferrer"
                onMouseOver={() => setLinkedinImg(LIhover)}
                onMouseOut={() => setLinkedinImg(LI)}
                aria-label="LinkedIn"
              >
                <img src={linkedinImg} alt="TSA LinkedIn" style={{ height: 56 }} />
              </a>
            </div>
          </article>

          <article className="cardLike">
            <h2 className="sectionTitle">Membership</h2>
            <p className="muted">Join our community and get access to events, mentorship, and more.</p>
            <a className="viewAll" href={MEMBERSHIP_FORM} target="_blank" rel="noreferrer">
              Learn more
            </a>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <h2 className="sectionTitle">TSA Board</h2>
        </div>
        <BoardSection />
      </section>

      {/*
      <section className="section" id="past-boards">
        <div className="sectionHeader">
          <h2 className="sectionTitle">Past Boards</h2>
        </div>
      </section>
      */}

      <section className="section">
        <div className="sectionHeader">
          <h2 className="sectionTitle">Contact Us (Just DM us on Instagram or Email Exec for now!)</h2>
        </div>
        <div className="cardLike">
          <ContactForm postUrl="/api/contact" />
        </div>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <h2 className="sectionTitle">Feedback Forms</h2>
        </div>

        <ul className="list">
          <li>
            <a className="listCard" href="https://docs.google.com/forms/d/e/1FAIpQLSftSERM8_jiPzLZRzk6YRDPmnori-rrAtH-p7Octp12DV666Q/viewform?usp=dialog" target="_blank" rel="noreferrer">
              <div className="listThumb" />
              <div className="listBody">
                <div className="listMeta">
                  <span className="listTitle">Anonymous Feedback/Reporting Form</span>
                  <span className="listDate">Open</span>
                </div>
                <p className="listExcerpt">Give us feedback on events and report misconduct anonymously here.</p>
                <span className="listCTA">→</span>
              </div>
            </a>
          </li>

          <li>
            <a className="listCard" href="https://docs.google.com/forms/d/1Es_WPwxx0FnvEDfbVy6pwEMEBuU39NpTwWwzkUNMaFA/edit?usp=drivesdk" target="_blank" rel="noreferrer">
              <div className="listThumb" />
              <div className="listBody">
                <div className="listMeta">
                  <span className="listTitle">EasyCard Eats Form</span>
                  <span className="listDate">Open</span>
                </div>
                <p className="listExcerpt">Got a fun moment you want to share in our newsletter? Fill out this quick form! We’d love to feature you!</p>
                <span className="listCTA">→</span>
              </div>
            </a>
          </li>

          <li>
            <a className="listCard" href="https://docs.google.com/forms/d/1uouf15PCENhuFF1DsOefIZFNq8-z2reEWTXgt0gUeYk/edit?usp=drivesdk" target="_blank" rel="noreferrer">
              <div className="listThumb" />
              <div className="listBody">
                <div className="listMeta">
                  <span className="listTitle">Newsletter External Announcement Request Form</span>
                  <span className="listDate">Open</span>
                </div>
                <p className="listExcerpt">Fill out this form if you have any announcements/events/other fun items you'd like to share in the TSA newsletter!</p>
                <span className="listCTA">→</span>
              </div>
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default About;
