import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Event Name</h1>
                <button onClick={logout}>Logout</button>
            </div>

            <nav style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                <button onClick={() => navigate("/map")}>Map</button>
                <button onClick={() => navigate("/schedule")}>Schedule</button>
                <button onClick={() => navigate("/activity")}>Activity Card</button>
                <button onClick={() => navigate("/menu")}>Menu</button>
            </nav>
        </div>
    );
}