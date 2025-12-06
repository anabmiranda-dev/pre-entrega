import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { ProductsFilterContext } from "../context/ProductsFilterContext";
import iconUser from "../src/assets/icon-user.png";

import "../src/App.css";

function Login() {

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={`home home-container fade-in ${visible ? "visible" : ""}`}>
        <form onSubmit={handleSubmit} className="login-form">
          <img
            src={iconUser}
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
      </div>
    </>
  );
}

export default Login;
