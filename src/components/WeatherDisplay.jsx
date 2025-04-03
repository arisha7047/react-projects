import React from "react";

export default function WeatherDisplay({ weather }) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Current Weather</h5>
        <p className="card-text">
          🌡️ Temperature: {weather.temperature_2m}°C (Feels like:{" "}
          {weather.apparent_temperature}°C)
        </p>
        <p className="card-text">
          💧 Humidity: {weather.relative_humidity_2m}%
        </p>
        <p className="card-text">🌬️ Wind Speed: {weather.wind_speed_10m} m/s</p>
        <p className="card-text">
          🌧️ Precipitation: {weather.precipitation} mm
        </p>
        <small className="text-muted">
          🕒 Last Updated: {new Date(weather.time).toLocaleString()}
        </small>
      </div>
    </div>
  );
}
