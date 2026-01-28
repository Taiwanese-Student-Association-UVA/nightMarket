import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './Footer.css'; // Plain CSS (no CSS Modules)
import locationIcon from '../../assets/footer/icons8-location-48.png';
import mail from '../../assets/footer/icons8-mail-48.png';
import insta from '../../assets/footer/icons8-instagram-48.png';
import face from '../../assets/footer/icons8-facebook-48.png';
import link from '../../assets/footer/icons8-linkedin-48.png';

const Footer: React.FC = () => {
    const [email, setEmail] = useState("");

    const MAILCHIMP_SIGNUP =
        "https://virginia.us14.list-manage.com/subscribe?u=45792a76bc10b7924d7ccb62e&id=53139167b0";

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();

        // If email is filled, add it as a query param
        const url = email
            ? `${MAILCHIMP_SIGNUP}&EMAIL=${encodeURIComponent(email)}`
            : MAILCHIMP_SIGNUP;

        window.open(url, "_blank", "noopener,noreferrer");
    };


    return (
        <footer className="modern-footer pt-5">
            <div className="container footer-content">
                <div className="row g-4 mb-5">
                    {/* Company Info */}
                    <div className="col-lg-4 col-md-6">
                        <Link to="/" className="footer-logo d-block mb-4">
                            TSA at UVA<span className="text-primary">.</span>
                        </Link>
                        <p className="text-muted mb-4">
                            Taiwanese Student Association at the University of Virginia
                        </p>
                        <ul className="contact-info mb-4">
                            <li>
                                <img src={locationIcon} alt="Location" className="footer-icon me-2"/>
                                <a
                                    href="https://www.google.com/maps/place/Charlottesville,+VA"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Charlottesville, VA
                                </a>
                            </li>
                            <li>
                                <img src={mail} alt="Email" className="footer-icon me-2"/>
                                <a href="mailto:gxu6vn@virginia.edu">gxu6vn@virginia.edu</a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="col-lg-4 col-md-6">
                        <h3 className="footer-title">Quick Links</h3>
                        <ul className="quick-links">
                            <Link to="/about" onClick={() => window.scrollTo(0, 0)}>About TSA</Link>
                            <li>
                                <a href="https://docs.google.com/forms/d/e/1FAIpQLSftSERM8_jiPzLZRzk6YRDPmnori-rrAtH-p7Octp12DV666Q/viewform?usp=dialog" target="_blank" rel="noreferrer">
                                    Feedback/Reporting
                                </a>
                            </li>
                            <Link to="/events" onClick={() => window.scrollTo(0, 0)}>Events</Link>
                            <li>
                                <a href="https://docs.google.com/forms/d/1Es_WPwxx0FnvEDfbVy6pwEMEBuU39NpTwWwzkUNMaFA/edit?usp=drivesdk" target="_blank" rel="noreferrer">
                                    EZ Card Eats
                                </a>
                            </li>
                            <Link to="/partners" onClick={() => window.scrollTo(0, 0)}>Partners</Link>
                            <li>
                                <a href="https://docs.google.com/forms/d/1uouf15PCENhuFF1DsOefIZFNq8-z2reEWTXgt0gUeYk/edit?usp=drivesdk" target="_blank" rel="noreferrer">
                                    Announcement Request
                                </a>
                            </li>
                            <Link to="/archive" onClick={() => window.scrollTo(0, 0)}>Archive</Link>
                        </ul>
                    </div>

                    {/* Newsletter + Social Icons */}
                    <div className="col-lg-4 col-md-12">
                        <h3 className="footer-title">Stay Connected</h3>
                        <p className="text-muted mb-4">
                            Subscribe to our newsletter for the latest updates.
                        </p>

                        {/* Email input that opens Mailchimp with email pre-filled */}
                        <form className="mb-4" onSubmit={handleSubscribe}>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control newsletter-input"
                                    placeholder="Your email address"
                                />
                            </div>
                            <button type="submit" className="btn btn-subscribe text-white w-100">
                                Subscribe Now
                            </button>
                        </form>

                        <div className="social-links">
                            <a href="https://www.facebook.com/groups/tsaatuva" className="social-icon" target="_blank"
                               rel="noreferrer">
                                <img src={face} alt="Facebook"/>
                            </a>
                            <a href="https://www.instagram.com/tsaatuva" className="social-icon" target="_blank"
                               rel="noreferrer">
                                <img src={insta} alt="Instagram"/>
                            </a>
                            <a href="https://www.linkedin.com/company/tsaatuva/" className="social-icon" target="_blank"
                               rel="noreferrer">
                                <img src={link} alt="LinkedIn"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="row py-4">
                        <div className="col-md-6 text-center text-md-start">
                            <p>&copy; {new Date().getFullYear()} TSA at UVA. All rights reserved.</p>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <p>
                                Made with ❤️ by TSA at UVA
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
