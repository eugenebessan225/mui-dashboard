// Navbar.js
import {Grid, Button} from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useState } from "react";
import axios from "axios";


export default function Launch() {

  const [serverState, setServerState] = useState(false);

  const handlePower = () => {
    //const api_path =  serverState ? " http://192.168.1.85:5005/offsshserver" : " http://192.168.1.85:5005/sshserver"
    //const api_path =  serverState ? "http://172.20.10.2:5005/offsshserver" : "http://172.20.10.2:5005/sshserver"
    const api_path =  serverState ? " http://192.168.1.122:5005/offsshserver" : " http://192.168.1.122:5005/sshserver"  // Au labo
    try {
      console.log("clicked");
      axios.get(api_path);
      setServerState(!serverState) 
      console.log(serverState);
    } catch (error) {
      console.error('Erreur lors de la requête API', error);
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

