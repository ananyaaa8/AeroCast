import { Box } from '@mui/material';

export default function WeatherIcon({ code, size = 64 }) {
  const iconUrl = `https://openweathermap.org/img/wn/${code}@2x.png`;

  return (
    <Box
      component="img"
      src={iconUrl}
      alt="Weather icon"
      sx={{
        width: size,
        height: size,
        objectFit: 'contain'
      }}
    />
  );
}