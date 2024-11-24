import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=608e09aabd31453992f152714242311&q=${city}&aqi=no`
      );
      setWeather(response.data);
    } catch (err) {
      setError("Failed to fetch weather data. Please check the city name.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
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
          <h2>
            {weather.location.name}, {weather.location.country}
          </h2>
          <p>
            <strong>Temperature:</strong> {weather.current.temp_c}°C
          </p>
          <p>
            <strong>Condition:</strong> {weather.current.condition.text}
          </p>
          <p>
            <img src={weather.current.condition.icon} alt="Weather Icon" />
          </p>
          <p>
            <strong>Humidity:</strong> {weather.current.humidity}%
          </p>
          <p>
            <strong>Wind Speed:</strong> {weather.current.wind_kph} km/h
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
