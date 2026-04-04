import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import api from "../../api/axios";
import "./modal.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type View = "login" | "register";

export default function LoginModal({ isOpen, onClose }: Props) {
  const [view, setView] = useState<View>("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  if (!isOpen) return null;

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setConfirm("");
    setError("");
    setLoading(false);
  };

  const switchView = (newView: View) => {
    resetForm();
    setView(newView);
  };

  const submit = async () => {
    if (view === "register" && password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const url = view === "register" ? "/register" : "/login";

      const res = await api.post(url, {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);

      onClose();
      navigate("/activity");
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const msg = axiosError.response?.data?.message || "";

      if (
          msg.includes("duplicate key") ||
          msg.includes("users_username_key")
      ) {
        setError("That username is already taken.");
      } else if (msg.includes("invalid credentials")) {
        setError("Invalid username or password.");
      } else {
        setError(msg || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="modal-overlay" onClick={onClose}>
        <div
            className="modal-box"
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                e.stopPropagation()
            }
        >
          <button
              className="modal-close"
              onClick={onClose}
              aria-label="Close"
          >
            ×
          </button>

          <h2 className="modal-title">
            {view === "login" ? "Welcome" : "Create Account"}
          </h2>

          <p className="modal-subtitle">
            {view === "login"
                ? "Log in to collect stamps and rewards."
                : "Register to start collecting stamps and rewards."}
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

            {view === "register" && (
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirm}
                    onChange={(e) => {
                      setConfirm(e.target.value);
                      setError("");
                    }}
                />
            )}

            {error && <p className="form-error">{error}</p>}

            <button
                className="primary-btn"
                onClick={submit}
                disabled={loading}
            >
              {loading
                  ? "Please wait..."
                  : view === "login"
                      ? "Login"
                      : "Register"}
            </button>

            {view === "login" ? (
                <button
                    className="secondary-btn"
                    onClick={() => switchView("register")}
                >
                  Create Account
                </button>
            ) : (
                <button
                    className="secondary-btn"
                    onClick={() => switchView("login")}
                >
                  Back to Login
                </button>
            )}
          </div>
        </div>
      </div>
  );
}