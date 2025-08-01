import { useState, useEffect, createContext, useRef } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import ToggleSwitch from "./components/ToggleSwitch";
import Header from "./components/Header";
import Error from "./components/Error";
import Footer from "./components/Footer";
import Forecastboard from "./components/Forecastboard";
import InfoBoard from "./components/InfoBoard";
import WelcomeMessage from "./components/WelcomeMessage";

export const ScrollContext = createContext();

function App() {
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tempUnit, setTempUnit] = useState("C");
  const resultsRef = useRef(null);

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

  useEffect(() => {
    if (forecastData !== null && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [resultsRef, forecastData]);

  return (
    <Box
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(8px)",
        borderRadius: "12px",
        zIndex: 1,
        padding: "2rem",
      }}
    >
      <ScrollContext.Provider value={{ resultsRef }}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: city || errorMessage ? "flex-start" : "center",
            minHeight: "100vh",
            padding: "2rem",
            boxSizing: "border-box",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Header />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
              marginBottom: 5,
            }}
          >
            <SearchBar
              sendDataToParent={handleDataFromSearchBar}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setErrorMessage={setErrorMessage}
            />
            <ToggleSwitch
              tempUnit={tempUnit}
              onTempChange={onTempChange}
              sx={{ mt: 2 }}
            />
          </Box>

          {!city && !errorMessage && <WelcomeMessage />}
          {errorMessage && <Error errorMessage={errorMessage} />}

          {city && !errorMessage && !isLoading && (
            <Box ref={resultsRef}>
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
            </Box>
          )}
        </Box>
        <Footer />
      </ScrollContext.Provider>
    </Box>
  );
}

export default App;
