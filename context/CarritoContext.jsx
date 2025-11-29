import { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {

    const [cartMessage, setCartMessage] = useState("");


    // Inicializar carrito desde localStorage
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    });

    // Guardar cada vez que cambia
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Cargar carrito externamente
    const loadCart = (data) => {
        setCart(data);
    };

    // Agregar producto (con quantity)
    const addToCart = (product) => {
        setCartMessage(`${product.name} added to cart!`);

        setTimeout(() => setCartMessage(""), 2000);

        setCart((prev) => {
            const exists = prev.find((item) => item.id === product.id);

            if (exists) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prev, { ...product, quantity: 1 }];
        });
    };

    // Eliminar un producto completo
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    // Vaciar el carrito
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CarritoContext.Provider
            value={{
                cart,
                loadCart,
                addToCart,
                removeFromCart,
                clearCart,
                cartMessage
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
}
