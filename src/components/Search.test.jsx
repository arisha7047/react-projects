import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "./Search";
import axios from "axios";

jest.mock("axios");

const mockCityResults = {
  results: [
    { id: 1, name: "London", country: "UK", latitude: 51.5, longitude: -0.1 },
    {
      id: 2,
      name: "London",
      country: "Canada",
      latitude: 42.9,
      longitude: -81.2,
    },
  ],
};

describe("Search Component", () => {
  test("renders input field", () => {
    render(
      <Search
        setLocation={jest.fn()}
        setWeather={jest.fn()}
        setForecast={jest.fn()}
      />
    );
    expect(screen.getByPlaceholderText("Search city...")).toBeInTheDocument();
  });

  test("fetches and displays city results", async () => {
    axios.get.mockResolvedValueOnce({ data: mockCityResults });

    render(
      <Search
        setLocation={jest.fn()}
        setWeather={jest.fn()}
        setForecast={jest.fn()}
      />
    );
    fireEvent.change(screen.getByPlaceholderText("Search city..."), {
      target: { value: "London" },
    });

    await waitFor(() => {
      expect(screen.getByText("London, UK")).toBeInTheDocument();
      expect(screen.getByText("London, Canada")).toBeInTheDocument();
    });
  });

  test("selecting a city clears results and fetches weather", async () => {
    const setLocation = jest.fn();
    const setWeather = jest.fn();
    const setForecast = jest.fn();

    axios.get
      .mockResolvedValueOnce({ data: mockCityResults }) // for location
      .mockResolvedValueOnce({ data: { current: {}, daily: {} } }); // for weather

    render(
      <Search
        setLocation={setLocation}
        setWeather={setWeather}
        setForecast={setForecast}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Search city..."), {
      target: { value: "London" },
    });

    await waitFor(() => screen.getByText("London, UK"));

    fireEvent.click(screen.getByText("London, UK"));

    await waitFor(() => {
      expect(setLocation).toHaveBeenCalled();
      expect(setWeather).toHaveBeenCalled();
      expect(setForecast).toHaveBeenCalled();
    });
  });
});
