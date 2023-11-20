// Navbar.js
import {Grid, Button} from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useEffect, useState } from "react";
import axios from "axios";


export default function Launch() {

  const [serverState, setServerState] = useState(false);

  useEffect(() => {
    axios.get('http://159.84.130.84:4000/')
      .then(response => {
        setServerState(response.data.serverState);
      })
      .catch(error => {
        console.error('Erreur de chargement de l\'état du bouton', error);
      });
  }, []);

  const handlePower = () => {

    const api_path =  serverState ? " http://159.84.130.84:5005/offsshserver" : " http://159.84.130.84:5005/sshserver"  // Au labo
    try {
      console.log("clicked");
      axios.get(api_path);
      const newServerState = !serverState;
      setServerState(newServerState);
      axios.put('http://159.84.130.84:4000/', { serverState: newServerState })
      .then(() => {
        setServerState(newServerState);
      })
      .catch(error => {
        console.error('Erreur de mise à jour de l\'état du bouton', error);
      });    
  } catch (error) {
    //   console.error('Erreur lors de la requête API', error);
    }  
  }

  return (
    <Grid item xs={12} md={12} style={{ display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'}}>
        <Button type="submit" variant="contained" style={{display: 'flex',
          alignItems: 'center',
          backgroundColor: serverState ? "red" : "green",
        }} onClick={handlePower}>
        <PowerSettingsNewIcon />
        Lancer
        </Button>
  </Grid>
  );
}

