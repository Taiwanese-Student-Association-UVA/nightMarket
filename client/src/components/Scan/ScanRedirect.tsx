import { Navigate, useParams } from "react-router-dom";

export default function ScanRedirect() {
    const { stallId } = useParams();

    if (!stallId) return <Navigate to="/login" replace />;

    return (
        <Navigate
            to={`/activity?stallId=${stallId}`}
            state={{ fromScan: true }}
            replace
        />
    );
}