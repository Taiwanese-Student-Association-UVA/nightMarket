import { useNavigate } from "react-router-dom";
import stampCard from "../../assets/StampCard.svg";
import stamps from "../../assets/stamp.svg";
import backStamp from "../../assets/back-button.png";

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
        <img
          src={stampCard}
          alt="Stamp Card"
          style={{
            width: "100vw",
            height: "auto",
            display: "block",
          }}
        />

        <img
        src={stamps}
        alt="Stamps"
        style={{
            position: "absolute",
            top: "50%",
            left: "50%",

            width: "100%",
            height: "auto",

            transform: "translate(-50%, -42%) scale(0.9)",  // 👈 KEY
            transformOrigin: "center",

            zIndex: 10,
            pointerEvents: "none",
        }}
        />
        <img
          src={backStamp}
          alt="Back"
          onClick={() => navigate(-1)}
          draggable={false}
          style={{
            position: "absolute",
            top: "6%",
            right: "5%",
            width: "12%",
            height: "auto",
            zIndex: 20,
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
}