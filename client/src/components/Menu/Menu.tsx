// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import api from "../../api/axios";

// import stampCard from "../../assets/StampCard.svg";
// import singleStamp from "../../assets/singleStamp.svg";
// import backStamp from "../../assets/back-button.png";
// import claimButton from "../../assets/claim-button.svg";
// import background from "../../assets/BG.png";
// import lantern from "../../assets/lantern.png";

// export default function Menu() {
//   const [points, setPoints] = useState(0);
//   const [scannedStalls, setScannedStalls] = useState<number[]>([]);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const fetchUser = async () => {
//     try {
//       const res = await api.get("/me");
//       setPoints(res.data.points || 0);
//       setScannedStalls(res.data.scannedStalls || []);
//     } catch (err) {
//       console.error("Failed to fetch user");
//     }
//   };

//   const scanStall = async (stallId: number) => {
//     try {
//       const res = await api.post("/scan", { stallId });
//       alert(res.data.message);
//       fetchUser();
//     } catch (err: any) {
//       alert(err.response?.data?.message || "Scan failed");
//     }
//   };

//   const redeemReward = async () => {
//     try {
//       const res = await api.post("/redeem");
//       alert(res.data.message);
//       fetchUser();
//     } catch (err: any) {
//       alert(err.response?.data?.message || "Redemption failed");
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   useEffect(() => {
//     fetchUser();

//     const params = new URLSearchParams(window.location.search);
//     const stallId = params.get("stallId");
//     const cameFromScan = location.state?.fromScan;

//     if (stallId && cameFromScan) {
//       const url = new URL(window.location.href);
//       url.searchParams.delete("stallId");
//       window.history.replaceState({}, "", url.toString());

//       scanStall(Number(stallId));
//     }
//   }, []);

//   const rewardsAvailable = Math.floor(points / 40);

//   const stampPositions = [
//     { id: 1, top: "43%", left: "16%", rotate: -9 },
//     { id: 2, top: "43%", left: "33%", rotate: 0 },
//     { id: 3, top: "42%", left: "50%", rotate: 9 },
//     { id: 4, top: "43%", left: "68%", rotate: -2 },
//     { id: 5, top: "42%", left: "85%", rotate: -9 },

//     { id: 6, top: "70%", left: "16%", rotate: 9 },
//     { id: 7, top: "70%", left: "33%", rotate: 1 },
//     { id: 8, top: "69%", left: "50%", rotate: 2 },
//     { id: 9, top: "70%", left: "67%", rotate: -3 },
//     { id: 10, top: "70%", left: "84.5%", rotate: 2 },
//   ];

//   return (
//     <div
//       style={{
//         margin: 0,
//         padding: 0,
//         width: "100vw",
//         minHeight: "100vh",
//         overflowX: "hidden",
//         backgroundImage: `url(${background})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <img
//         src={lantern}
//         alt="Lantern"
//         style={{
//           width: "100%",
//           height: "auto",
//           display: "block",
//         }}
//       />

//       <div
//         style={{
//           position: "relative",
//           width: "100%",
//           maxWidth: "100%",
//           overflow: "hidden",
//         }}
//       >
//         <img
//           src={stampCard}
//           alt="Stamp Card"
//           style={{
//             width: "100%",
//             height: "auto",
//             display: "block",
//           }}
//         />

//         {stampPositions
//           .filter((stamp) => scannedStalls.includes(stamp.id))
//           .map((stamp) => (
//             <img
//               key={stamp.id}
//               src={singleStamp}
//               alt={`Stamp ${stamp.id}`}
//               style={{
//                 position: "absolute",
//                 top: stamp.top,
//                 left: stamp.left,
//                 width: "17%",
//                 height: "auto",
//                 transform: `translate(-50%, -50%) rotate(${stamp.rotate}deg)`,
//                 transformOrigin: "center",
//                 zIndex: 10,
//                 pointerEvents: "none",
//               }}
//             />
//           ))}

//         <img
//           src={backStamp}
//           alt="Back"
//           onClick={() => navigate(-1)}
//           draggable={false}
//           style={{
//             position: "absolute",
//             top: "15%",
//             right: "10%",
//             width: "12%",
//             height: "auto",
//             zIndex: 20,
//             cursor: "pointer",
//           }}
//         />
//       </div>

//       <div
//         style={{
//           width: "100%",
//           display: "flex",
//           justifyContent: "center",
//           marginTop: 10,
//           paddingBottom: 20,
//         }}
//       >
//         <img
//           src={claimButton}
//           alt="Claim Reward"
//           onClick={rewardsAvailable >= 1 ? redeemReward : undefined}
//           style={{
//             width: "clamp(120px, 40vw, 500px)",
//             height: "auto",
//             display: "block",
//             cursor: rewardsAvailable >= 1 ? "pointer" : "not-allowed",
//             opacity: rewardsAvailable >= 1 ? 1 : 0.5,
//           }}
//         />
//       </div>

//       <div style={{ padding: 20, textAlign: "center" }}>
//         <p>Points: {points}</p>
//         <p>Rewards available: {rewardsAvailable}</p>
//         <button onClick={logout}>Logout</button>
//       </div>
//     </div>
//   );
// }
import BackButton from "../BackButton";

export default function Menu() {
    return (
        <div style={{ padding: 20 }}>
            <BackButton />
            <h1>Menu</h1>
        </div>
    );
}