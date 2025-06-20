import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import WeatherIcon from './WeatherIcon';

export default function ForecastBox({ forecast, unit }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        5-Day Forecast
      </Typography>

      <Grid container spacing={2}>
        {forecast.map((day, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <Card sx={{
              height: '100%',
              borderRadius: '12px',
              background: 'linear-gradient(145deg, rgba(122, 135, 174, 0.97) 0%, rgba(157, 173, 204, 0.97) 100%)',
              border: '1px solid rgba(10, 25, 47, 0.1)',
              boxShadow: '0 4px 20px rgba(10, 25, 47, 0.1)'
            }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" gutterBottom>
                  {day.date.toLocaleDateString('en-US', { weekday: 'short' })}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </Typography>

                <Box sx={{ my: 1 }}>
                  <WeatherIcon code={day.icon} size={48} />
                </Box>

                <Typography variant="h6">
                  {Math.round(day.temp)}°{unit === 'metric' ? 'C' : 'F'}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    H: {Math.round(day.tempMax)}°
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    L: {Math.round(day.tempMin)}°
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  {day.weather}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
