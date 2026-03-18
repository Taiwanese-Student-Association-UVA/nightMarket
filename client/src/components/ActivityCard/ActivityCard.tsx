// TODO:
// - create the stamp card, every time an nfc tag is scanned it should add a stamp onto the card.
//   - just create two images? one for the activity card and one for the stamp icon?
//   - one should be an area to track games played, maybe have a thing saying every x stamps earns a reward?
//   - should i ask pr to draw the images or just AI them
// - move the scanning / rewards logic to the nfc tags. After finishing frontend?

import { useEffect, useState } from "react";
import BackButton from "../BackButton";
import api from "../../api/axios";

export default function ActivityCard() {
    const [points, setPoints] = useState(0);

    const fetchUser = async () => {
        const res = await api.get("/me");
        setPoints(res.data.points);
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

    // Handle NFC redirect e.g. yoursite.com/activity?stallId=3
    useEffect(() => {
        fetchUser();
        const params = new URLSearchParams(window.location.search);
        const stallId = params.get("stallId");
        if (stallId) scanStall(Number(stallId));
    }, []);

    const rewardsAvailable = Math.floor(points / 40);

    return (
    <div style={{padding: 20}}>
        <BackButton/>
        <h1>Activity Card</h1>
        <div style={{padding: 20}}>
            <h1>Activity Card</h1>
            <p>Points: {points}</p>
            <p>Rewards available: {rewardsAvailable}</p>

                <h2>Redeem Reward</h2>
                <button onClick={redeemReward} disabled={rewardsAvailable < 1}>
                    Redeem Reward (costs 40 points)
                </button>

                <h2>Scan Stall</h2>
                {[1,2,3,4,5,6,7,8].map(id => (
                    <button key={id} onClick={() => scanStall(id)}>
                        Stall {id}
                    </button>
                ))}
        </div>
    </div>
    );
}