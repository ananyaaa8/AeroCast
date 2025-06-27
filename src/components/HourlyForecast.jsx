import { Box, Typography, Card, CardContent } from '@mui/material';
import WeatherIcon from './WeatherIcon';
import { styled } from '@mui/system';

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


export default function HourlyForecast({ hours, unit }) {
  if (!hours || hours.length === 0) return null;

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bolder' }}>Hourly Forecast</Typography>
      <ScrollBox>
        {hours.map((item, index) => (
          <Card key={index} sx={{ minWidth: 100, backgroundColor: 'rgba(255,255,255,0.05)', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="body2">{item.time}</Typography>
              <WeatherIcon code={item.icon} size={36} />
              <Typography variant="h6">{Math.round(item.temp)}°{unit === 'metric' ? 'C' : 'F'}</Typography>
              <Typography variant="caption">{item.weather}</Typography>
            </CardContent>
          </Card>
        ))}
      </ScrollBox>
    </Box>
  );
}
