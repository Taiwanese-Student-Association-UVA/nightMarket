import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BackButton from "../BackButton";
import api from "../../api/axios";

export default function ActivityCard() {
    const [points, setPoints] = useState(0);
    const location = useLocation();

    const fetchUser = async () => {
        try {
            const res = await api.get("/me");
            setPoints(res.data.points);
        } catch (err) {
            console.error("Failed to fetch user");
        }
    };

    const scanStall = async (stallId: number) => {
        try {
            const res = await api.post("/scan", { stallId });
            alert(res.data.message);
            fetchUser();
        } catch (err: any) {
            alert(err.response?.data?.message || "Scan failed");
        }
    };

    const redeemReward = async () => {
        try {
            const res = await api.post("/redeem");
            alert(res.data.message);
            fetchUser();
        } catch (err: any) {
            alert(err.response?.data?.message || "Redemption failed");
        }
    };

    // Handle NFC redirect securely
    useEffect(() => {
        fetchUser();

        const params = new URLSearchParams(window.location.search);
        const stallId = params.get("stallId");

        const cameFromScan = location.state?.fromScan;

        if (stallId && cameFromScan) {
            // remove stallId so it doesn't trigger twice
            const url = new URL(window.location.href);
            url.searchParams.delete("stallId");
            window.history.replaceState({}, "", url.toString());

            scanStall(Number(stallId));
        }
    }, []);

    const rewardsAvailable = Math.floor(points / 40);

    return (
        <div style={{ padding: 20 }}>
            <BackButton />
            <h1>Activity Card</h1>

            <div style={{ padding: 20 }}>
                <p>Points: {points}</p>
                <p>Rewards available: {rewardsAvailable}</p>

                <h2>Redeem Reward</h2>
                <button onClick={redeemReward} disabled={rewardsAvailable < 1}>
                    Redeem Reward (costs 40 points)
                </button>

                <h2>Scan Stall</h2>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(id => (
                    <button key={id} onClick={() => scanStall(id)}>
                        Stall {id}
                    </button>
                ))}
            </div>
        </div>
    );
}