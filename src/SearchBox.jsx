import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';

export default function SearchBox({ updateInfo, loading }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  const handleInput = (event) => {
    setCity(event.target.value);
    setError(false);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!city.trim()) return;

      await updateInfo({ city: city.trim() });
      setCity("");
    } catch {
      setError(true);
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            // Reverse geocoding to get city name from coordinates
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=16b884b5af62e365883093d16103a51e`
            );
            const data = await response.json();
            if (data && data.length > 0) {
              updateInfo({ city: data[0].name });
            }
          } catch (err) {
            setError(true);
          }
        },
        (err) => {
          setError(true);
        }
      );
    } else {
      setError(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Search by city name"
        value={city}
        onChange={handleInput}
        disabled={loading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleLocationClick}
                edge="end"
                disabled={loading}
              >
                <MyLocationIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#1976d2',
            },
            '&:hover fieldset': {
              borderColor: '#42a5f5',
            },
          },
        }}
      // ... other props
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading || !city.trim()}
        startIcon={<SearchIcon />}
      >
        {loading ? 'Searching...' : 'Get Weather'}
      </Button>

      {error && (
        <Box sx={{
          color: 'error.main',
          mt: 1,
          p: 1,
          backgroundColor: 'error.light',
          borderRadius: 1
        }}>
          No such place found or location access denied!
        </Box>
      )}
    </Box>
  );
}
