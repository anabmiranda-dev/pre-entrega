import { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    const [cart, setCart] = useState([]);

    const loadCart = (data) => {
        setCart(data);
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CarritoContext.Provider value={{ cart, loadCart, clearCart }}>
            {children}
        </CarritoContext.Provider>
    );
}
