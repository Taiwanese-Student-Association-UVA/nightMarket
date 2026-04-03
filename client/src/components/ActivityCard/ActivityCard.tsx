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
import text from '../../assets/activity/LUCKY PUNCH TEXT.png'
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

      const stalls: number[] = Array.isArray(res.data?.scannedStalls)
        ? [...new Set((res.data.scannedStalls as number[]).map(Number))]
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

  const totalRewardsUnlocked =
    uniqueStallCount >= 10 ? 2 : uniqueStallCount >= 5 ? 1 : 0;

  const claimRewardCount =
    points >= POINTS_PER_REWARD * 2
      ? 2
      : points >= POINTS_PER_REWARD
      ? 1
      : 0;

  const canClaim = claimRewardCount > 0 && totalRewardsUnlocked > 0;

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


        <img
          src={text}
          alt="instructions"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            paddingTop: '0%',
            paddingBottom: '7%'
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
          onClick={() => navigate("/home")}
          draggable={false}
          style={{
            position: "absolute",
            top: "-5%",
            left: "6.5%",
            width: "18%",
            height: "auto",
            zIndex: 20,
            cursor: "pointer",
          }}
        />

        <div
          onClick={() => setInfoPopup(true)}
          style={{
            position: "absolute",
            top: "9.25%",
            right: "22.5%",
            width: "20%",
            height: "20%",
            zIndex: 20,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={infoButton}
            alt="info"
            draggable={false}
            style={{
              width: "15%",
              height: "auto",
              pointerEvents: "none",
            }}
          />
        </div>
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
          onClick={canClaim && !isClaiming ? handleClaimClick : undefined}
          style={{
            width: "50%",
            height: "auto",
            display: "block",
            cursor: canClaim && !isClaiming ? "pointer" : "not-allowed",
            opacity: canClaim ? 1 : 0.5,
          }}
        />
      </div>

      {showPopup && (
        <div
          onClick={closePopup}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "rgba(248, 244, 227, 0.9)",
              padding: "24px",
              borderRadius: "16px",
              width: "80%",
              maxWidth: "320px",
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
          >
            {rewardStage === "ready" && (
              <>
                <h2 style={{ marginTop: '2%', marginBottom: '3%' }}>Reward Ready!</h2>
                <p>
                  {uniqueStallCount >= 10
                    ? "You have unlocked 2 rewards. Head to the prize booth whenever you’re ready to claim."
                    : "You have unlocked 1 reward. Head to the prize booth whenever you’re ready to claim."}
                </p>
                <button
                  onClick={closePopup}
                  style={{
                    background: "none",
                    fontWeight: "bold",
                    marginTop: "12px",
                    padding: "10px 18px",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  Close
                </button>
              </>
            )}

            {rewardStage === "goToBooth" && (
              <>
                <h2 style={{ marginTop: '2%', marginBottom: '5%' }}>Claim Your Reward</h2>
                <p>
                  Go to the prize booth to claim{" "} 
                  {claimRewardCount === 2 ? "your 2 rewards" : "your reward"}.
                  Show this screen to the attendant and click the button to receive a reward.
                </p>
                <button
                  onClick={handleFinalClaim}
                  disabled={isClaiming}
                  style={{
                    background: "none",
                    marginTop: "12px",
                    padding: "10px 18px",
                    border: "none",
                    borderRadius: "10px",
                    cursor: isClaiming ? "not-allowed" : "pointer",
                    fontSize: "16px",
                    opacity: isClaiming ? 0.6 : 1,
                  }}
                >
                  <strong>
                  {isClaiming ? "Claiming..." : "I'm Here"}
                  </strong>
                </button>
              </>
            )}

            {rewardStage === "claimed" && (
              <>
                <h2 style={{ marginTop: '2%', marginBottom: '5%' }}>
                  {claimedAmount === 2
                    ? "2 Rewards Claimed"
                    : "1 Reward Claimed"}
                </h2>
                <p>
                  {claimedAmount === 2
                    ? "Claiming 2 Rewards!"
                    : "Claiming Reward!"}
                </p>
                <button
                  onClick={closePopup}
                  style={{
                    background: "none",
                    fontWeight: "bold",
                    marginTop: "12px",
                    padding: "10px 18px",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  Close
                </button>
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
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              backgroundColor: "rgba(248, 244, 227, 0.9)",
              padding: "24px",
              borderRadius: "16px",
              width: "80%",
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ marginTop: "1%", marginBottom: '5%' }}>Instructions</h2>
            <p style={{marginBottom: '5%'}}>
              Visit stalls and play games to earn stamps. Collect 5 stamps to
              unlock 1 reward, or collect all 10 stamps to unlock 2 rewards.
            </p>
            <button
              onClick={() => setInfoPopup(false)}
              style={{
                position: "absolute",
                right: "-1%",
                top: "-3%",
                background: "none",
                cursor: "pointer",
              }}
            >
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
}