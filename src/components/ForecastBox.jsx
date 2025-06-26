
import { Box, Card, CardContent, Typography } from '@mui/material';
import { fontWeight, styled } from '@mui/system';
import WeatherIcon from './WeatherIcon';

const ScrollBox = styled(Box)({
  display: 'flex',
  overflowX: 'auto',
  gap: '1rem',
  paddingBottom: '1rem',
  paddingTop: '1rem',
  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#425F7B',
    borderRadius: '10px',
  },
});

export default function ForecastBox({ forecast, unit }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <Box mt={2}>
      <Typography variant="h5" gutterBottom sx={{fontWeight: 'bolder'}}>
        5-Day Forecast
      </Typography>
      <ScrollBox>
        {forecast.map((item, index) => (
          <Card
            key={index}
            sx={{
              minWidth: 140,
              background: '#FFFFF',
              color: 'white',
              borderRadius: 3,
              transition: 'transform 0.3s ease, background-color 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2">
                {item.date.toLocaleDateString(undefined, {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </Typography>
              <WeatherIcon code={item.icon} size={40} />
              <Typography variant="h6">
                {Math.round(item.temp)}°{unit === 'metric' ? 'C' : 'F'}
              </Typography>
              <Typography variant="caption">{item.weather}</Typography>
            </CardContent>
          </Card>
        ))}
      </ScrollBox>
    </Box>
  );
}
