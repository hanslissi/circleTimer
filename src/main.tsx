import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./global.theme.css";
import "./global.components.css";
import "./assets/fonts/7segment/7segment.ttf";
import { TimerPage } from "@pages/TimerPage";
import { EditPage } from "@pages/EditPage";
import { ROUTE_PATHS } from "@pages/constants";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_PATHS.HOME} element={<TimerPage />} />
        <Route path={ROUTE_PATHS.EDIT} element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
