import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Typography, Grid, Button } from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { Socket } from "socket.io-client";
import * as yup from "yup";
import { useState } from "react";
// import axios from "axios"; // Importez Axios ou la bibliothèque que vous utilisez pour les requêtes HTTP


// Define the data type for the form
type FormData = {
  observation: string;
};

type DataFormProps = {
  socket: Socket;
};

// Define the validation schema
const schema = yup.object().shape({
  observatio: yup.string().required(),
});

const DataForm = ({ socket }: DataFormProps) => {
  const [dataRequest, setDataRequest] = useState(false);
  // const [serverStatus, setServerStatus] = useState(false); // État initial du serveur

  // Deconstruction of the useForm hook
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    // include yup resolver into useForm hook
    resolver: yupResolver(schema),
  });

  // Handle the form submission
  const onSubmit: SubmitHandler<FormData> = (data: FormData) =>
    console.log(data);

    // const handleLaunchServer = async () => {
    
    //   try {
    //     // Faites une requête à l'API Flask
    //     const api_path = "http://192.168.1.122:5005/sshserver"
    //     const response = await axios.get(api_path); // Remplacez l'URL par votre URL d'API
    //     console.log(response);
    //     setServerStatus(!serverStatus);
        
    //   } catch (error) {
    //     console.error('Erreur lors de la requête API', error);
    //   }
    // }

  

  return (
      <div style={{width: "100%" }}>
        <Typography>
          Form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3} style={{ padding: "2rem" }}>
            <Grid item xs={12} md={6}>
              <Controller
                name="observation"
                control={control}
                defaultValue="abckjxk_aiqow"
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Observation"
                    variant="outlined"
                    fullWidth
                    error={!!errors.observation}
                    helperText={errors?.observation?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button type="submit" variant="contained">
              Submit
              </Button>
            </Grid>
            <Grid item xs={6} md={6}>
            <Typography>
              Evaluer Opération : 
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
          
          {/* <Button
            type="button"
            variant="outlined"
            onClick={handleLaunchServer}
            style={{ marginLeft: "1rem" }}
          >
            {serverStatus ? "stop Server" : "Launch Server"}
          </Button> */}
          {/* <Button
            type="button"
            variant="outlined"
            onClick={() => {
              dataRequest
                ? socket.emit("data_request_stop")
                : socket.emit("data_request");
              setDataRequest(!dataRequest);
            }}
            style={{ marginLeft: "1rem" }}
          >
            {dataRequest ? "Stop Data Request" : "Start Data Request"}
          </Button> */}
        </form>
      </div>
  );
};

export default DataForm;
