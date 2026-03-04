import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import ActivityCard from "./components/ActivityCard/ActivityCard";
import Schedule from "./components/Schedule/Schedule";
import Map from "./components/Map/Map";
import Menu from "./components/Menu/Menu";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/activity" element={<ProtectedRoute><ActivityCard /></ProtectedRoute>} />
                <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
                <Route path="/map" element={<ProtectedRoute><Map /></ProtectedRoute>} />
                <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />

                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;