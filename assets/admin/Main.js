import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

if (document.getElementById("admin_app")) {
  const rootElement = document.getElementById("admin_app");
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
        <App />
    </StrictMode>
  );
}
