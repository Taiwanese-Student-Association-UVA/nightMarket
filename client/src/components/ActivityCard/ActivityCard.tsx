import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import stampCard from "../../assets/stampCard.svg";
import singleStamp from "../../assets/singleStamp.svg";
import backStamp from "../../assets/back-button.png";
import claimButton from "../../assets/claim-button.svg";
import background from "../../assets/BG.png";
import lantern from "../../assets/lantern.png";

export default function ActivityCard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [points, setPoints] = useState(0);
  const [scannedStalls, setScannedStalls] = useState<number[]>([]);

  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:4000/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("ME DATA:", res.data);

      setPoints(res.data?.points || 0);
      setScannedStalls(
        Array.isArray(res.data?.scannedStalls)
          ? res.data.scannedStalls.map(Number)
          : []
      );
    } catch (err) {
      console.error("Failed to fetch user", err);
    }
  };

  const scanStall = async (stallId: number) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/scan",
        { stallId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
      await fetchUser();
    } catch (err: any) {
      console.error("Scan failed:", err);
      alert(err.response?.data?.message || "Scan failed");
    }
  };

  useEffect(() => {
    const run = async () => {
      await fetchUser();

      const params = new URLSearchParams(window.location.search);
      const stallId = params.get("stallId");
      const cameFromScan = location.state && (location.state as any).fromScan;

      if (stallId && cameFromScan) {
        await scanStall(Number(stallId));

        const url = new URL(window.location.href);
        url.searchParams.delete("stallId");
        window.history.replaceState({}, "", url.toString());
      }
    };

    run();
  }, [location.state]);

  const rewardsAvailable = Math.floor(points / 40);

  const stampPositions = [
    { id: 1, top: "43%", left: "16%", rotate: -9 },
    { id: 2, top: "43%", left: "33%", rotate: 0 },
    { id: 3, top: "42%", left: "50%", rotate: 9 },
    { id: 4, top: "43%", left: "68%", rotate: -2 },
    { id: 5, top: "42%", left: "85%", rotate: -9 },
    { id: 6, top: "70%", left: "16%", rotate: 9 },
    { id: 7, top: "70%", left: "33%", rotate: 1 },
    { id: 8, top: "69%", left: "50%", rotate: 2 },
    { id: 9, top: "70%", left: "67%", rotate: -3 },
    { id: 10, top: "70%", left: "84.5%", rotate: 2 },
  ];

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        width: "100vw",
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
          maxWidth: "100%",
          overflow: "hidden",
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

        {stampPositions
          .filter((stamp) => scannedStalls.includes(stamp.id))
          .map((stamp) => (
            <img
              key={stamp.id}
              src={singleStamp}
              alt={`Stamp ${stamp.id}`}
              style={{
                position: "absolute",
                top: stamp.top,
                left: stamp.left,
                width: "17%",
                height: "auto",
                transform: `translate(-50%, -50%) rotate(${stamp.rotate}deg)`,
                transformOrigin: "center",
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

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
          paddingBottom: 20,
        }}
      >
        <img
          src={claimButton}
          alt="Claim Reward"
          onClick={
            rewardsAvailable >= 1
              ? () => console.log("Claim reward")
              : undefined
          }
          style={{
            width: "clamp(120px, 40vw, 500px)",
            height: "auto",
            display: "block",
            cursor: rewardsAvailable >= 1 ? "pointer" : "not-allowed",
            opacity: rewardsAvailable >= 1 ? 1 : 0.5,
          }}
        />
      </div>
    </div>
  );
}