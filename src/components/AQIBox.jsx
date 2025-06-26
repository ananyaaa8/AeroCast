import { Box, Typography, Chip } from '@mui/material';

const AQI_LEVELS = [
  { level: 1, label: 'Good', color: '#22c55e', advice: 'Air quality is good.' },
  { level: 2, label: 'Fair', color: '#84cc16', advice: 'Air quality is acceptable.' },
  { level: 3, label: 'Moderate', color: '#facc15', advice: 'Sensitive groups should reduce outdoor activities.' },
  { level: 4, label: 'Poor', color: '#f97316', advice: 'Limit outdoor exposure.' },
  { level: 5, label: 'Very Poor', color: '#ef4444', advice: 'Avoid outdoor activities.' },
];

export default function AQIBox({ aqi }) {
  if (!aqi) return null;

  const level = AQI_LEVELS.find(l => l.level === aqi.main.aqi) || AQI_LEVELS[2];

  return (
    <Box
      sx={{
        mt: 4,
        p: 2,
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.05)',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Typography variant="h6">Air Quality Index</Typography>
      <Chip
        label={level.label}
        sx={{
          backgroundColor: level.color,
          color: 'white',
          my: 1,
          fontWeight: 'bold',
          fontSize: '1rem',
        }}
      />
      <Typography variant="body2" sx={{ color: '#ccc' }}>
        {level.advice}
      </Typography>
    </Box>
  );
}
