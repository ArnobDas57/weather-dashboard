import React from "react";
import { Box, Alert, AlertTitle } from "@mui/material";

const Error = ({ errorMessage }) => {
  if (!errorMessage) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 4,
        px: 2,
      }}
    >
      <Alert
        severity="error"
        sx={{
          padding: 2,
          borderRadius: 2,
          maxWidth: 600,
          width: "100%",
          border: "1px solid rgba(211, 47, 47, 0.2)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgba(255, 0, 0, 0.05)",
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
