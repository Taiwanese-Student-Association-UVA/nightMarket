import { useState } from "react";
import LoginModal from "../Modal/LoginModal";
import "./LandingPage.css";

export default function LandingPage() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="landing-page">

            <div className="comic-container">

                <img
                    src="/landing-comic.png"
                    className="comic-image"
                    alt="Festival Landing"
                />

                {/* Ripple placed relative to image */}
                <div
                    className="hand-ripple"
                    onClick={() => setIsOpen(true)}
                >
                    <div className="ripple"></div>
                    <div className="ripple delay"></div>

                    <div className="login-text">
                        Register / Login
                    </div>
                </div>

            </div>

            <LoginModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </div>
    );
}