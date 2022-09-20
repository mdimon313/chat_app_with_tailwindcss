import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PublicRoute() {
  const { currentUser } = useAuth();
  return !currentUser ? <Outlet /> : <Navigate to="/chat" />;
}

export default PublicRoute;
