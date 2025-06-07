import React from "react";
import { Typography, Box } from "@mui/material";
import { Zap, Cloud, Sun, Snowflake, CloudRainWind } from "lucide-react";

const WelcomeMessage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        transform: "translateY(-200px)",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "1500px",
        padding: 3,
        margin: "0 auto",
        borderRadius: "12px",
        border: "1px solid rgba(186, 209, 231, 0.2)",
        boxShadow: "0 4px 12px rgba(186, 209, 231, 0.1)",
        backgroundColor: "rgba(186, 209, 231, 0.05)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          paddingY: 2,
          paddingX: 3,
        }}
      >
        <Zap />
        <Cloud />
        <Sun />
        <Snowflake />
        <CloudRainWind />
      </Box>
      <Typography
        color="primary.light"
        sx={{
          textAlign: "center", // center horizontally
          fontSize: "24px",
          fontWeight: "light",
          fontStyle: "italic",
          letterSpacing: "0.05em",
          textShadow: "2px 2px 4px rgba(212, 255, 175, 0.87)",
          paddingY: 1,
        }}
      >
        Welcome to Weather Dashboard, the ultimate destination for real-time
        weather updates!
      </Typography>
      <Typography
        sx={{
          textAlign: "center", // center horizontally
          fontSize: "18px",
          fontStyle: "italic",
          paddingY: 1.5,
        }}
      >
        To get started, try searching for a city like London, Toronto, or your
        hometown
      </Typography>
    </Box>
  );
};

export default WelcomeMessage;
