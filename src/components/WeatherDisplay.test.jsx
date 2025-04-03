import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherDisplay from "./WeatherDisplay";

const mockWeather = {
  temperature_2m: 22,
  apparent_temperature: 21,
  relative_humidity_2m: 55,
  wind_speed_10m: 5,
  precipitation: 0.2,
  time: new Date().toISOString(),
};

test("renders current weather correctly", () => {
  render(<WeatherDisplay weather={mockWeather} />);
  expect(screen.getByText(/Temperature: 22°C/)).toBeInTheDocument();
  expect(screen.getByText(/Feels like: 21°C/)).toBeInTheDocument();
  expect(screen.getByText(/Humidity: 55%/)).toBeInTheDocument();
  expect(screen.getByText(/Wind Speed: 5 m\/s/)).toBeInTheDocument();
  expect(screen.getByText(/Precipitation: 0.2 mm/)).toBeInTheDocument();
});
