import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import theme from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App.jsx";
import Silk from "./components/Silk";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline
        styles={{
          html: {
            height: "100%",
            overflowX: "hidden",
          },
          body: {
            height: "100%",
            margin: 0,
            padding: 0,
            overflowY: "hidden",
          },
          "#root": {
            height: "100%",
            display: "flex",
            flexDirection: "column",
          },
        }}
      />
      <Silk
        speed={5}
        scale={1}
        color="#4A70E3"
        noiseIntensity={1.5}
        rotation={0}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
        }}
      />
      <App />
    </ThemeProvider>
  </StrictMode>
);
