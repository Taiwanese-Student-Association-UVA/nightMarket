import { useNavigate } from "react-router-dom";
import stampCard from "../../assets/StampCard.svg";

export default function Menu() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100vw",
        }}
      >
        {/* Stamp-style Back Button */}
        <button
        onClick={() => navigate(-1)}
        style={{
            position: "absolute",
            top: "6%",
            right: "5%",

            width: "12%",
            aspectRatio: "1",
            boxSizing: "border-box",

            borderRadius: "50%",
            border: "0.45vw dashed #7A1A1A",
            background: "#d9414100",
            color: "#7A1A1A",

            fontSize: "1.8vw",
            fontWeight: 700,
            letterSpacing: "0.08em",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            transform: "rotate(20deg)",
            zIndex: 10,
            cursor: "pointer",
            padding: 0,
            lineHeight: 1,
        }}
        >
        BACK
        </button>

        {/* Stamp Card */}
        <img
          src={stampCard}
          alt="Stamp Card"
          style={{
            width: "100vw",
            height: "auto",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}