import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

/* Шрифты лежат внутри сайта — одинаковые везде, без Google Fonts */
import "@fontsource/anton";
import "@fontsource-variable/space-grotesk";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
