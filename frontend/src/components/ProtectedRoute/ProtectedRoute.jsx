import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader/Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === "Admin") return <Navigate to="/admin/dashboard" replace />;

  return children;
};

export default ProtectedRoute;