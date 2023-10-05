import {Grid, Typography, InputLabel, Button,} from "@mui/material";
import { PowerSettingsNew, Check, Close} from '@mui/icons-material';
import { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";

import axios from "axios"; // Importez Axios ou la bibliothèque que vous utilisez pour les requêtes HTTP



//const model_names = ["Model A", "Model B", "Model C", "Model D"];

const ModelOutput = () => {
  const [model, setModel] = useState([]);
  const [selmodel, setselModel] = useState("");
  const [etat, setEtat] = useState("RAS")

  const onChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setselModel(typeof value === "string" ? value : "");
  };

  // useEffect(() => {
  //   // Effect pour effectuer une requête API lorsque le modèle est sélectionné  
  //     axios.get("http://192.168.1.122:5005/model")
  //       .then((response) => {
  //         console.log(response.data);
  //         setModel(response.data); // Mettez à jour l'état avec les données de la réponse de l'API          
  //       })
  //       .catch((error) => {
  //         console.error("Erreur lors de la requête API :", error);
  //       });
  // }, []); 
  

  // const handleDiagReq = () => {
  //   // Remplacez 'URL_DE_VOTRE_API' par l'URL de votre API
  //   const apiUrl = "http://192.168.1.122:5005/get_predictions";

    // Utilisez Axios pour effectuer la requête GET
    
  //   axios.get(apiUrl)
  //     .then(response => {
  //       // Mettez à jour l'état avec la réponse de l'API
  //       console.log(response.data);
  //       setEtat(response.data.value === 1 ? "Usé" : "RAS");
  //     })
  //     .catch(error => {
  //       console.error('Erreur lors de la requête API :', error);
  //     });
  // };

  return (
    
      <div>
        <Typography>Model Output</Typography>
        <Grid container spacing={2} style={{ padding: "2rem"}}>
          {/* <Grid item xs={12} md={12}>
            <InputLabel id="model-select-label">Model</InputLabel>
            <Select
              labelId="model-select-label"
              id="model-select"
              value={selmodel}
              onChange={onChange}
              style={{ width: "100%" }}
            >
              <MenuItem value={model.model}>{model.model}</MenuItem>
            </Select>
          </Grid> */}
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
            }}>
                <Close /> {/* Icône "Cancel" (X) */}
              </Button>
              <Button variant="contained" style={{
              backgroundColor: 'green',
              color: 'white',
              marginRight: '10px',
            }}>
                <Check /> {/* Icône "Cancel" (X) */}
              </Button>
              
            </Grid>
        </Grid>
      </div>
  
  );
};

export default ModelOutput;
