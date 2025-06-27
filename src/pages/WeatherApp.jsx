import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Chip,
  Button,
  Fade,
} from '@mui/material';
import InfoBox from '../components/InfoBox';
import SearchBox from '../components/SearchBox';
import ForecastBox from '../components/ForecastBox';
import UnitToggle from '../components/UnitToggle';
import { useWeather } from '../hooks/useWeather';
import HourlyForecast from '../components/HourlyForecast';
import AQIBox from '../components/AQIBox';


export default function WeatherApp() {
  const [unit, setUnit] = useState('metric');

  const {
    weatherInfo,
    forecast,
    hourly,
    loading,
    error,
    aqi,
    updateInfo,
    recentCities,
    clearRecentCities,
  } = useWeather('New Delhi', unit);

  // Auto-dismiss error
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        updateInfo({ city: '', resetError: true });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        px: 2,
        py: 4,
        minHeight: '100vh',
        backgroundColor: 'linear-gradient(160deg,rgb(124, 124, 152),rgb(143, 137, 147))',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 750,
          backgroundColor: '#1e293b',
          borderRadius: 4,
          p: 3,
          boxShadow: '0px 0px 20px rgba(0,0,0,0.4)',
        }}
      >
        <Box className="weather-header" sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'white' }}>
            Weather Forecast
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Get real-time weather updates
          </Typography>
        </Box>

        <SearchBox updateInfo={updateInfo} loading={loading} />

        <UnitToggle unit={unit} setUnit={setUnit} />

        {/* Flash Error Box */}
        {error && (
          <Fade in={!!error}>
            <Box
              sx={{
                mt: 2,
                mb: 3,
                px: 3,
                py: 2,
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: 2,
                color: '#ffffff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontWeight: 500,
              }}
            >
              <Typography sx={{ flexGrow: 1 }}>{error}</Typography>
              <Box
                component="button"
                onClick={() => updateInfo({ city: '', resetError: true })}
                sx={{
                  ml: 2,
                  background: 'none',
                  border: 'none',
                  color: '#f87171',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#fb7185',
                  },
                }}
              >
                ×
              </Box>
            </Box>
          </Fade>
        )}

        {/* Recent Cities + Clear Button */}
        {recentCities.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              alignItems: 'center',
              mb: 3,
              gap: 1,
            }}
          >
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {recentCities.map((city, index) => (
                <Chip
                  key={index}
                  label={city}
                  clickable
                  color="secondary"
                  onClick={() => updateInfo({ city })}
                  sx={{ backgroundColor: '#334155', color: 'white' , 
                    '&:hover': {
                  transform: 'scale(1.05)',
                  backgroundColor:'#334155',
                },}}
                />
              ))}
            </Box>
            <Button
              size="small"
              onClick={clearRecentCities}
              sx={{
                color: 'white',
                border: '1px solid #334155',
                height: '32px',
                px: 2,
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              Clear History
            </Button>
          </Box>
        )}

        {loading && <CircularProgress sx={{ my: 4 }} />}

        {weatherInfo && (
          <>
            <InfoBox info={weatherInfo} unit={unit} />
            {aqi && <AQIBox aqi={aqi} />}
          
           
            {forecast && <ForecastBox forecast={forecast} unit={unit} />}
            {hourly.length > 0 && <HourlyForecast hours={hourly} unit={unit} />}

          </>
        )}
      </Box>
    </Box>
  );
}
