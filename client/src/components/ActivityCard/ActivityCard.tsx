import { useEffect, useState } from "react";
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

  const fetchUser = async () => {
    try {
      const res = await api.get("/me");

      const pts = res.data?.points || 0;
      const stalls = Array.isArray(res.data?.scannedStalls)
        ? res.data.scannedStalls.map(Number)
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

  const rewardsAvailable = Math.floor(points / POINTS_PER_REWARD);

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

  const handleClaimClick = async () => {
    if (rewardsAvailable < 1 || isClaiming) return;

    setIsClaiming(true);
    try {
      await api.post("/redeem");
      await fetchUser();
      setShowPopup(true);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      alert(msg || "Failed to claim reward");
    } finally {
      setIsClaiming(false);
    }
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
            width: "20%",        // bigger hitbox
            height: "20%",       // bigger hitbox
            zIndex: 20,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            //outline: 'black 1px solid'
          }}
        >
          <img
            src={infoButton}
            alt="info"
            draggable={false}
            style={{
              width: "15%",     // keeps image small inside bigger box
              height: "auto",
              pointerEvents: "none", // ensures click goes to parent
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
          onClick={rewardsAvailable > 0 && !isClaiming ? handleClaimClick : undefined}
          style={{
            width: "50%",
            height: "auto",
            display: "absolute",
            cursor: rewardsAvailable > 0 && !isClaiming ? "pointer" : "not-allowed",
            opacity: rewardsAvailable > 0 ? 1 : 0.5,
          }}
        />
      </div>


      {/* claim POPUP */}
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
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
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "16px",
              width: "80%",
              maxWidth: "320px",
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Reward Ready!</h2>
            <p>
              You have {rewardsAvailable} redeemable reward
              {rewardsAvailable !== 1 ? "s" : ""}.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              style={{
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
          </div>
        </div>
      )}


      {/* INFO POPUP */}
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
              position: 'relative',
              backgroundColor: "rgba(248, 244, 227, 0.9)",
              padding: "24px",
              borderRadius: "16px",
              width: "80%",
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ marginTop: '1%', marginBottom: '2%', color: 'rgb(48, 26, 3)' }}>Instructions</h2>
            <p style={{ color: 'rgb(48, 26, 3)'}}>
                Visit stalls and play games to earn stamps!
                Collect 5 stamps to receive 1 reward, or collect all 10 stamps to earn 2 rewards.
                Once you have enough stamps, head to the prize booth to claim your reward.
            </p>
            <p  style={{marginTop: '6%', marginBottom: "7%"}}>
                              Not sure where to go? Use the Map on the home page to find your way.
            </p>
            <button
              onClick={() => setInfoPopup(false)}
              style={{
                position: "absolute",
                left: "2%",
                top: "2%",
                background: 'none',
                color: 'rgb(48, 26, 3)',
                marginTop: "12px",
                padding: "10px 18px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "13px",
                //outline: '2px solid red'
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