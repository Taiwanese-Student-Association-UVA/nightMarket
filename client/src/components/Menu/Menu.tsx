import { useNavigate } from "react-router-dom";
import stampCard from "../../assets/StampCard.svg";
import stamps from "../../assets/stamp.svg";
import backStamp from "../../assets/back-button.png";
import claimButton from "../../assets/claim-button.svg";
import background from "../../assets/BG.png";
import lantern from "../../assets/lantern.png";


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
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        
        // ADD THESE THREE LINES:
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
          width: "100vw",
        }}
      >


        <img
          src={stampCard}
          alt="Stamp Card"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            margin: "0 auto",
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
            width: "clamp(20px, 40vw, 500px)",
            margin: "10px auto",
            display: "block",
            cursor: "pointer",
        }}
      />

    </div>
  );
}