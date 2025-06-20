import {
  Box,
  Typography,
  Container,
  Grid,
  Stack,
  Divider
} from '@mui/material';
import {
  Button,
  IconButton,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
  Fab,
  Chip,
  Badge
} from '@mui/material';
import {
  Delete,
  Alarm,
  Send,
  Favorite,
  Add,
  Notifications,
  Settings
} from '@mui/icons-material';
import { useState } from 'react';

export default function ComponentShowcase() {
  const [alignment, setAlignment] = useState('left');
  const [selected, setSelected] = useState(false);

  const handleAlignment = (_, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Material-UI Component Library
      </Typography>
      <Typography color="text.secondary" paragraph>
        A reference of commonly used components
      </Typography>
      <Divider sx={{ my: 3 }} />

      {/* Buttons Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Buttons
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Variants
            </Typography>
            <Stack spacing={2} direction="row" flexWrap="wrap">
              <Button variant="text">Text</Button>
              <Button variant="contained">Contained</Button>
              <Button variant="outlined">Outlined</Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Colors
            </Typography>
            <Stack spacing={2} direction="row" flexWrap="wrap">
              <Button color="primary">Primary</Button>
              <Button color="secondary">Secondary</Button>
              <Button color="success" variant="contained">Success</Button>
              <Button color="error" variant="outlined">Error</Button>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              With Icons
            </Typography>
            <Stack spacing={2} direction="row" flexWrap="wrap">
              <Button
                variant="contained"
                startIcon={<Send />}
              >
                Send
              </Button>
              <Button
                variant="outlined"
                endIcon={<Delete />}
              >
                Delete
              </Button>
              <Fab color="primary" size="small">
                <Add />
              </Fab>
              <Fab color="secondary">
                <Favorite />
              </Fab>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* Icon Buttons */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Icon Buttons
        </Typography>
        <Stack spacing={2} direction="row">
          <IconButton aria-label="delete" color="primary">
            <Delete />
          </IconButton>
          <IconButton aria-label="alarm" color="secondary">
            <Alarm />
          </IconButton>
          <Badge badgeContent={4} color="error">
            <IconButton aria-label="notifications">
              <Notifications />
            </IconButton>
          </Badge>
          <IconButton
            aria-label="settings"
            color={selected ? 'primary' : 'default'}
            onClick={() => setSelected(!selected)}
          >
            <Settings />
          </IconButton>
        </Stack>
      </Box>

      {/* Button Groups */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Button Groups
        </Typography>
        <Stack spacing={4} direction="row" flexWrap="wrap">
          <ButtonGroup variant="contained">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>

          <ButtonGroup variant="outlined" color="secondary">
            <Button>Left</Button>
            <Button>Center</Button>
            <Button>Right</Button>
          </ButtonGroup>

          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
          >
            <ToggleButton value="left" aria-label="left aligned">
              Left
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              Center
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
              Right
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Box>

      {/* Chips */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Chips
        </Typography>
        <Stack spacing={2} direction="row" flexWrap="wrap">
          <Chip label="Basic" />
          <Chip label="Primary" color="primary" />
          <Chip label="Success" color="success" variant="outlined" />
          <Chip
            label="Clickable"
            color="secondary"
            onClick={() => alert('Clicked!')}
          />
          <Chip
            label="Deletable"
            onDelete={() => alert('Deleted!')}
          />
        </Stack>
      </Box>

      <Typography variant="body2" color="text.secondary" mt={4}>
        This is a reference page for common Material-UI components.
        Use it as a playground to test UI elements.
      </Typography>
    </Container>
  );
}
