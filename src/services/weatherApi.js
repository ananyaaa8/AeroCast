const API_KEY = '16b884b5af62e365883093d16103a51e';

export const getCurrentWeather = async (city, unit) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
  );
  if (!res.ok) throw new Error("City not found");
  const data = await res.json();

  return {
    city: data.name,
    country: data.sys.country,
    temp: data.main.temp,
    tempMin: data.main.temp_min,
    tempMax: data.main.temp_max,
    humidity: data.main.humidity,
    feelsLike: data.main.feels_like,
    pressure: data.main.pressure,
    weather: data.weather[0].main,
    weatherDesc: data.weather[0].description,
    icon: data.weather[0].icon,
    windSpeed: data.wind.speed,
    windDeg: data.wind.deg,
    visibility: data.visibility / 1000,
    sunrise: new Date(data.sys.sunrise * 1000),
    sunset: new Date(data.sys.sunset * 1000),
    timezone: data.timezone,
  };
};

export const getForecast = async (city, unit) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}`
  );
  if (!res.ok) throw new Error("Unable to fetch forecast");
  const data = await res.json();

  return data.list
    .filter((item, index) => index % 8 === 0)
    .slice(0, 5)
    .map(item => ({
      date: new Date(item.dt * 1000),
      temp: item.main.temp,
      tempMin: item.main.temp_min,
      tempMax: item.main.temp_max,
      weather: item.weather[0].main,
      icon: item.weather[0].icon,
      humidity: item.main.humidity,
    }));
};

export const getHourlyForecast = async (city, unit) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}`
  );
  if (!res.ok) throw new Error("Unable to fetch forecast");

  const data = await res.json();

  return data.list.slice(0, 12).map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temp: item.main.temp,
    weather: item.weather[0].main,
    icon: item.weather[0].icon,
  }));
};
