// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0d0829", // ← your desired app‐wide color
    },
    primary: {
      main: "#1976d2",
      light: "#42a5f5", // light
      dark: "#1565c0", // dark
    },
    secondary: {
      main: "#FFFFFF",
    },
    // …you can still customize primary/secondary, etc.
  },
});

export default theme;
