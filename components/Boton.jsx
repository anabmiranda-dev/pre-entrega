import React from "react";
import "../src/App.css";
import { Link } from "react-router-dom";

function Boton({ 
    texto, 
    onClick, 
    className = "", 
    id, 
    style, 
    icon: Icon, 
    iconPosition = "right", 
    to 
}) {

    const content = (
        <>
            {iconPosition === "left" && Icon && (
                <Icon size={18} style={{ marginRight: "6px" }} />
            )}
            {texto}
            {iconPosition === "right" && Icon && (
                <Icon size={18} style={{ marginLeft: "6px" }} />
            )}
        </>
    );

    // 🟢 SI tiene prop "to", sigue siendo un botón pero ejecuta onClick primero
    if (to) {
        return (
            <Link 
                to={to} 
                style={{ textDecoration: "none" }}
                onClick={onClick}  // <-- el click se ejecuta ANTES de navegar
            >
                <button
                    id={id}
                    className={`custom-button ${className}`}
                    style={style}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    {content}
                </button>
            </Link>
        );
    }

    // 🟢 Si NO tiene "to", es un botón común
    return (
        <button
            id={id}
            className={`custom-button ${className}`}
            onClick={onClick}
            style={style}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
        >
            {content}
        </button>
    );
}

export default Boton;
