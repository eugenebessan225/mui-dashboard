import { Button, Box, Grid, Typography } from '@mui/material';
import {AccessAlarm, BarChart, Info, Settings } from '@mui/icons-material';

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
    <Grid container style={{ display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '20vh'}}>
      {features.map((feature, index) => (
        <Grid item key={index}>
          <Link to={feature.path} style={{ textDecoration: 'none' }}>
          <Button
              variant="contained"
              style={{
                width: '150px',
                height: '50px',
                margin: 10,
                display: 'flex',
                flexDirection: 'row', // Mettez en ligne l'icône et le texte
                justifyContent: 'space-between', // Espace entre l'icône et le texte
                alignItems: 'center', // Centre les éléments verticalement
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