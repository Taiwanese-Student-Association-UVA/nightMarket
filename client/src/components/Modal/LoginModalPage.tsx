import LoginModal from "./LoginModal";
import { useState } from "react";

export default function LoginModalPage() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "white",
            }}
        >
            <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
}