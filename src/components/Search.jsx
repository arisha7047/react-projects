import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Search({ setLocation, setWeather, setForecast }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 2) fetchLocations(query);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  async function fetchLocations(query) {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search`,
        {
          params: {
            name: query,
            count: 5,
            language: "en",
            format: "json",
          },
        }
      );
      setResults(res.data.results || []);
    } catch (err) {
      console.error("Error fetching locations", err);
    }
    setLoading(false);
  }
  async function handleSelect(city) {
    setQuery("");
    setResults([]);
    document.activeElement.blur(); // optional UX improvement
    setLocation(city);

    try {
      const res = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
        params: {
          latitude: city.latitude,
          longitude: city.longitude,
          current:
            "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m",
          daily: "temperature_2m_max,temperature_2m_min,precipitation_sum",
          timezone: "auto",
        },
      });
      setWeather(res.data.current);
      setForecast(res.data.daily);
    } catch (err) {
      console.error("Error fetching weather data", err);
    }
  }

  return (
    <div className="position-relative mb-4">
      <input
        className="form-control"
        type="text"
        placeholder="Search city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <div className="form-text">Loading...</div>}
      {results.length > 0 && (
        <ul className="list-group position-absolute w-100 z-index-1">
          {results.map((city) => (
            <li
              key={city.id}
              className="list-group-item list-group-item-action"
              onClick={() => handleSelect(city)}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
