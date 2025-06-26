import { useState, useEffect } from 'react';
import { getCurrentWeather, getForecast, getHourlyForecast } from '../services/weatherApi';

export const useWeather = (defaultCity = 'New Delhi', unit = 'metric') => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentCities, setRecentCities] = useState([]);

  const updateInfo = async ({ city }) => {
    try {
      setLoading(true);
      setError(null);

      const weather = await getCurrentWeather(city, unit);
      const forecastData = await getForecast(city, unit);
      const hourlyData = await getHourlyForecast(city, unit);

      setWeatherInfo(weather);
      setForecast(forecastData);
      setHourly(hourlyData);

      const history = JSON.parse(localStorage.getItem('weather_history')) || [];
      const newHistory = [city, ...history.filter(c => c !== city)].slice(0, 5);
      localStorage.setItem('weather_history', JSON.stringify(newHistory));
      setRecentCities(newHistory);
    } catch (err) {
      setError(err.message || 'Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateInfo({ city: defaultCity });

    const saved = JSON.parse(localStorage.getItem('weather_history')) || [];
    setRecentCities(saved);
  }, [defaultCity]);

  return {
    weatherInfo,
    forecast,
    hourly,
    loading,
    error,
    updateInfo,
    recentCities,
  };
};
