import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

import { UserRound, Settings } from "lucide-react";
import '../src/App.css';
import iconMetalRelics from "../src/assets/icon-metal-relics.png";

function Nav() {
    const { user, role, logout } = useAuthContext();
    const [isAdminSettingsOpen, setIsAdminSettingsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">

                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="#"
                                >
                                    Home
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Features
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Pricing
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link disabled" aria-disabled="true">
                                    Disabled
                                </a>
                            </li>

                        </ul>
                    </div>

                </div>
            </nav>
            <nav className="nav navbar navbar-light">
                <a className="navbar-brand" href="#">
                    <img src={iconMetalRelics} width="40" alt="metal-relics-icon" />
                </a>

                <ul className="nav-list">

                    <li><Link to="/">Home</Link></li>

                    {role !== "admin" && (
                        <>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                        </>

                    )}

                    {role === "admin" && (
                        <>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/admin/users">Users</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                        </>
                    )}
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
                        <Link to="/login" className="login-btn">
                            Login
                        </Link>
                    )}
                </div>

            </nav>

            <nav className="nav navbar navbar-light">
                <a className="navbar-brand" href="#">
                    <img src={iconMetalRelics} width="40" alt="metal-relics-icon" />
                </a>

                <ul className="nav-list">

                    <li><Link to="/">Home</Link></li>

                    {role !== "admin" && (
                        <>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                        </>

                    )}

                    {role === "admin" && (
                        <>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/admin/users">Users</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                        </>
                    )}
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
                        <Link to="/login" className="login-btn">
                            Login
                        </Link>
                    )}
                </div>

            </nav>
        </>
    );
}

export default Nav;
