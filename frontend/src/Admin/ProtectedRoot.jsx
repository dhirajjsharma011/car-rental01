ProtectedRoot/Admin



import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoot() {
  const admin = localStorage.getItem("admin");

  if (!admin) {
    return <Navigate to="/adminlogin" replace />;
  }

  return <Outlet />;
}