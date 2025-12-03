
import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function Dashboard() {
    const { role } = useAuthContext();

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>

            {role === "admin" ? (
                <>
                    <p>Panel de administración</p>
                    <Link to="/admin/products">
                        <button className="btn-admin">
                            Administrar productos
                        </button>
                    </Link>
                </>
            ) : (
                <p>No tienes permisos de administrador.</p>
            )}
        </div>
    );
}

export default Dashboard;