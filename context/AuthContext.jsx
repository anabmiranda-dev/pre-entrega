// context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);   // username
  const [role, setRole] = useState(null);   // admin | user

  // ▶ Cargar estado desde localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");
    const savedRole = localStorage.getItem("authRole");

    if (savedUser && savedRole) {
      setUser(savedUser);
      setRole(savedRole);
    }
  }, []);

  // ▶ Login
  const login = (username) => {
    const assignedRole = username === "admin" ? "admin" : "user";
    const token = `fake-token-${username}`;

    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", username);
    localStorage.setItem("authRole", assignedRole);

    setUser(username);
    setRole(assignedRole);
  };

  // ▶ Logout
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    localStorage.removeItem("authRole");
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
