import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function ProtectedRoute({ children, adminOnly = false }) {
    const { user, role } = useAuthContext();

    if (!user) return <Navigate to="/login" />;

    if (adminOnly && role !== "admin") {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;
