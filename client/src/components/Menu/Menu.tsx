import { useNavigate } from "react-router-dom";
import stampCard from "../../assets/StampCard.svg";
import singleStamp from "../../assets/singleStamp.svg";
import backStamp from "../../assets/back-button.png";
import claimButton from "../../assets/claim-button.svg";
import background from "../../assets/BG.png";
import lantern from "../../assets/lantern.png";

export default function Menu() {
  const navigate = useNavigate();

  const stampPositions = [
    { id: 1, top: "43%", left: "16%", rotate: -9},
    { id: 2, top: "43%", left: "33%", rotate: 0 },
    { id: 3, top: "42%", left: "50%", rotate: 9 },
    { id: 4, top: "43%", left: "68%", rotate: -2 },
    { id: 5, top: "42%", left: "85%", rotate: -9 },

    { id: 6, top: "70%", left: "16%", rotate: 9 },
    { id: 7, top: "70%", left: "33%",  rotate: 1},
    { id: 8, top: "69%", left: "50%",  rotate:  2},
    { id: 9, top: "70%", left: "67%", rotate: -3 },
    { id: 10, top: "70%", left: "84.5%", rotate: 2 },
  ];

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img
        src={lantern}
        alt="Lantern"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
        }}
      >
        <img
          src={stampCard}
          alt="Stamp Card"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />

        {stampPositions.map((stamp) => (
        <img
            key={stamp.id}
            src={singleStamp}
            alt={`Stamp ${stamp.id}`}
            style={{
            position: "absolute",
            top: stamp.top,
            left: stamp.left,
            width: "17%",
            transform: `translate(-50%, -50%) rotate(${stamp.rotate}deg)`,
            zIndex: 10,
            pointerEvents: "none",
            }}
        />
        ))}

        <img
          src={backStamp}
          alt="Back"
          onClick={() => navigate(-1)}
          draggable={false}
          style={{
            position: "absolute",
            top: "15%",
            right: "10%",
            width: "12%",
            height: "auto",
            zIndex: 20,
            cursor: "pointer",
          }}
        />
      </div>

      <img
        src={claimButton}
        alt="Claim Reward"
        onClick={() => console.log("Claim reward")}
        style={{
          width: "clamp(120px, 40vw, 500px)",
          margin: "10px auto",
          display: "block",
          cursor: "pointer",
        }}
      />
    </div>
  );
}