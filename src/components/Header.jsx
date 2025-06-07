import React from "react";
import { Typography } from "@mui/material";

const Header = () => {
  return (
    <div>
      <Typography
        color="primary.light"
        sx={{
          textAlign: "center", // center horizontally
          fontSize: "36px",
          fontWeight: "bold",
          letterSpacing: "0.05em",
          textShadow: "2px 2px 4px rgba(149, 228, 79, 0.87)",
          paddingY: 1,
        }}
      >
        WEATHER DASHBOARD
      </Typography>
      <Typography
        sx={{
          textAlign: "center", // center horizontally
          fontSize: "18px",
          fontStyle: "italic",
          paddingY: 1.5,
          borderBottom: "1px solid",
          borderColor: "white",
        }}
      >
        Real Time Weather Updates For Any City
      </Typography>
    </div>
  );
};

export default Header;
