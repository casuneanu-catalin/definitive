import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Authmiddleware from "./midllewares/AuthMiddleware";
import { AuthProvider } from "./context/auth/authContext";
import { RegistrationProvider } from "./context/registration/registrationContext";
import Congratulations from "./pages/Congratulations";
import { ProfileProvider } from "./context/profile/profileContext";
import { InvestmentsProvider } from "./context/investments/investmentsContext";
import { Support } from "./pages/Support";

function Main() {
  return (
    <Router>
      <AuthProvider>
        <RegistrationProvider>
          <ProfileProvider>
            <InvestmentsProvider>
              <Routes>
                <Route exact path="/dashboard/login" element={<Login />} />
                <Route
                  exact
                  path="/dashboard/register"
                  element={<Register />}
                />
                <Route
                  exact
                  path="/dashboard/congratulations"
                  element={<Congratulations />}
                />
                <Route exact path="/dashboard" element={<Authmiddleware />}>
                  <Route path="/dashboard" element={<Home />} />
                  <Route path="/dashboard/support" element={<Support />} />
                </Route>
                <Route element={<NotFound />} />
              </Routes>
            </InvestmentsProvider>
          </ProfileProvider>
        </RegistrationProvider>
      </AuthProvider>
    </Router>
  );
}

export default Main;

if (document.getElementById("dashboard_app")) {
  const rootElement = document.getElementById("dashboard_app");
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <Main />
    </StrictMode>
  );
}
