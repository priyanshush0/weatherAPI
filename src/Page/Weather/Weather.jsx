import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("Los Angeles, CA"); // Default city
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const encodedCity = encodeURIComponent(city); // URL-encode the city name
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5b0a152759c7caa5dad89430d3e04dd9`
      );
      console.log(response.data); // Log the response data
      setWeather(response.data);
    } catch ( err) {
      setError("Failed to fetch weather data. Please check the city name.");
      console.error("Error details:", err.response ? err.response.data : err.message); // Log the actual error for debugging
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(); // Fetch weather for the default city on component mount
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(); // Fetch weather for the new city when the form is submitted
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSearch} className="search-Form">
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {weather && !loading && !error && (
        <div className="weather-details">
          <h2>{weather.resolvedAddress}</h2>
          <h2>
             {weather.name}
          </h2>
          <p>
            <strong>Temperature:</strong> {(weather.main.temp - 273.15).toFixed(2)}°C
          </p>
          <p>
            <strong>Humidity:</strong> {weather.main.humidity}%
          </p>
          <p>
            <strong>Wind Speed:</strong> {weather.wind.speed} km/h
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;