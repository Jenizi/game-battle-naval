import { createRoot } from "react-dom/client";
import { Router } from "./routes/router.tsx";
import { WebSocketProvider } from "./contexts/web-socket-context.tsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <MantineProvider defaultColorScheme="dark">
    <WebSocketProvider>
      <Router />
    </WebSocketProvider>
  </MantineProvider>
);
