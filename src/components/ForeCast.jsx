import React from "react";

export default function Forecast({ forecast }) {
  return (
    <div>
      <h5 className="mb-3">5-Day Forecast</h5>
      <div className="d-flex overflow-auto gap-3 pb-2">
        {forecast.time.slice(0, 5).map((day, index) => (
          <div
            key={day}
            className="card flex-shrink-0 text-center"
            style={{ minWidth: "150px" }}
          >
            <div className="card-body">
              <p className="card-title fw-bold small">
                {new Date(day).toDateString()}
              </p>
              <p className="text-primary">
                ⬆️ {forecast.temperature_2m_max[index]}°C
              </p>
              <p className="text-info">
                ⬇️ {forecast.temperature_2m_min[index]}°C
              </p>
              <p className="text-muted small">
                🌧️ {forecast.precipitation_sum[index]} mm
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
