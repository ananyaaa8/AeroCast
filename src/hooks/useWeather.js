

import { useState, useEffect } from 'react';
import {
  getCurrentWeather,
  getForecast,
  getHourlyForecast,
  getAQI,
} from '../services/weatherApi';

export const useWeather = (defaultCity = 'New Delhi', unit = 'metric') => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentCities, setRecentCities] = useState([]);

  const updateInfo = async ({ city, resetError = false }) => {
    if (resetError) {
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const weather = await getCurrentWeather(city, unit);
      const forecastData = await getForecast(city, unit);
      const hourlyData = await getHourlyForecast(city, unit);
       const aqiData = await getAQI(weather.coord.lat, weather.coord.lon);

      setWeatherInfo(weather);
      setForecast(forecastData || []);
      setHourly(hourlyData || []);
      setAqi(aqiData);


      const history = JSON.parse(localStorage.getItem('weather_history')) || [];
      const newHistory = [city, ...history.filter(c => c !== city)].slice(0, 5);
      localStorage.setItem('weather_history', JSON.stringify(newHistory));
      setRecentCities(newHistory);
    } catch (err) {
      setError(err.message || 'Error fetching weather data');

      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };


  const clearRecentCities = () => {
    localStorage.removeItem('weather_history');
    setRecentCities([]);
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
    aqi,
    loading,
    error,
    updateInfo,
    recentCities,
    clearRecentCities,
  };
};
