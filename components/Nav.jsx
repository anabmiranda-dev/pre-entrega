import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

import { UserRound, ShoppingCart } from "lucide-react";
import "../src/App.css";
import iconMetalRelics from "../src/assets/icon-metal-relics.png";

function Nav() {
    const { user, role, logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const linkClass = ({ isActive }) =>
        isActive ? "nav-link active-link" : "nav-link";

    return (
        <nav className="nav navbar navbar-light">
            {/* Logo */}
            <NavLink to="/" className="navbar-brand">
                <img src={iconMetalRelics} width="40" alt="metal-relics-icon" />
            </NavLink>

            {/* Links */}
            <ul className="nav-list">
                <li>
                    <NavLink to="/" className={linkClass}>Home</NavLink>
                </li>

                <li>
                    <NavLink to="/products" className={linkClass}>Products</NavLink>
                </li>

                {role === "admin" && (
                    <li>
                        <NavLink to="/admin/users" className={linkClass}>Users</NavLink>
                    </li>
                )}

                <li>
                    <NavLink to="/contact" className={linkClass}>Contact</NavLink>
                </li>

                <li>
                    <NavLink to="/about" className={linkClass}>About</NavLink>
                </li>

                <li>
                    <NavLink to="/cart" className={linkClass}><ShoppingCart size={24} /></NavLink>
                </li>
            </ul>

            {/* Estado de login */}
            <div className="nav-user-box">
                {user ? (
                    <>
                        <span className="nav-user">
                            <UserRound /> {user} ({role})
                        </span>

                        <button className="btn-logout" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <NavLink to="/login" className={linkClass}>
                        Login
                    </NavLink>
                )}
            </div>
        </nav>
    );
}

export default Nav;
