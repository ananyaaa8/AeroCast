import { useState, useEffect } from 'react';
import InfoBox from './InfoBox';
import SearchBox from './SearchBox';
import ForecastBox from './ForecastBox';
import { Box, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

const WeatherContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80vh',
  padding: '2rem',
  borderRadius: '16px',
  backgroundColor: 'rgba(191, 190, 211, 0.97)',
  boxShadow: '0 8px 32px rgba(10, 25, 47, 0.2)',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(10, 25, 47, 0.1)',
  maxWidth: '1000px',
  margin: '0 auto',
});

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric');

  // Default location on first load
  useEffect(() => {
    updateInfo({ city: "New Delhi" });
  }, []);

  const updateInfo = async (result) => {
    try {
      setLoading(true);
      setError(null);

      // Fetch current weather
      const weatherData = await getWeatherData(result.city);
      setWeatherInfo(weatherData);

      // Fetch forecast
      const forecastData = await getForecastData(result.city);
      setForecast(forecastData);

    } catch (err) {
      setError(err.message || "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherData = async (city) => {
    const api_url = "https://api.openweathermap.org/data/2.5/weather";
    const api_key = "16b884b5af62e365883093d16103a51e";

    const response = await fetch(
      `${api_url}?q=${city}&appid=${api_key}&units=${unit}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const jsonResponse = await response.json();

    return {
      city: jsonResponse.name,
      country: jsonResponse.sys.country,
      temp: jsonResponse.main.temp,
      tempMin: jsonResponse.main.temp_min,
      tempMax: jsonResponse.main.temp_max,
      humidity: jsonResponse.main.humidity,
      feelsLike: jsonResponse.main.feels_like,
      pressure: jsonResponse.main.pressure,
      weather: jsonResponse.weather[0].main,
      weatherDesc: jsonResponse.weather[0].description,
      icon: jsonResponse.weather[0].icon,
      windSpeed: jsonResponse.wind.speed,
      windDeg: jsonResponse.wind.deg,
      visibility: jsonResponse.visibility / 1000, // convert to km
      sunrise: new Date(jsonResponse.sys.sunrise * 1000),
      sunset: new Date(jsonResponse.sys.sunset * 1000),
      timezone: jsonResponse.timezone,
    };
  };

  const getForecastData = async (city) => {
    const api_url = "https://api.openweathermap.org/data/2.5/forecast";
    const api_key = "16b884b5af62e365883093d16103a51e";

    const response = await fetch(
      `${api_url}?q=${city}&appid=${api_key}&units=${unit}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch forecast");
    }

    const jsonResponse = await response.json();

    // Group by day and get daily forecast
    const dailyForecast = jsonResponse.list
      .filter((item, index) => index % 8 === 0) // Get one forecast per day
      .slice(0, 5); // Get next 5 days

    return dailyForecast.map(item => ({
      date: new Date(item.dt * 1000),
      temp: item.main.temp,
      tempMin: item.main.temp_min,
      tempMax: item.main.temp_max,
      weather: item.weather[0].main,
      icon: item.weather[0].icon,
      humidity: item.main.humidity,
    }));
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
    if (weatherInfo) {
      updateInfo({ city: weatherInfo.city });
    }
  };

  return (
    <WeatherContainer>
      <Box className="weather-app">
        <Box className="weather-header">
          <Typography variant="h2" component="h2" gutterBottom>
            Weather Forecast
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Get real-time weather updates for any location
          </Typography>
        </Box>

        <SearchBox updateInfo={updateInfo} loading={loading} />
        <button
          onClick={toggleUnit}
          style={{
            margin: '1rem 0',
            padding: '0.5rem 1rem',
            background: '#0a192f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '1rem',
            boxShadow: '0 2px 8px rgba(10, 25, 47, 0.2)'
          }}
        >
          Switch to {unit === 'metric' ? '°F' : '°C'}
        </button>

        {loading && <CircularProgress style={{ margin: '2rem auto' }} />}

        {error && (
          <Typography color="error" style={{ margin: '1rem 0' }}>
            {error}
          </Typography>
        )}

        {weatherInfo && (
          <>
            <InfoBox info={weatherInfo} unit={unit} />
            {forecast && <ForecastBox forecast={forecast} unit={unit} />}
          </>
        )}
      </Box>
    </WeatherContainer>
  );
}