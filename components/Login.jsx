import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { ProductsFilterContext } from "../context/ProductsFilterContext";

import "../src/App.css";

function Login() {

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuthContext();
  const { resetFilters } = useContext(ProductsFilterContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    await login();
    resetFilters();   // 🔥 Se ejecuta SIN romper
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 👇 Simulación de BD
    if (usuario === "admin" && password === "1234") {
      login(usuario, "admin");
      return navigate("/dashboard");
    }

    if (usuario === "user" && password === "1234") {
      login(usuario, "user");
      return navigate("/");
    }

    alert("Credenciales inválidas");
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <img
        src="/src/assets/icon-user.png"
        alt="icon-user"
        className="icon-user-login"
      />
      <div>
        <input
          placeholder="Username"
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
      </div>

      <div>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="login-button">Login</button>
    </form>
  );
}

export default Login;
