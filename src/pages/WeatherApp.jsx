
import { useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Chip,
  Button,
  Stack,
} from '@mui/material';

import InfoBox from '../components/InfoBox';
import SearchBox from '../components/SearchBox';
import ForecastBox from '../components/ForecastBox';
import UnitToggle from '../components/UnitToggle';
import { useWeather } from '../hooks/useWeather';

export default function WeatherApp() {
  const [unit, setUnit] = useState('metric');

  const {
    weatherInfo,
    forecast,
    hourly,
    loading,
    error,
    updateInfo,
    recentCities,
  } = useWeather('New Delhi', unit);

  const clearHistory = () => {
    localStorage.removeItem('weather_history');
    window.location.reload();
  };

  return (
    <Box
      className="weather-app"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#1e293b',
        px: 2,
        py: 4,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 800,
          backgroundColor: '#27374D',
          borderRadius: 3,
          p: 3,
        }}
      >
        {/* Header */}
        <Box className="weather-header" sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h3"       
            color="white"
            gutterBottom
            sx={{ fontWeight: 700 }}>
            Weather Forecast
          </Typography>
          <Typography variant="subtitle1" color="gray">
            Get real-time weather updates
          </Typography>
        </Box>

        {/* Search Box */}
        <SearchBox updateInfo={updateInfo} loading={loading} />

        {/* Unit Toggle */}
        <UnitToggle unit={unit} setUnit={setUnit} />

        {/* Recent Cities + Clear Button */}
        {recentCities.length > 0 && (
          <Box sx={{ mt: 2, mb: 2 }}>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              alignItems="center"
            >
              {recentCities.map((city, index) => (
                <Chip
                  key={index}
                  label={city}
                  clickable
                  onClick={() => updateInfo({ city })}
                  sx={{
                    backgroundColor: '#2f3e4e',
                    color: '#f5f7fa',
                    '&:hover': { backgroundColor: '#425F7B' },
                  }}
                />
              ))}
              <Box sx={{ flexGrow: 1 }} />
              <Button
                size="small"
                variant="contained"
                onClick={clearHistory}
                sx={{
                  backgroundColor: '#425F7B',
                  color: '#f5f7fa',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#3a4e67' },
                }}
              >
                Clear History
              </Button>
            </Stack>
          </Box>
        )}

        {/* Loading Spinner */}
        {loading && <CircularProgress sx={{ my: 4 }} />}

        {/* Error Message */}
        {error && (
          <Typography color="error" sx={{ my: 2 }}>
            {error}
          </Typography>
        )}

        {/* Weather Info + Forecast */}
        {weatherInfo && (
          <>
            <InfoBox info={weatherInfo} unit={unit} />
            {forecast && <ForecastBox forecast={forecast} unit={unit}  />}
          </>
        )}
      </Box>
    </Box>
  );
}


