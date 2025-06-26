import { useState } from 'react';
import { Box, InputBase, IconButton, Paper, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';

export default function SearchBox({ updateInfo, loading }) {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim()) {
      updateInfo({ city });
      setCity('');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant="body2"
        sx={{ color: '#ccc', mb: 1 }}
      >
        Search by city name
      </Typography>

      <Paper
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        sx={{
          p: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          bgcolor: '#2c2c3a',
          borderRadius: 2,
          border: '1px solid #425F7B',
        }}
      >
        <SearchIcon sx={{ color: '#bbb', mr: 1 }} />
        <InputBase
          sx={{
            flex: 1,
            color: 'white',
            '&::placeholder': {
              color: '#aaa',
            },
          }}
          placeholder="Type city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <IconButton type="submit" disabled={loading}>
          <MyLocationIcon sx={{ color: '#bbb' }} />
        </IconButton>
      </Paper>

      <Button
        variant="contained"
        type="submit"
        disabled={loading}
        onClick={handleSearch}
        sx={{
          mt: 2,
          bgcolor: '#425F7B',
          '&:hover': { bgcolor: '#133E67' },
          color: 'white',
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 'bold',
          width: '100%',
        }}
      >
        <SearchIcon sx={{ mr: 1 }} />
        Get Weather
      </Button>
    </Box>
  );
}
