import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router";
import { RouteOptions } from "./globalTypes.ts";
import { useAuthStore } from "./stores/auth.ts";
import { Navigate } from "react-router";
import customTheme from "./theme.ts";
import "./i18n.ts";
import "./index.css";

import PublicRoute from "./components/PublicRoute.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ApplicationAlert from "./components/generalComponents/ApplicationAlert.tsx";

import LoginPage from "./pages/LoginPage.tsx";
import AvailableDogsPage from "./pages/AvailableDogsPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path={RouteOptions.Login} element={<LoginPage />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              path={RouteOptions.AvailableDogs}
              element={<AvailableDogsPage />}
            />
          </Route>

          <Route
            path="*"
            element={
              useAuthStore.getState().isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </BrowserRouter>

      <ApplicationAlert />
    </ThemeProvider>
  </StrictMode>
);
