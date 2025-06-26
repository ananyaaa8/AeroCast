import { Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button 
        variant="contained" 
        component={Link} 
        to="/"
        size="large"
      >
        Go to Home
      </Button>
    </Container>
  )
}