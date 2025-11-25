import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import '../src/App.css';

function Login() {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuthContext();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (usuario === "admin" || password === "1234") {
                login(usuario);
                navigate("/");
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login. Please try again.");
        };

        return (
            <form onSubmit={handleSubmit} className="login-form">
                <h2 style={{ color: "#F87C63" }}>Login</h2>
                <label>Username:</label>
                <input
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="login-button">Login</button>
            </form>
        );
    }
};

export default Login;