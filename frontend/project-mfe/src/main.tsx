import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import ProjectApp from "./ProjectApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProjectApp />
  </StrictMode>,
);
