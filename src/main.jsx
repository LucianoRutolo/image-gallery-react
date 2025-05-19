import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App.jsx";
import { PixabayProvider } from "./contexts/PixabayContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PixabayProvider>
      <App />
    </PixabayProvider>
  </StrictMode>
);
