import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="architecture-theme">
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
);
