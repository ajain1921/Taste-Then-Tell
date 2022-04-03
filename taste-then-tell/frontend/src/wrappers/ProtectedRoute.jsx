import React from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/context";

const ProtectedRoute = ({ Component }) => {
  const { user } = useAuth();
  const location = useLocation();
  const isLogin = location.pathname === "/";

  if (!user && !isLogin) {
    return <Navigate to="/" />;
  } else if (user && isLogin) {
    return <Navigate to="/profile" />;
  }

  return (
    <>
      {!isLogin && <Navbar />}
      <Component />
    </>
  );
};

export default ProtectedRoute;
