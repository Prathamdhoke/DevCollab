import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

function ProtectedRoute() {
  const {
    user,

    loading,
  } = useAuth();

  /* ===========================================
                CHECK AUTH LOADING
    =========================================== */

  if (loading) {
    return <div>Loading...</div>;
  }

  /* ===========================================
                USER NOT LOGGED IN
    =========================================== */

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  /* ===========================================
                USER LOGGED IN
    =========================================== */

  return <Outlet />;
}

export default ProtectedRoute;
