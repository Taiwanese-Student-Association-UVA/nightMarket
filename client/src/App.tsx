import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useParams,
    useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import api from "./api/axios";

import LandingPage from "./components/Landing/LandingPage";
import Home from "./components/Home/Home";
import ActivityCard from "./components/ActivityCard/ActivityCard";
import Sponsors from "./components/Sponsors/Sponsors";
import Info from "./components/Info/Info";
import Menu from "./components/Stands/Stands";
import Schedule from "./components/Schedule/Schedule";
import ProtectedRoute from "./components/ProtectedRoute";
import ScanRedirect from "./components/Scan/ScanRedirect";

// --- Inline TestScanPage (NFC test simulator) ---
function TestScanPage() {
    const { stallId } = useParams<{ stallId: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!stallId) {
            navigate("/activity");
            return;
        }

        const simulateScan = async () => {
            try {
                await api.post("/scan", { stallId: Number(stallId) });
            } catch {
                // ignore all errors
            } finally {
                navigate("/activity");
            }
        };

        simulateScan();
    }, [stallId, navigate]);

    return null; // seamless, no visible page
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* LANDING PAGE */}
                <Route path="/" element={<LandingPage />} />

                {/* PUBLIC PAGES */}
                <Route path="/home" element={<Home />} />
                <Route path="/info" element={<Info />} />
                <Route path="/sponsors" element={<Sponsors />} />
                <Route path="/stands" element={<Menu />} />
                <Route path="/schedule" element={<Schedule />} />

                {/* PROTECTED PAGES */}
                <Route
                    path="/activity"
                    element={
                        <ProtectedRoute>
                            <ActivityCard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/scan/:stallId"
                    element={
                        <ProtectedRoute>
                            <ScanRedirect />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/activity/:stallId"
                    element={
                        <ProtectedRoute>
                            <TestScanPage />
                        </ProtectedRoute>
                    }
                />

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;