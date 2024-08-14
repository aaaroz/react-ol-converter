import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import CoordinateContextProvider from "./libs/CoordinateContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CoordinateContextProvider>
      <App />
    </CoordinateContextProvider>
  </StrictMode>
);
