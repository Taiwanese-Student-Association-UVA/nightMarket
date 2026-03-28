import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import stampCard from "../../assets/activity/stampCard.png";
import singleStamp from "../../assets/activity/singleStamp.png";
import backStamp from "../../assets/activity/back-button.png";
import claimButton from "../../assets/activity/claim-button.svg";
import infoButton from "../../assets/activity/information-button.png";
import background from "../../assets/BG.png";
import lantern from "../../assets/activity/lantern.png";

export default function ActivityCard() {
  const navigate = useNavigate();

  const POINTS_PER_REWARD = 50;

  const [points, setPoints] = useState(0);
  const [scannedStalls, setScannedStalls] = useState<number[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [infoPopup, setInfoPopup] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimedAmount, setClaimedAmount] = useState<0 | 1 | 2>(0);

  const [rewardStage, setRewardStage] = useState<
    "none" | "ready" | "goToBooth" | "claimed"
  >("none");

  const previousStallCount = useRef(0);

  const fetchUser = async () => {
    try {
      const res = await api.get("/me");

      const pts = Number(res.data?.points || 0);

      const stalls = Array.isArray(res.data?.scannedStalls)
        ? [...new Set(res.data.scannedStalls.map(Number))]
        : [];

      setPoints(pts);
      setScannedStalls(stalls);
    } catch (err) {
      console.error("Failed to fetch user", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // popup at 5 and 10 stalls (unchanged)
  useEffect(() => {
    const count = new Set(scannedStalls).size;
    const prevCount = previousStallCount.current;

    if ((prevCount < 5 && count === 5) || (prevCount < 10 && count === 10)) {
      setRewardStage("ready");
      setShowPopup(true);
    }

    previousStallCount.current = count;
  }, [scannedStalls]);

  const uniqueStallCount = new Set(scannedStalls).size;

  // rewards unlocked from stalls
  const totalRewardsUnlocked =
    uniqueStallCount >= 10 ? 2 : uniqueStallCount >= 5 ? 1 : 0;

  // rewards available from points
  const claimRewardCount =
    points >= POINTS_PER_REWARD * 2
      ? 2
      : points >= POINTS_PER_REWARD
      ? 1
      : 0;

  // 🔴 IMPORTANT: only allow claim if both conditions are met
  const canClaim =
    claimRewardCount > 0 && totalRewardsUnlocked > 0;

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

  const handleClaimClick = () => {
    if (!canClaim || isClaiming) return;

    setRewardStage("goToBooth");
    setShowPopup(true);
  };

  const handleFinalClaim = async () => {
    if (isClaiming || !canClaim) return;

    setIsClaiming(true);

    const amountToClaim: 1 | 2 = claimRewardCount >= 2 ? 2 : 1;
    setClaimedAmount(amountToClaim);

    try {
      // 🔥 FIX: actually redeem BOTH rewards if needed
      for (let i = 0; i < amountToClaim; i++) {
        await api.post("/redeem");
      }

      await fetchUser();

      setRewardStage("claimed");
      setShowPopup(true);
    } catch (err: unknown) {
      setClaimedAmount(0);

      const msg = (err as {
        response?: { data?: { message?: string } };
      })?.response?.data?.message;

      alert(msg || "Failed to claim reward");
    } finally {
      setIsClaiming(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setRewardStage("none");
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        overflowX: "hidden",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
      }}
    >
      <img src={lantern} style={{ width: "100%" }} />

      <div style={{ position: "relative" }}>
        <img src={stampCard} style={{ width: "100%" }} />

        {stampPositions
          .filter((s) => scannedStalls.includes(s.id))
          .map((s) => (
            <img
              key={s.id}
              src={singleStamp}
              style={{
                position: "absolute",
                top: s.top,
                left: s.left,
                width: "17%",
                transform: `translate(-50%, -50%) rotate(${s.rotate}deg)`,
              }}
            />
          ))}

        <img
          src={backStamp}
          onClick={() => navigate("/home")}
          style={{
            position: "absolute",
            top: "-5%",
            left: "6.5%",
            width: "18%",
            cursor: "pointer",
          }}
        />

        <div
          onClick={() => setInfoPopup(true)}
          style={{
            position: "absolute",
            top: "9%",
            right: "22%",
            width: "20%",
            height: "20%",
            cursor: "pointer",
          }}
        >
          <img src={infoButton} style={{ width: "15%" }} />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={claimButton}
          onClick={canClaim && !isClaiming ? handleClaimClick : undefined}
          style={{
            width: "50%",
            cursor: canClaim ? "pointer" : "not-allowed",
            opacity: canClaim ? 1 : 0.5,
          }}
        />
      </div>

      {showPopup && (
        <div
          onClick={closePopup}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#f8f4e3",
              padding: 24,
              borderRadius: 16,
              textAlign: "center",
            }}
          >
            {rewardStage === "ready" && (
              <>
                <h2>Reward Ready!</h2>
                <p>
                  {uniqueStallCount >= 10
                    ? "You have unlocked 2 rewards."
                    : "You have unlocked 1 reward."}
                </p>
                <button onClick={closePopup}>Close</button>
              </>
            )}

            {rewardStage === "goToBooth" && (
              <>
                <h2>Claim Your Reward</h2>
                <p>
                  Claim{" "}
                  {claimRewardCount === 2 ? "2 rewards" : "your reward"}.
                </p>
                <button onClick={handleFinalClaim}>
                  {isClaiming ? "Claiming..." : "I’ve Claimed"}
                </button>
              </>
            )}

            {rewardStage === "claimed" && (
              <>
                <h2>
                  {claimedAmount === 2
                    ? "2 Rewards Claimed!"
                    : "1 Reward Claimed!"}
                </h2>
                <button onClick={closePopup}>Close</button>
              </>
            )}
          </div>
        </div>
      )}

      {infoPopup && (
        <div
          onClick={() => setInfoPopup(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <h2>Instructions</h2>
            <p>
              Collect 5 stamps for 1 reward, or 10 stamps for 2 rewards.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}