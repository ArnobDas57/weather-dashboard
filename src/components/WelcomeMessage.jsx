import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import { Zap, Cloud, Sun, Snowflake, CloudRainWind } from "lucide-react";
import { keyframes } from "@emotion/react";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const WelcomeMessage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "1000px",
        mx: "auto",
        mt: 4,
        px: 3,
        py: 4,
        borderRadius: "12px",
        border: "1px solid rgba(186, 209, 231, 0.2)",
        boxShadow: "0 4px 12px rgba(186, 209, 231, 0.1)",
        backgroundColor: "rgba(186, 209, 231, 0.05)",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ flexWrap: "wrap", mb: 2 }}
      >
        <Zap />
        <Cloud />
        <Sun />
        <Snowflake />
        <CloudRainWind />
      </Stack>

      <Typography
        color="primary.light"
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: 300,
          letterSpacing: "0.05em",
          textShadow: "2px 2px 4px rgba(58, 9, 82, 0.87)",
          background:
            "linear-gradient(90deg, #4079ff, #40ffaa, #4079ff, #40ffaa)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          paddingY: 1,
          animation: `${gradientAnimation} 3s linear infinite`,
          mb: 1,
        }}
      >
        Welcome to Weather Dashboard, the ultimate destination for real-time
        weather updates!
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          textAlign: "center",
          fontStyle: "italic",
          color: "text.secondary",
        }}
      >
        To get started, try searching for a city like London, Toronto, or your
        hometown.
      </Typography>
    </Box>
  );
};

export default WelcomeMessage;
