import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    // Restaurar sesión si existe token en localStorage
    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (token) {
            // Extraer usuario del token fake o usar datos reales
            const username = token.replace("fake-token-", "");
            setUser(username);
        }
    }, []);

    const login = (username) => {
        const token = `fake-token-${username}`;
        localStorage.setItem('authToken', token);
        setUser(username);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);
