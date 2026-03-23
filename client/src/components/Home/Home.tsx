import { useNavigate } from "react-router-dom";
import headerImage from "../../assets/home/header.svg";
import panelsImage from "../../assets/home/panels.svg";
import wordsImage from "../../assets/home/words.svg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100vw", background: "white" }}>
      <div
        style={{
          position: "sticky",
          top: "0vh",
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        <img
          src={headerImage}
          alt="Night Market Header"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </div>
      <div
        style={{
          width: "100%",
          position: "relative",
          padding: "0 4vw 4vh",
          boxSizing: "border-box",
          marginTop: "-8vh",
        }}
      >
        <img
          src={panelsImage}
          alt="Night Market Home"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        <img
          src={wordsImage}
          alt="Panel Labels"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "87%",
            height: "auto",
            pointerEvents: "none",
          }}
        />
        <button
          aria-label="Activity"
          onClick={() => navigate("/activity")}
          style={{ position: "absolute", top: "5%", left: "4%", width: "92%", height: "9%", opacity: 0, cursor: "pointer" }}
        />
        <button
          aria-label="Menu"
          onClick={() => navigate("/menu")}
          style={{ position: "absolute", top: "42%", left: "10%", width: "62%", height: "16%", opacity: 0, cursor: "pointer" }}
        />
        <button
          aria-label="Map"
          onClick={() => navigate("/map")}
          style={{ position: "absolute", top: "45%", left: "58%", width: "38%", height: "21%", opacity: 0, cursor: "pointer" }}
        />
        <button
          aria-label="Schedule"
          onClick={() => navigate("/schedule")}
          style={{ position: "absolute", top: "57%", left: "4%", width: "60%", height: "14%", opacity: 0, cursor: "pointer" }}
        />
        <button
          aria-label="Directions"
          onClick={() => {
            window.location.href = "https://maps.app.goo.gl/ZwNFrEBbVZn1Pw1u8";
          }}
          style={{ position: "absolute", top: "79%", left: "4%", width: "92%", height: "9%", opacity: 0, cursor: "pointer" }}
        />
        <button
          aria-label="TSA Website"
          onClick={() => {
            window.location.href = "https://tsaatuva.org";
          }}
          style={{ position: "absolute", top: "90%", left: "4%", width: "92%", height: "9%", opacity: 0, cursor: "pointer" }}
        />
      </div>
    </div>
  );
}