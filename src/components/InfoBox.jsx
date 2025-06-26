
import { useState, useEffect } from 'react';
import { Box, Typography, Chip, Grid, Button } from '@mui/material';
import { styled } from '@mui/system';

const CardContainer = styled(Box)({
  perspective: '1000px',
  width: '100%',
  maxWidth: 600,
  margin: '0 auto',
  cursor: 'pointer',
  marginTop: '1rem',
});

const FlipCard = styled(Box)(({ flipped }) => ({
  position: 'relative',
  width: '100%',
  transformStyle: 'preserve-3d',
  transition: 'transform 1s',
  transform: flipped ? 'rotateY(180deg)' : 'none',
  minHeight: '180px',
}));

const CardFace = styled(Box)(({ back }) => ({
  position: 'absolute',
  width: '100%',
  backfaceVisibility: 'hidden',
  padding: '1.5rem',
  borderRadius: '12px',
  backgroundColor: '#425F7B',
  color: 'white',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '2rem',
  flexWrap: 'wrap',
  ...(back && {
    transform: 'rotateY(180deg)',
    position: 'absolute',
  }),
}));

export default function InfoBox({ info, unit }) {
  const [flipped, setFlipped] = useState(false);
  const tempUnit = unit === 'metric' ? '°C' : '°F';

  // Auto flip every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped(prev => !prev);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ my: 2, px: 2 }}>
      {/* SECTION 1 */}
      <Box
        sx={{
          background: 'linear-gradient(to right, #64748b,rgb(3, 20, 43))',
          color: 'white',
          borderRadius: '12px',
          px: 3,
          py: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          {info.city}, {info.country}
        </Typography>
        <Typography variant="body2">
          {new Date().toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Typography>
        <Box
          sx={{
            mt: 2,
            mb:5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            {Math.round(info.temp)}{tempUnit}
          </Typography>
          <Typography sx={{ fontStyle: 'italic', opacity: 0.8 }}>
            {info.weatherDesc}
          </Typography>
           
        </Box>
        <Typography sx={{ opacity: 0.7, mt: 1 }}>
          Feels like: {Math.round(info.feelsLike)}{tempUnit}
        </Typography>
      </Box>

      {/* SECTION 2 & 3 - FLIP CARD */}
      <CardContainer onClick={() => setFlipped(f => !f)} >
        <FlipCard flipped={flipped}>
          {/* FRONT */}
          <CardFace sx={{ background: 'linear-gradient(to right,rgb(39, 60, 89),rgb(3, 20, 43))',}}>
            <Box>
              <Typography variant="subtitle1">Min Temp:</Typography>
              <Chip
                label={`${Math.round(info.tempMin)}${tempUnit}`}
                sx={{ fontSize: '1rem', px: 2, py: 1,}}
              />

              <Typography mt={2} variant="subtitle1">Pressure:</Typography>
              <Chip
                label={`${info.pressure} hPa`}
                sx={{ fontSize: '1rem', px: 2, py: 1 }}
              />
            </Box>

            <Box>
              <Typography variant="subtitle1">Humidity:</Typography>
              <Chip
                label={`${info.humidity}%`}
                sx={{ fontSize: '1rem', px: 2, py: 1 }}
              />

              <Typography mt={2} variant="subtitle1">Sunrise:</Typography>
              <Chip
                label={info.sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                sx={{ backgroundColor: '#facc15', color: 'black', fontSize: '1rem', px: 2, py: 1 }}
              />
            </Box>
          </CardFace>

          {/* BACK */}
          <CardFace back sx={{ background: 'linear-gradient(to right,rgb(39, 60, 89),rgb(3, 20, 43))',}}>
            <Box>
              <Typography variant="subtitle1">Max Temp:</Typography>
              <Chip
                label={`${Math.round(info.tempMax)}${tempUnit}`}
                sx={{ fontSize: '1rem', px: 2, py: 1}}
              />

              <Typography mt={2} variant="subtitle1">Visibility:</Typography>
              <Chip
                label={`${info.visibility} km`}
                sx={{ fontSize: '1rem', px: 2, py: 1 }}
              />
            </Box>

            <Box>
              <Typography variant="subtitle1">Wind Speed:</Typography>
              <Chip
                label={`${info.windSpeed} m/s`}
                sx={{ fontSize: '1rem', px: 2, py: 1 }}
              />

              <Typography mt={2} variant="subtitle1">Sunset:</Typography>
              <Chip
                label={info.sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                sx={{ backgroundColor: '#facc15', color: 'black', fontSize: '1rem', px: 2, py: 1 }}
              />
            </Box>
          </CardFace>
        </FlipCard>
      </CardContainer>

      <Typography
        variant="caption"
        sx={{ mt: 1, display: 'block', textAlign: 'center', color: '#cbd5e1' }}
      >

      </Typography>
    </Box>
  );
}
