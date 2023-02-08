import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AUTH_TAG } from "../config/localStorage";

const Authmiddleware = () => {
  const token = localStorage.getItem(AUTH_TAG)
  return (
    token ? <Outlet /> : <Navigate to="/dashboard/login" />
  );
}

export default Authmiddleware;