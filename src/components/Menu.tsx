import { Button, Box, Grid, Typography } from '@mui/material';
import { PrecisionManufacturingTwoTone, AccessAlarm, BarChart, Info, Settings } from '@mui/icons-material';

import {Link} from 'react-router-dom';





const features = [
  {
    icon: <AccessAlarm fontSize="large" />,
    name: 'Chart',
    color: '#2196F3', // Couleur de votre choix
    path: '/chart',
  },
  {
    icon: <BarChart fontSize="large" />,
    name: 'Model',
    color: '#FF5722', // Couleur de votre choix
    path: '/model',
  },
  {
    icon: <Info fontSize="large" />,
    name: 'Infos',
    color: '#4CAF50', // Couleur de votre choix
    path: '/infos',
  },
  {
    icon: <Settings fontSize="large" />,
    name: 'Params',
    color: '#FFC107', // Couleur de votre choix
    path: '/config',
  },
];
export default function Menu() {    
  return(
  <Box>
    <Grid style={{ display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'}}>
        <PrecisionManufacturingTwoTone sx={{ fontSize: 100, paddingTop: 10}} />
    </Grid>
    <Grid container style={{ display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh'}}>
      {features.map((feature, index) => (
        <Grid item key={index}>
          <Link to={feature.path} style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            style={{ 
              width: '200px',
              height: '200px',
              margin: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: feature.color,
          }}
          >
            {feature.icon}
            <Typography variant="h6">{feature.name}</Typography>
          </Button>
          </Link>
        </Grid>
      ))}
    </Grid>
  </Box>
  );
}