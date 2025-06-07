import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled Card
const Item = styled(Paper)(() => ({
  backgroundColor: "rgba(107, 189, 227, 0.9)",
  padding: "20px",
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

// Group forecast data by date and extract highs/lows
const groupDailyForecasts = (list) => {
  const dailyData = {};

  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0]; // YYYY-MM-DD

    if (!dailyData[date]) {
      dailyData[date] = {
        temps: [],
        icon: item.weather[0].icon, // Default to first entry's icon
      };
    }

    dailyData[date].temps.push(item.main.temp);
  });

  return Object.entries(dailyData).map(([date, data]) => {
    const temps = data.temps;
    return {
      date,
      high: Math.max(...temps),
      low: Math.min(...temps),
      icon: data.icon,
    };
  });
};

const Forecastboard = ({ forecastData, tempUnit }) => {
  if (!forecastData?.list) return null;

  // Convert temperatures to the selected unit
  const convertTemp = (temp) => {
    return tempUnit === "C" ? temp : (temp * 9) / 5 + 32;
  };

  // Map forecast data to daily forecasts
  const convertedList = forecastData.list.map((item) => ({
    ...item,
    main: {
      ...item.main,
      temp: convertTemp(item.main.temp),
      temp_max: convertTemp(item.main.temp_max),
      temp_min: convertTemp(item.main.temp_min),
    },
  }));

  const dailyForecasts = groupDailyForecasts(convertedList).slice(0, 5);

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
        backgroundColor: "rgba(77, 211, 226, 0.69)",
        boxShadow: "0 6px 20px rgba(23, 195, 172, 0.1)",
        color: "#333",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 8 }}>
        5-Day Weather Forecast
      </Typography>

      <Grid container spacing={3}>
        {dailyForecasts.map(({ date, high, low, icon }, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Item>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {new Date(date).toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </Typography>

              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="weather icon"
                style={{ width: 60, height: 60 }}
              />

              <Typography variant="h6">
                High: {high.toFixed(1)}
                {tempUnit === "C" ? "°C" : "°F"}
              </Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>
                Low: {low.toFixed(1)}
                {tempUnit === "C" ? "°C" : "°F"}
              </Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Forecastboard;
