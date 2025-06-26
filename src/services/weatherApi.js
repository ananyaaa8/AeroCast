
const API_KEY = '16b884b5af62e365883093d16103a51e'; // Replace with your actual API key

export const getCurrentWeather = async (city, unit) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error('City not found');

  const data = await response.json();
  return {
    city: data.name,
    country: data.sys.country,
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    tempMin: data.main.temp_min,
    tempMax: data.main.temp_max,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind.speed,
    visibility: (data.visibility / 1000).toFixed(1),
    sunrise: new Date(data.sys.sunrise * 1000),
    sunset: new Date(data.sys.sunset * 1000),
    weatherDesc: data.weather[0].description,
    icon: data.weather[0].icon,
    coord: data.coord,
  };
};

export const getForecast = async (city, unit) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error('Failed to fetch forecast');
  const data = await response.json();

  const dailyMap = {};
  data.list.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!dailyMap[date]) {
      dailyMap[date] = {
        temp: item.main.temp,
        weather: item.weather[0].main,
        icon: item.weather[0].icon,
        date: new Date(item.dt * 1000),
      };
    }
  });

  return Object.values(dailyMap).slice(0, 5);
};

export const getHourlyForecast = async (city, unit) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error('Failed to fetch hourly forecast');

  const data = await response.json();
  return data.list.slice(0, 6).map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    temp: item.main.temp,
    icon: item.weather[0].icon,
    weather: item.weather[0].main,
  }));
};

export const getAQI = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error('Failed to fetch AQI data');

  const data = await response.json();
  return data.list[0];
};
