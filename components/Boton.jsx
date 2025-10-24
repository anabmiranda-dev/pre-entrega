import React from "react";
import '../src/App.css';
import { Link } from "react-router-dom";

function Boton({ texto, onClick, className = "", id, style, icon: Icon, iconPosition = "right", to }) {

    const content = (
        <>
            {iconPosition === "left" && Icon && <Icon size={18} style={{ marginRight: "6px" }} />}
            {texto}
            {iconPosition === "right" && Icon && <Icon size={18} style={{ marginLeft: "6px" }} />}
        </>);

    return to ? (
        <Link to={to} style={{ textDecoration: "none" }}>
            <button
                id={id}
                className={`custom-button ${className}`}
                style={style}
                type="button"
            >
                {content}
            </button>
        </Link>
    ) : (
        <button
            id={id}
            className={`custom-button ${className}`}
            onClick={onClick}
            style={style}
            type="button"
        >
            {content}
        </button>
    );
}

export default Boton;
