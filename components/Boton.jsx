import React from "react";
import "../src/App.css";
import { useNavigate } from "react-router-dom";

function Boton({
    text,
    onClick,
    className = "",
    id,
    style,
    icon: Icon,
    iconPosition = "right",
    to
}) {

    const navigate = useNavigate();

    const handleClick = (e) => {
        if (onClick) onClick(e);
        if (to) navigate(to);
    };

    const content = (
        <>
            {iconPosition === "left" && Icon && (
                <Icon size={18} style={{ marginRight: "6px" }} />
            )}
            {text}
            {iconPosition === "right" && Icon && (
                <Icon size={18} style={{ marginLeft: "6px" }} />
            )}
        </>
    );

    return (
        <button
            id={id}
            className={`custom-button ${className}`}
            style={style}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleClick}
        >
            {content}
        </button>
    );
}

export default Boton;
