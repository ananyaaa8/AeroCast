// import { 
//   Card, 
//   CardContent, 
//   Typography, 
//   Box, 
//   Divider,
//   Chip
// } from '@mui/material';
// import { styled } from '@mui/system';
// import WeatherIcon from './WeatherIcon';

// const WeatherCard = styled(Card)({
//   background: 'linear-gradient(145deg, rgba(71, 77, 95, 0.97) 0%, rgba(26, 76, 184, 0.3) 100%)',
//   border: '1px solid rgba(10, 25, 47, 0.2)',
//   boxShadow: '0 8px 32px rgba(10, 25, 47, 0.15)',
//   borderRadius: '16px',
//   overflow: 'hidden',
// });

// const WeatherDetail = styled(Box)({
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   margin: '0.5rem 0',
// });

// export default function InfoBox({ info, unit }) {
//   if (!info) return null;

//   const formatTime = (date) => {
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <WeatherCard>
//       <CardContent>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//           <Box>
//             <Typography variant="h4" component="div" gutterBottom>
//               {info.city}, {info.country}
//             </Typography>
//             <Typography variant="subtitle1" color="text.secondary">
//               {new Date().toLocaleDateString('en-US', { 
//                 weekday: 'long', 
//                 year: 'numeric', 
//                 month: 'long', 
//                 day: 'numeric' 
//               })}
//             </Typography>
//           </Box>
//           <Box sx={{ textAlign: 'center' }}>
//             <WeatherIcon code={info.icon} size={64} />
//             <Typography variant="h6" color="text.secondary">
//               {info.weatherDesc}
//             </Typography>
//           </Box>
//         </Box>

//         <Box sx={{ textAlign: 'center', my: 3 }}>
//           <Typography variant="h2" component="div">
//             {Math.round(info.temp)}°{unit === 'metric' ? 'C' : 'F'}
//           </Typography>
//           <Typography variant="subtitle1" color="text.secondary">
//             Feels like: {Math.round(info.feelsLike)}°{unit === 'metric' ? 'C' : 'F'}
//           </Typography>
//         </Box>

//         <Divider sx={{ my: 2 }} />

//         <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
//           <WeatherDetail>
//             <Typography variant="body1">Min Temperature:</Typography>
//             <Chip 
//               label={`${Math.round(info.tempMin)}°${unit === 'metric' ? 'C' : 'F'}`} 
//               color="primary" 
//             />
//           </WeatherDetail>

//           <WeatherDetail>
//             <Typography variant="body1">Max Temperature:</Typography>
//             <Chip 
//               label={`${Math.round(info.tempMax)}°${unit === 'metric' ? 'C' : 'F'}`} 
//               color="secondary" 
//             />
//           </WeatherDetail>

//           <WeatherDetail>
//             <Typography variant="body1">Humidity:</Typography>
//             <Chip label={`${info.humidity}%`} />
//           </WeatherDetail>

//           <WeatherDetail>
//             <Typography variant="body1">Wind Speed:</Typography>
//             <Chip 
//               label={`${info.windSpeed} ${unit === 'metric' ? 'm/s' : 'mph'}`} 
//             />
//           </WeatherDetail>

//           <WeatherDetail>
//             <Typography variant="body1">Pressure:</Typography>
//             <Chip label={`${info.pressure} hPa`} />
//           </WeatherDetail>

//           <WeatherDetail>
//             <Typography variant="body1">Visibility:</Typography>
//             <Chip label={`${info.visibility} km`} />
//           </WeatherDetail>

//           <WeatherDetail>
//             <Typography variant="body1">Sunrise:</Typography>
//             <Chip label={formatTime(info.sunrise)} color="warning" />
//           </WeatherDetail>

//           <WeatherDetail>
//             <Typography variant="body1">Sunset:</Typography>
//             <Chip label={formatTime(info.sunset)} color="warning" />
//           </WeatherDetail>
//         </Box>
//       </CardContent>
//     </WeatherCard>
//   );
// }

// import { useState, useEffect } from 'react';
// import { Box, Typography, Chip, Grid } from '@mui/material';
// import { styled } from '@mui/system';

// const CardContainer = styled(Box)({
//   perspective: '1000px',
//   width: '100%',
//   maxWidth: 320,
//   margin: '0 auto',
//   cursor: 'pointer',
// });

// const FlipCard = styled(Box)(({ flipped }) => ({
//   position: 'relative',
//   width: '100%',
//   height: 'auto',
//   transformStyle: 'preserve-3d',
//   transition: 'transform 0.8s',
//   transform: flipped ? 'rotateY(180deg)' : 'none',
// }));

// const CardFace = styled(Box)(({ back }) => ({
//   position: 'absolute',
//   width: '100%',
//   backfaceVisibility: 'hidden',
//   padding: '1rem',
//   borderRadius: '12px',
//   backgroundColor: 'rgba(255, 255, 255, 0.05)',
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '1rem',
//   ...(back && {
//     transform: 'rotateY(180deg)',
//   }),
// }));

// export default function InfoBox({ info, unit }) {
//   const [flipped, setFlipped] = useState(false);
//   const tempUnit = unit === 'metric' ? '°C' : '°F';

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFlipped((prev) => !prev);
//     }, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   if (!info) return null;

//   return (
//     <Box sx={{ my: 4, px: 2 }}>
//       {/* Top Card (Section 1) */}
//       <Box
//         sx={{
//           background: 'linear-gradient(to right,rgb(33, 71, 114),rgb(1, 7, 16))',
//           color: 'white',
//           borderRadius: '12px 12px 12px 12px',
//           px: 3,
//           py: 2,
//           mt: 1,
//           mb: -20,

//         }}
//       >
//         <Typography variant="h5">{info.city}, {info.country}</Typography>
//         <Typography variant="subtitle2">
//           {new Date().toLocaleDateString(undefined, {
//             weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
//           })}
//         </Typography>

//         <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <Typography variant="h2">{Math.round(info.temp)}{tempUnit}</Typography>
//           <Typography sx={{ opacity: 0.7 }}>{info.weatherDesc}</Typography>
//         </Box>
//         <Typography sx={{ mt: -1, opacity: 0.6 }}>
//           Feels like: {Math.round(info.feelsLike)}{tempUnit}
//         </Typography>
//       </Box>

//       {/* Flip Card Section (2 & 3) */}
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: 340,
//           position: 'relative',
//           mt: 5,
//           mb: 2,
//           width: { xs: '100%', sm: '450px' }
//         }}
//       >
//         <CardContainer onClick={() => setFlipped(prev => !prev)}>
//           <FlipCard flipped={flipped}>
//             {/* Section 2 - Front */}
//             <CardFace>
//               <Grid container direction="column" spacing={2}>
//                 <Grid item>
//                   <Typography variant="body2" color="white">Min Temperature</Typography>
//                   <Chip label={`${Math.round(info.tempMin)}${tempUnit}`} />
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="body2" color="white">Humidity</Typography>
//                   <Chip label={`${info.humidity}%`} />
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="body2" color="white">Pressure</Typography>
//                   <Chip label={`${info.pressure} hPa`} />
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="body2" color="white">Sunrise</Typography>
//                   <Chip
//                     label={info.sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     sx={{ backgroundColor: '#facc15', color: 'black' }}
//                   />
//                 </Grid>
//               </Grid>
//             </CardFace>

//             {/* Section 3 - Back */}
//             <CardFace back>
//               <Grid container direction="column" spacing={2}>
//                 <Grid item>
//                   <Typography variant="body2" color="white">Max Temperature</Typography>
//                   <Chip label={`${Math.round(info.tempMax)}${tempUnit}`} sx={{ backgroundColor: '#7c3aed', color: 'white' }} />
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="body2" color="white">Wind Speed</Typography>
//                   <Chip label={`${info.windSpeed} m/s`} />
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="body2" color="white">Visibility</Typography>
//                   <Chip label={`${info.visibility} km`} />
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="body2" color="white">Sunset</Typography>
//                   <Chip
//                     label={info.sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     sx={{ backgroundColor: '#facc15', color: 'black' }}
//                   />
//                 </Grid>
//               </Grid>
//             </CardFace>
//           </FlipCard>
//         </CardContainer>
//       </Box>

//       <Typography variant="caption" sx={{ mt: -4, display: 'block', textAlign: 'center', color: '#888' }}>
      
//       </Typography>
//     </Box>
//   );
// }


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
  minHeight: '260px',
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
      <CardContainer onClick={() => setFlipped(f => !f)} sx={{mt:7 }}>
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
                sx={{ fontSize: '1rem', px: 2, py: 1,
                  
                 }}
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
