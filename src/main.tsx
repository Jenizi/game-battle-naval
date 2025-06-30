import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./routes/router.tsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <Router />
    </MantineProvider>
  </StrictMode>
);
