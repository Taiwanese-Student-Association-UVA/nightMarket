import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./components/Landing/LandingPage";
import Home from "./components/Home/Home";
import ActivityCard from "./components/ActivityCard/ActivityCard";
import Sponsors from "./components/Sponsors/Sponsors";
import Info from "./components/Info/Info";
import Menu from "./components/Menu/Menu";
import Merch from "./components/Merch/Merch";
import ProtectedRoute from "./components/ProtectedRoute";
import ScanRedirect from "./components/Scan/ScanRedirect";

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

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;