import React from "react";
import { Typography } from "@mui/material";
import { keyframes } from "@emotion/react";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Header = () => {
  return (
    <div>
      <Typography
        sx={{
          background:
            "linear-gradient(90deg, #4079ff, #40ffaa, #4079ff, #40ffaa)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
          fontSize: "36px",
          fontWeight: "bold",
          letterSpacing: "0.05em",
          paddingY: 1,
          animation: `${gradientAnimation} 3s linear infinite`,
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
