import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Typography, Grid, Button } from "@mui/material";
import { Socket } from "socket.io-client";
import * as yup from "yup";
import { useState } from "react";

// Define the data type for the form
type FormData = {
  operation_name: string;
  value_a: number;
  value_b: number;
};

type DataFormProps = {
  socket: Socket;
};

// Define the validation schema
const schema = yup.object().shape({
  operation_name: yup.string().required(),
  value_a: yup.number().required(),
  value_b: yup.number().required(),
});

const DataForm = ({ socket }: DataFormProps) => {
  const [dataRequest, setDataRequest] = useState(false);
  const [runScript, setRunScript] = useState(false);

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

  return (
    <>
      <div style={{ height: "45vh", width: "100%" }}>
        <Typography variant="h6" component="h2">
          Form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3} style={{ padding: "2rem" }}>
            <Grid item xs={12} md={6}>
              <Controller
                name="operation_name"
                control={control}
                defaultValue="abckjxk_aiqow"
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Operation Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors.operation_name}
                    helperText={errors?.operation_name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register("value_a")}
                label="Value A"
                variant="outlined"
                fullWidth
                error={!!errors.value_a}
                helperText={errors?.value_a?.message}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained">
            Submit
          </Button>
          <Button
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
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={() => {
              runScript
                ? socket.emit("kill_script")
                : socket.emit("launch_script");
              setRunScript(!runScript);
            }}
            style={{ marginLeft: "1rem" }}
          >
            {runScript ? "Kill Script" : "Launch Script"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default DataForm;
