import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n.ts";
import "./index.css";

import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
