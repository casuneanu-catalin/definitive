import React from "react";
import ProfileContext from "../context/profile/profileContext";
import AuthContext from "../context/auth/authContext";
import { useNavigate } from "react-router-dom";
import { ActiveBalance } from "./ActiveBalance";

export default function Header() {
  const { profile } = React.useContext(ProfileContext);
  const { logout } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => logout();
  const handleNavigateToDashboard = () => navigate("/dashboard");
  const handleNavigateToSupport = () => navigate("/dashboard/support");

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a
          onClick={handleNavigateToDashboard}
          className="navbar-brand"
          role="button"
        >
          <img src="/build/images/ds-logo.8b71364c.png" alt="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a role="button" className="nav-link pe-5" aria-current="page" onClick={handleNavigateToDashboard}>
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#profileModal"
                className="nav-link pe-5"
              >
                My Profile
              </a>
            </li>
            <li className="nav-item">
              <a role="button" className="nav-link" onClick={handleNavigateToSupport} >
                Support
              </a>
            </li>
          </ul>
          <ActiveBalance />
          <div className="log fw-semibold text-end">
            <div className="fs-xs text-uppercase">Logged in as</div>
            <p className="fs-sm text-uppercase mb-0 text-white">
              {profile?.firstName || ""}
            </p>
          </div>
          <a
            onClick={handleLogout}
            className="btn dash-btn clear-btn ms-3"
          >
            Log out
          </a>
        </div>
      </div>
    </nav>
  );
}
