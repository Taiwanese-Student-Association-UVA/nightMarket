// src/pages/ScanRedirect.tsx
import { Navigate, useParams } from "react-router-dom";

export default function ScanRedirect() {
  const { stallId } = useParams();

  return <Navigate to={`/activity?stallId=${stallId}`} replace />;
}