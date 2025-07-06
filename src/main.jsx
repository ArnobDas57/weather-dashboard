import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import theme from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App.jsx";
import Lightning from "./components/Lightning/Lightning.jsx";

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
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <Lightning hue={220} xOffset={0} speed={1} intensity={1} size={1} />
      </div>
      <App />
    </ThemeProvider>
  </StrictMode>
);
