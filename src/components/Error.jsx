import React from "react";
import { Box, Alert, AlertTitle } from "@mui/material";

const Error = ({ errorMessage }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "45%",
        left: "42%",
        transform: "translateY(-200px)",
        display: "flex",
      }}
    >
      <Alert
        severity="error"
        sx={{
          padding: "16px",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "600px",
          border: "1px solid rgba(211, 47, 47, 0.2)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        <AlertTitle
          sx={{
            fontWeight: "bold",
            fontSize: "18px",
            color: "#d32f2f",
          }}
        >
          Error
        </AlertTitle>
        {errorMessage}
      </Alert>
    </Box>
  );
};

export default Error;
