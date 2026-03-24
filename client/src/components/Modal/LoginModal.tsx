import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./modal.css";

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
      navigate("/home");
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
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <button
              className="modal-close"
              onClick={onClose}
              aria-label="Close"
          >
            ×
          </button>

          <h2 className="modal-title">Welcome</h2>
          <p className="modal-subtitle">
            Log in or create an account to collect stamps and rewards.
          </p>

          <div className="login-form">
            <input
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
            />

            {error && <p className="form-error">{error}</p>}

            <button
                className="primary-btn"
                onClick={() => submit(false)}
                disabled={loading}
            >
              {loading ? "Please wait..." : "Login"}
            </button>

            <button
                className="secondary-btn"
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