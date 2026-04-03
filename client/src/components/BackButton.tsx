import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BackButton() {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const styles = {
    button: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 16px",
      borderRadius: "10px",
      border: "none",
      backgroundColor: hover ? "#14062e" : "#ffe679",
      color: hover ? "white" : "#14062e",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s ease",
      boxShadow: hover
        ? "0 4px 12px rgba(0,0,0,0.2)"
        : "0 2px 6px rgba(0,0,0,0.15)",
    },
    arrow: {
      fontSize: "16px",
    },
  };

  return (
    <button
      style={styles.button}
      onClick={() => navigate("/home")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span style={styles.arrow}>←</span>
      Back
    </button>
  );
}
