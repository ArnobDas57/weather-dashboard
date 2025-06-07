import React from "react";
import { Box, Grid, Stack, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Wind, Thermometer, Droplet, Cloud, Notebook } from "lucide-react";

// Styled components
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(107, 189, 227, 0.9)",
  padding: theme.spacing(3),
  color: "rgba(0, 0, 0, 0.87)",
  textAlign: "center",
  borderRadius: "16px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  transition: "0.3s",
  "&:hover": {
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
    transform: "translateY(-2px)",
  },
}));

const InfoBoard = ({
  weatherDescription,
  windSpeed,
  humidity,
  temperature,
  icon,
  city,
  tempUnit,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "1000px",
        padding: 3,
        margin: "0 auto",
        borderRadius: "20px",
        backgroundColor: "rgb(97, 185, 235)",
        boxShadow: "0 6px 20px rgba(23, 195, 172, 0.1)",
        color: "#333",
        mb: { xs: 4, sm: 6, md: 8 },
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 8 }}>
        Weather Overview for {city}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Item>
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
              <Thermometer /> Temperature
            </Typography>
            <Typography variant="h4">
              {Math.round(temperature)}
              {tempUnit === "C" ? "°C" : "°F"}
            </Typography>
          </Item>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Item>
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
              <Notebook /> Description
            </Typography>
            <Typography variant="h5">{weatherDescription}</Typography>
            {icon && (
              <Box sx={{ mt: 1 }}>
                <img
                  src={`http://openweathermap.org/img/wn/${icon}.png`}
                  alt={weatherDescription}
                  style={{ width: 60, height: 60 }}
                />
              </Box>
            )}
          </Item>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Item>
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
              <Wind /> Wind Speed
            </Typography>
            <Typography variant="h5">{windSpeed} m/s</Typography>
          </Item>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Item>
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
              <Droplet /> Humidity
            </Typography>
            <Typography variant="h5">{humidity}%</Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InfoBoard;
