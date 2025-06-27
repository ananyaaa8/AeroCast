import { Box, Switch, Typography, Stack } from '@mui/material';

export default function UnitToggle({ unit, setUnit }) {
  const isMetric = unit === 'metric';

  return (
    <Stack direction="row" alignItems="center" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
      <Typography variant="body1" color="text.secondary">°F</Typography>
      <Switch
        checked={isMetric}
        onChange={() => setUnit(isMetric ? 'imperial' : 'metric')}
        sx={{
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#B0BFCD',
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#888',
          },
          '& .MuiSwitch-track': {
            backgroundColor: '#888', 
          },
        }}
      />
      <Typography variant="body1" color="text.secondary">°C</Typography>
    </Stack>
  );
}
