import { useState } from "react";
import LoginModal from "../Modal/LoginModal";
import "./LandingPage.css";

export default function LandingPage() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div className="landing-page">

            <div className="comic-container">

                <img
                    src="/landing-comic.png"
                    className="comic-image"
                    alt="Taiwan Student Association Festival Landing"
                />

                {/* Interactive hand ripple */}
                <div
                    className="hand-ripple"
                    onClick={openModal}
                    role="button"
                    tabIndex={0}
                    aria-label="Enter Nightmarket!"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            openModal();
                        }
                    }}
                >
                    {/* glow center */}
                    <div className="ripple-core"></div>

                    {/* ripple rings */}
                    <div className="ripple"></div>
                    <div className="ripple delay1"></div>
                    <div className="ripple delay2"></div>

                    {/* floating text */}
                    <div className="login-text">
                        Take my hand!
                    </div>

                    {/* sparkle particles */}
                    <span className="spark spark1"></span>
                    <span className="spark spark2"></span>
                    <span className="spark spark3"></span>
                </div>

            </div>

            <LoginModal
                isOpen={isOpen}
                onClose={closeModal}
            />
        </div>
    );
}