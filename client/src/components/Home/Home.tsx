import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";

import headerSvg from "../../assets/panels/header.png";
import activitySvg from "../../assets/panels/game stamps.png";
import merchSvg from "../../assets/panels/merch.png";
import menuSvg from "../../assets/panels/menu.png";
import infoSvg from "../../assets/panels/schedule + map.png";
import sponsorsSvg from "../../assets/panels/sponsors.png";

export default function Home() {
  const navigate = useNavigate();

  const panelStyle: CSSProperties = {
    position: "absolute",
    display: "block",
    transform: "translateZ(0)",
    WebkitTransform: "translateZ(0)",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "390px",
        margin: "0 auto",
        position: "relative",
        aspectRatio: "390 / 844",
        overflow: "hidden",
      }}
    >
      <img
        src={headerSvg}
        alt="Header"
        draggable={false}
        style={{
          ...panelStyle,
          left: "4.615%",
          top: "3%",
          width: "92.051%",
          pointerEvents: "none",
        }}
      />

      <img
        src={activitySvg}
        alt="Activity"
        draggable={false}
        onClick={() => navigate("/activity")}
        style={{
          ...panelStyle,
          left: "4.487%",
          top: "26.987%",
          width: "61.59%",
          cursor: "pointer",
          zIndex: 2,
        }}
      />

      <img
        src={merchSvg}
        alt="Merch"
        draggable={false}
        onClick={() => navigate("/merch")}
        style={{
          ...panelStyle,
          left: "57.179%",
          top: "29.54%",
          width: "39.231%",
          cursor: "pointer",
          zIndex: 3,
        }}
      />

      <img
        src={menuSvg}
        alt="Menu"
        draggable={false}
        onClick={() => navigate("/menu")}
        style={{
          ...panelStyle,
          left: "4.487%",
          top: "43%",
          width: "57.103%",
          cursor: "pointer",
          zIndex: 2,
        }}
      />

      <img
        src={infoSvg}
        alt="Info"
        draggable={false}
        onClick={() => navigate("/info")}
        style={{
          ...panelStyle,
          left: "4.72%",
          top: "63.86%",
          width: "91.538%",
          cursor: "pointer",
          zIndex: 2,
        }}
      />

      <img
        src={sponsorsSvg}
        alt="Sponsors"
        draggable={false}
        onClick={() => navigate("/sponsors")}
        style={{
          ...panelStyle,
          left: "4.487%",
          top: "79.4%",
          width: "92.051%",
          cursor: "pointer",
          zIndex: 2,
        }}
      />
    </div>
  );
}