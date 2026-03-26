import BackButton from "../BackButton.tsx";

export default function Merch() {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "white",
                overflow: "hidden"
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    zIndex: 10
                }}
            >
                <BackButton />
            </div>

            <iframe
                src="https://tsaatuva.org/"
                title="Merch Store"
                style={{
                    width: "100%",
                    height: "100%",
                    border: "none"
                }}
            />
        </div>
    );
}