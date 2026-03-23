import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import background from "../../assets/BG.png";

export default function ScanRedirect() {
  const { stallId } = useParams<{ stallId: string }>();
  const navigate = useNavigate();
  const ranRef = useRef(false);

  useEffect(() => {
    const run = async () => {
      if (!stallId || ranRef.current) return;
      ranRef.current = true;

      if (!localStorage.getItem("token")) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        await api.post("/scan", { stallId: Number(stallId) });
      } catch (err: any) {
        console.error("Scan failed:", err);
      }

      navigate("/activity", { replace: true });
    };

    run();
  }, [stallId, navigate]);

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}