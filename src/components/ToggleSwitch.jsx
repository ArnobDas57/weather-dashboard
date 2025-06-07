import React from "react";
import { ToggleButton, ToggleButtonGroup, Box } from "@mui/material";

const ToggleSwitch = ({ tempUnit, onTempChange }) => {
  const handleTempChange = (event, newTempUnit) => {
    if (newTempUnit !== null) {
      onTempChange(newTempUnit);
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 4,
          mb: 8,
          width: "100%",
        }}
      >
        <ToggleButtonGroup
          value={tempUnit}
          exclusive
          onChange={handleTempChange}
          size="medium"
          aria-label="temperature unit"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            "& .MuiToggleButton-root": {
              color: "rgba(255, 255, 255, 0.7)",
              border: "none",
              borderRadius: "10px",
              fontWeight: 500,
              transition: "all 0.3s ease",
              "&.Mui-selected": {
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                color: "#ffffff",
                boxShadow: "0 4px 12px rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              },
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: "rgba(255, 255, 255, 0.9)",
              },
            },
          }}
        >
          <ToggleButton value="C" aria-label="celsius">
            °C
          </ToggleButton>
          <ToggleButton value="F" aria-label="fahrenheit">
            °F
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </div>
  );
};

export default ToggleSwitch;
