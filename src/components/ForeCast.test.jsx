import React from "react";
import { render, screen } from "@testing-library/react";
import Forecast from "./ForeCast";

const mockForecast = {
  time: ["2025-04-01", "2025-04-02", "2025-04-03", "2025-04-04", "2025-04-05"],
  temperature_2m_max: [30, 31, 32, 33, 34],
  temperature_2m_min: [20, 21, 22, 23, 24],
  precipitation_sum: [0, 1, 0.5, 2, 0],
};

test("renders 5-day forecast cards", () => {
  render(<Forecast forecast={mockForecast} />);
  expect(screen.getByText(/5-Day Forecast/)).toBeInTheDocument();
  expect(screen.getAllByText(/°C/)).toHaveLength(10); // 5 max + 5 min
});
