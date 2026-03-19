import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LoginModal from "./components/Modal/LoginModal";
import Home from "./components/Home/Home";
import ActivityCard from "./components/ActivityCard/ActivityCard";
import Schedule from "./components/Schedule/Schedule";
import Map from "./components/Map/Map";
import Menu from "./components/Menu/Menu";
import ProtectedRoute from "./components/ProtectedRoute";
import ScanRedirect from "./components/Scan/ScanRedirect";

function App() {
    const [loginOpen, setLoginOpen] = useState(false);

    return (
        <BrowserRouter>
            <>
                <Routes>
                    <Route
                        path="/"
                        element={<Home openLogin={() => setLoginOpen(true)} />}
                    />
                    <Route
                        path="/activity"
                        element={
                            <ProtectedRoute openLogin={() => setLoginOpen(true)}>
                                <ActivityCard />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/map" element={<Map />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/scan/:stallId" element={<ScanRedirect />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>

                <LoginModal
                    isOpen={loginOpen}
                    onClose={() => setLoginOpen(false)}
                />
            </>
        </BrowserRouter>
    );
}

export default App;