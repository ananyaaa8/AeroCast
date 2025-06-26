import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Divider,
  Chip
} from '@mui/material';
import { styled } from '@mui/system';
import WeatherIcon from './WeatherIcon';

const WeatherCard = styled(Card)({
  background: 'linear-gradient(145deg, rgba(122, 135, 174, 0.97) 0%, rgba(157, 173, 204, 0.97) 100%)',
  border: '1px solid rgba(10, 25, 47, 0.2)',
  boxShadow: '0 8px 32px rgba(10, 25, 47, 0.15)',
  borderRadius: '16px',
  overflow: 'hidden',
});

const WeatherDetail = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0.5rem 0',
});

export default function InfoBox({ info, unit }) {
  if (!info) return null;

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <WeatherCard>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4" component="div" gutterBottom>
              {info.city}, {info.country}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <WeatherIcon code={info.icon} size={64} />
            <Typography variant="h6" color="text.secondary">
              {info.weatherDesc}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center', my: 3 }}>
          <Typography variant="h2" component="div">
            {Math.round(info.temp)}°{unit === 'metric' ? 'C' : 'F'}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Feels like: {Math.round(info.feelsLike)}°{unit === 'metric' ? 'C' : 'F'}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <WeatherDetail>
            <Typography variant="body1">Min Temperature:</Typography>
            <Chip 
              label={`${Math.round(info.tempMin)}°${unit === 'metric' ? 'C' : 'F'}`} 
              color="primary" 
            />
          </WeatherDetail>

          <WeatherDetail>
            <Typography variant="body1">Max Temperature:</Typography>
            <Chip 
              label={`${Math.round(info.tempMax)}°${unit === 'metric' ? 'C' : 'F'}`} 
              color="secondary" 
            />
          </WeatherDetail>

          <WeatherDetail>
            <Typography variant="body1">Humidity:</Typography>
            <Chip label={`${info.humidity}%`} />
          </WeatherDetail>

          <WeatherDetail>
            <Typography variant="body1">Wind Speed:</Typography>
            <Chip 
              label={`${info.windSpeed} ${unit === 'metric' ? 'm/s' : 'mph'}`} 
            />
          </WeatherDetail>

          <WeatherDetail>
            <Typography variant="body1">Pressure:</Typography>
            <Chip label={`${info.pressure} hPa`} />
          </WeatherDetail>

          <WeatherDetail>
            <Typography variant="body1">Visibility:</Typography>
            <Chip label={`${info.visibility} km`} />
          </WeatherDetail>

          <WeatherDetail>
            <Typography variant="body1">Sunrise:</Typography>
            <Chip label={formatTime(info.sunrise)} color="warning" />
          </WeatherDetail>

          <WeatherDetail>
            <Typography variant="body1">Sunset:</Typography>
            <Chip label={formatTime(info.sunset)} color="warning" />
          </WeatherDetail>
        </Box>
      </CardContent>
    </WeatherCard>
  );
}