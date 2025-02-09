import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "./theme.ts";
import "./i18n.ts";
import "./index.css";

import App from "./App.tsx";
import ApplicationAlert from "./components/generalComponents/ApplicationAlert.tsx";
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>

      <ApplicationAlert />
    </ThemeProvider>
  </StrictMode>
);
