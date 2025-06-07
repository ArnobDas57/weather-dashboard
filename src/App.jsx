import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import ToggleSwitch from "./components/ToggleSwitch";
import Header from "./components/Header";
import Error from "./components/Error";
import Forecastboard from "./components/Forecastboard";
import InfoBoard from "./components/InfoBoard";
import WelcomeMessage from "./components/WelcomeMessage";

function App() {
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tempUnit, setTempUnit] = useState("C");

  // State variables for weather data
  const [weatherDescription, setWeatherDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [humidity, setHumidity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //State variable for forecast data
  const [forecastData, setForecastData] = useState(null);

  const handleDataFromSearchBar = (data, forecastData) => {
    if (data === null) {
      setWeatherDescription("");
      setWindSpeed("");
      setHumidity("");
      setTemperature("");
      setCity("");
      setIcon("");
      setForecastData(null);
    } else {
      setWeatherDescription(data.weather[0].description);
      setWindSpeed(data.wind.speed);
      setHumidity(data.main.humidity);
      setTemperature(data.main.temp);
      setCity(data.name);
      localStorage.setItem("lastCity", data.name);
      setIcon(data.weather[0].icon);
      setForecastData(forecastData);
      setErrorMessage("");
    }

    console.log("Data received from SearchBar:", data);
    console.log("Forecast data received from SearchBar:", forecastData);
    console.log("Error message:", errorMessage);
  };

  const onTempChange = (unit) => {
    setTempUnit(unit);

    console.log("Temperature unit changed to:", unit);

    if (unit === "C") {
      setTemperature((prevTemp) => (((prevTemp - 32) * 5) / 9).toFixed(2));
    } else if (unit === "F") {
      setTemperature((prevTemp) => ((prevTemp * 9) / 5 + 32).toFixed(2));
    }
  };

  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");

    if (savedCity) {
      const fetchLastSavedCity = async () => {
        try {
          const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
          const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${savedCity}&units=metric&appid=${apiKey}`;
          const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${savedCity}&units=metric&appid=${apiKey}`;
          const [weatherResponse, forecastResponse] = await Promise.all([
            axios.get(weatherUrl),
            axios.get(forecastUrl),
          ]);
          handleDataFromSearchBar(weatherResponse.data, forecastResponse.data);
          setErrorMessage("");
        } catch (error) {
          console.error("Error fetching last saved city data:", error);
          setErrorMessage("Failed to load last saved city data.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchLastSavedCity();
    }
  }, []);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: city || errorMessage ? "flex-start" : "center",
        minHeight: "100vh",
        padding: "2rem",
        boxSizing: "border-box",
        background: "linear-gradient(to bottom,rgb(12, 37, 83),rgb(113, 143, 185))", // Optional: nice background
      }}
    >
      <Header />
      <SearchBar
        sendDataToParent={handleDataFromSearchBar}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setErrorMessage={setErrorMessage}
      />
      <ToggleSwitch tempUnit={tempUnit} onTempChange={onTempChange} />

      {!city && !errorMessage && <WelcomeMessage />}
      {errorMessage && <Error errorMessage={errorMessage} />}
      
      {city && !errorMessage && !isLoading && (
        <>
          <InfoBoard
            weatherDescription={weatherDescription}
            windSpeed={windSpeed}
            humidity={humidity}
            temperature={temperature}
            icon={icon}
            city={city}
            tempUnit={tempUnit}
          />
          <Forecastboard forecastData={forecastData} tempUnit={tempUnit} />
        </>
      )}
    </Box>
  );
}

export default App;
