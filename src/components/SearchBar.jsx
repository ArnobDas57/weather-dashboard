import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, InputAdornment, Box } from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";

const SearchBar = ({
  sendDataToParent,
  isLoading,
  setIsLoading,
  setErrorMessage,
}) => {
  const [city, setCity] = useState("");

  const searchCity = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) return;

    setIsLoading(true);
    const minDuration = 800; // in ms
    const startTime = Date.now();

    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&units=metric&appid=${apiKey}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${trimmedCity}&units=metric&appid=${apiKey}`;

      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(weatherUrl),
        axios.get(forecastUrl),
      ]);

      sendDataToParent(weatherResponse.data, forecastResponse.data);
      setErrorMessage("");

      // Save to localStorage for persistence
      localStorage.setItem("lastCity", trimmedCity);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setErrorMessage("Invalid city, try again.");
      sendDataToParent(null, null);
    } finally {
      const elapsed = Date.now() - startTime;
      const remaining = minDuration - elapsed;

      if (remaining > 0) {
        setTimeout(() => setIsLoading(false), remaining);
      } else {
        setIsLoading(false);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 4,
        mb: 2,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") searchCity();
        }}
        placeholder="Enter a city name..."
        label="Search for a city"
        variant="filled"
        InputProps={{
          sx: {
            height: 70,
            width: 700,
          },
          endAdornment: (
            <InputAdornment position="end">
              {!isLoading ? (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={searchCity}
                  sx={{
                    background:
                      "linear-gradient(-45deg,rgb(5, 65, 244),rgb(133, 205, 244), rgb(5, 65, 244), rgb(133, 205, 244))",
                    backgroundSize: "400% 400%",
                    ":hover": {
                      backgroundPosition: "100% 50%",
                      boxShadow: "0 4px 20px rgb(138, 166, 206)",
                      transform: "scale(1.05)",
                    },
                    animation: "gradientShift 2s linear infinite",
                    "@keyframes gradientShift": {
                      "0%": {
                        backgroundPosition: "0% 50%",
                      },
                      "50%": {
                        backgroundPosition: "100% 50%",
                      },
                      "100%": {
                        backgroundPosition: "0% 50%",
                      },
                    },
                  }}
                >
                  Search
                </Button>
              ) : (
                <LoadingSpinner />
              )}
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
