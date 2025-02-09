import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router";
import customTheme from "./theme.ts";
import "./i18n.ts";
import "./index.css";

import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ApplicationAlert from "./components/generalComponents/ApplicationAlert.tsx";

import LoginPage from "./pages/LoginPage.tsx";
import AvailableDogsPage from "./pages/AvailableDogsPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<AvailableDogsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ApplicationAlert />
    </ThemeProvider>
  </StrictMode>
);
