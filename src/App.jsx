import React, { useState } from "react";
import Search from "./components/Search";
import WeatherDisplay from "./components/WeatherDisplay";
import Forecast from "./components/ForeCast";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  return (
    <div className="container py-5">
      <div className="card shadow p-4">
        <h1 className="text-center mb-4">🌤️ Weather App</h1>
        <Search
          setLocation={setLocation}
          setWeather={setWeather}
          setForecast={setForecast}
        />
        {weather && <WeatherDisplay weather={weather} />}
        {forecast && <Forecast forecast={forecast} />}
      </div>
    </div>
  );
}
