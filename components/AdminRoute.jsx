// components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { user, role } = useAuthContext();

  if (!user || role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AdminRoute;
