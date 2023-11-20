import {Grid, Typography, Button,} from "@mui/material";
import {Check, Close} from '@mui/icons-material';
import axios from "axios";
//import { useState } from "react";



//const model_names = ["Model A", "Model B", "Model C", "Model D"];

const ModelOutput = () => {
  const etat = "RAS"

  const sender = (value: number) => {
    const api_path = " http://192.168.1.113:5005/"
    try {
      console.log(value);
      
      axios.get(api_path, { params: { value } })
        .then((response) => {
          // Gérer la réponse de l'API si nécessaire
          console.log(response.data);
        })
    } catch (error) {
      console.error('Erreur lors de la requête API', error);
    }  
  }

  return (
    
      <div>
        <Typography>Model Output</Typography>
        <Grid container spacing={2} style={{ padding: "2rem"}}>
          <Grid item xs={6} md={6}>
            <Typography>Etat Outils : </Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography>{etat}</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography>
              Evaluer Sortie : 
            </Typography>
          </Grid>
            <Grid item xs={6} md={6}>
              <Button variant="contained" style={{
              backgroundColor: 'red',
              color: 'white',
              marginRight: '10px',
            }} onClick={() => sender(0)}>
                <Close /> 
              </Button>
              <Button variant="contained" style={{
              backgroundColor: 'green',
              color: 'white',
              marginRight: '10px',
            }} onClick={() => sender(1)}>
                <Check /> 
              </Button>
              
            </Grid>
        </Grid>
      </div>
  
  );
};

export default ModelOutput;
