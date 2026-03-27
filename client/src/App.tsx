import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "./api/axios";

import LandingPage from "./components/Landing/LandingPage";
import Home from "./components/Home/Home";
import ActivityCard from "./components/ActivityCard/ActivityCard";
import Sponsors from "./components/Sponsors/Sponsors";
import Info from "./components/Info/Info";
import Menu from "./components/Menu/Menu";
import Merch from "./components/Merch/Merch";
import ProtectedRoute from "./components/ProtectedRoute";
import ScanRedirect from "./components/Scan/ScanRedirect";

// --- Inline TestScanPage (seamless version) ---
function TestScanPage() {
    const { stallId } = useParams<{ stallId: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!stallId) return;

        const simulateScan = async () => {
            try {
                await api.post("/scan", { stallId: Number(stallId) });
            } catch {
                // ignore any errors
            } finally {
                navigate("/activity"); // redirect back to activity page
            }
        };

        simulateScan();
    }, [stallId, navigate]);

    // Render nothing to make it seamless
    return null;
}

// --- App Component ---
function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* LANDING PAGE */}
                <Route path="/" element={<LandingPage />} />

                {/* PROTECTED PAGES */}
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/activity"
                    element={
                        <ProtectedRoute>
                            <ActivityCard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/info"
                    element={
                        <ProtectedRoute>
                            <Info />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/sponsors"
                    element={
                        <ProtectedRoute>
                            <Sponsors />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/menu"
                    element={
                        <ProtectedRoute>
                            <Menu />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/merch"
                    element={
                        <ProtectedRoute>
                            <Merch />
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

                {/* NEW: Test scan route */}
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