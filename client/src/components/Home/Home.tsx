import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginModal from "../Modal/LoginModal";

import headerSvg from "../../assets/panels/overlay_building_lantern.png";
import activitySvg from "../../assets/panels/stamp card.png";
import scheduleSvg from "../../assets/panels/schedule.png";
import menuSvg from "../../assets/panels/stalls.png";
import infoSvg from "../../assets/panels/map.png";
import sponsorsSvg from "../../assets/panels/sponsors.png";

export default function Home() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const handleActivityClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowLogin(true);
      return;
    }

    navigate("/activity");
  };

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
          left: "4.6%",
          top: "-19%",
          width: "97.4%",
          height: "auto",
          display: "block",
          pointerEvents: "none",
        }}
      />

      <img
        src={activitySvg}
        alt="Activity"
        onClick={handleActivityClick}
        style={{
          position: "absolute",
          left: "4.487%",
          top: "27.987%",
          width: "61.590%",
          height: "auto",
          display: "block",
          cursor: "pointer",
          zIndex: 2,
        }}
      />

      <img
        src={scheduleSvg}
        alt="Schedule"
        onClick={() => navigate("/schedule")}
        style={{
          position: "absolute",
          left: "57.179%",
          top: "31.540%",
          width: "39.231%",
          height: "auto",
          display: "block",
          cursor: "pointer",
          zIndex: 3,
        }}
      />

      <img
        src={menuSvg}
        alt="Stands"
        onClick={() => navigate("/stands")}
        style={{
          position: "absolute",
          left: "4.487%",
          top: "45%",
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
          top: "65.56%",
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
          top: "81.8%",
          width: "92.051%",
          height: "auto",
          display: "block",
          cursor: "pointer",
          zIndex: 2,
        }}
      />

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}
