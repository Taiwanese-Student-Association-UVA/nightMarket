import { useState } from "react";
import LoginModal from "../Modal/LoginModal";
import "./LandingPage.css";

export default function LandingPage() {

    const [isOpen, setIsOpen] = useState(false);
    const [activate, setActivate] = useState(false);

    const openModal = () => {
        if (activate) return;

        setActivate(true);

        setTimeout(() => {
            setIsOpen(true);
            setActivate(false);
        }, 400);
    };

    const closeModal = () => setIsOpen(false);

    return (
        <div className="landing-page">

            <div className="comic-container">

                <img
                    src="/landing-comic.png"
                    className="comic-image"
                    alt="Taiwan Student Association Festival Landing"
                />

                <div
                    className={`hand-ripple ${activate ? "activate" : ""}`}
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

                    <div className="ripple-core"></div>

                    <div className="ripple"></div>
                    <div className="ripple delay1"></div>
                    <div className="ripple delay2"></div>

                    <div className="login-text">
                        Take my hand!
                    </div>

                    <span className="spark spark1"></span>
                    <span className="spark spark2"></span>
                    <span className="spark spark3"></span>
                    <span className="spark spark4"></span>
                    <span className="spark spark5"></span>
                    <span className="spark spark6"></span>
                    <span className="spark spark7"></span>
                    <span className="spark spark8"></span>

                </div>

            </div>

            <LoginModal
                isOpen={isOpen}
                onClose={closeModal}
            />
        </div>
    );
}