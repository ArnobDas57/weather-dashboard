import React from "react";
import { CircularProgress, Typography, Box } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box>
      <CircularProgress color="primary" size={25} />
      <Typography
        variant="body2"
        color="textSecondary"
        fontWeight="fontWeightBold"
        fontSize="1rem"
      >
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
