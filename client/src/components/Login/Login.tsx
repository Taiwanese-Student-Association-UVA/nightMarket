import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axois";

export default function AuthPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submit = async (register: boolean) => {
        try {
            const url = register ? "/register" : "/login";
            const res = await api.post(url, { username, password });
            localStorage.setItem("token", res.data.token);
            navigate("/");
        } catch (err: any) {
            alert(err.response?.data?.message || "Error");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Login / Register</h1>

            <input
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <div>
                <button onClick={() => submit(true)}>Register</button>
                <button onClick={() => submit(false)}>Login</button>
            </div>
        </div>
    );
}
