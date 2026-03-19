import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const submit = async (register: boolean) => {
    try {
      setLoading(true);
      setError("");

      const url = register ? "/register" : "/login";
      const res = await api.post(url, { username, password });

      localStorage.setItem("token", res.data.token);

      onClose();
      navigate("/activity");
    } catch (err: any) {
      const msg = err.response?.data?.message || "";

      if (
        msg.includes("duplicate key") ||
        msg.includes("users_username_key")
      ) {
        setError("That username is already taken.");
      } else {
        setError(msg || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeStyle} onClick={onClose} aria-label="Close">
          ×
        </button>

        <h2 style={titleStyle}>Welcome</h2>
        <p style={subtitleStyle}>
          Log in or create an account to collect stamps and rewards.
        </p>

        <div style={formStyle}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            style={inputStyle}
          />

          {error && <p style={errorStyle}>{error}</p>}

          <button
            style={{ ...primaryButtonStyle, opacity: loading ? 0.7 : 1 }}
            onClick={() => submit(false)}
            disabled={loading}
          >
            {loading ? "Please wait..." : "Login"}
          </button>

          <button
            style={{ ...secondaryButtonStyle, opacity: loading ? 0.7 : 1 }}
            onClick={() => submit(true)}
            disabled={loading}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.45)",
  backdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  padding: "20px",
};

const modalStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "360px",
  background: "#fff7f7",
  border: "3px solid black",
  borderRadius: "22px",
  padding: "28px 22px 22px",
  boxShadow: "0 18px 50px rgba(0,0,0,0.25)",
  position: "relative",
  opacity: 0.95,
};

const closeStyle: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "14px",
  border: "none",
  background: "transparent",
  fontSize: "28px",
  lineHeight: 1,
  cursor: "pointer",
  color: "#222",
};

const titleStyle: React.CSSProperties = {
  margin: "0 0 8px 0",
  fontSize: "28px",
  fontWeight: 700,
  textAlign: "center",
  color: "#444",
};

const subtitleStyle: React.CSSProperties = {
  margin: "0 0 20px 0",
  fontSize: "14px",
  textAlign: "center",
  color: "#444",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  color: "black",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "2px solid black",
  fontSize: "16px",
  outline: "none",
  background: "white",
  boxSizing: "border-box",
  color: "black",
  WebkitTextFillColor: "black",
};

const primaryButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "2px solid black",
  background: "#ffd6d6",
  fontSize: "16px",
  fontWeight: 700,
  cursor: "pointer",
};

const secondaryButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "2px solid black",
  background: "#eebfbf",
  fontSize: "16px",
  fontWeight: 700,
  cursor: "pointer",
};

const errorStyle: React.CSSProperties = {
  margin: 0,
  color: "#c62828",
  fontSize: "14px",
  textAlign: "center",
  background: "#ffe5e5",
  padding: "8px 10px",
  borderRadius: "8px",
  border: "1px solid #c62828",
};