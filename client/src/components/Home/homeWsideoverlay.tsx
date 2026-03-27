import { useNavigate } from "react-router-dom";

import headerSvg from "../../assets/panels/header + overlay.png";
import activitySvg from "../../assets/panels/game stamps.png";
import merchSvg from "../../assets/panels/merch.png";
import menuSvg from "../../assets/panels/menu.png";
import infoSvg from "../../assets/panels/schedule + map.png";
import sponsorsSvg from "../../assets/panels/sponsors.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100vw",
        position: "relative",
        aspectRatio: "390 / 844",
        overflow: "hidden",
      }}
    >

      
      <img
        src={headerSvg}
        alt="Header"
        style={{
          position: "absolute",
          left: "-15.415%",
          top: "-20%",
          width: "117%",
          height: "auto",
          display: "block",
          pointerEvents: "none",
        }}
      />
      

      <img
        src={activitySvg}
        alt="Activity"
        onClick={() => navigate("/activity")}
        style={{
          position: "absolute",
          left: "4.487%",
          top: "26.987%",
          width: "61.590%",
          height: "auto",
          display: "block",
          cursor: "pointer",
          zIndex: 2,
        }}
      />

      <img
        src={merchSvg}
        alt="Merch"
        onClick={() => navigate("/merch")}
        style={{
          position: "absolute",
          left: "57.179%",
          top: "29.540%",
          width: "39.231%",
          height: "auto",
          display: "block",
          cursor: "pointer",
          zIndex: 3,
        }}
      />

      <img
        src={menuSvg}
        alt="Menu"
        onClick={() => navigate("/menu")}
        style={{
          position: "absolute",
          left: "4.487%",
          top: "43%",
          width: "57.103%",
          height: "auto",
          display: "block",
          cursor: "pointer",
          zIndex: 2,
        }}
      />

      <img
        src={infoSvg}
        alt="Info"
        onClick={() => navigate("/info")}
        style={{
          position: "absolute",
          left: "4.72%",
          top: "63.86%",
          width: "91.538%",
          height: "auto",
          display: "block",
          cursor: "pointer",
          zIndex: 2,
        }}
      />

      <img
        src={sponsorsSvg}
        alt="Sponsors"
        onClick={() => navigate("/sponsors")}
        style={{
          position: "absolute",
          left: "4.487%",
          top: "79.4%",
          width: "92.051%",
          height: "auto",
          display: "block",
          cursor: "pointer",
          zIndex: 2,
        }}
      />
    </div>
  );
}