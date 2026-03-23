import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginModalPage from "./components/Modal/LoginModalPage";
import Home from "./components/Home/Home";
import ActivityCard from "./components/ActivityCard/ActivityCard";
import Schedule from "./components/Schedule/Schedule";
import Map from "./components/Map/Map";
import Menu from "./components/Menu/Menu";
import ProtectedRoute from "./components/ProtectedRoute";
import ScanRedirect from "./components/Scan/ScanRedirect";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* LOGIN PAGE */}
                <Route path="/" element={<LoginModalPage />} />

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
                    path="/schedule"
                    element={
                        <ProtectedRoute>
                            <Schedule />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/map"
                    element={
                        <ProtectedRoute>
                            <Map />
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
                    path="/scan/:stallId"
                    element={
                        <ProtectedRoute>
                            <ScanRedirect />
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