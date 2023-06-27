import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Typography, Grid, Button } from "@mui/material";
import * as yup from "yup";

// Define the data type for the form
type FormData = {
  operation_name: string;
  value_a: number;
  value_b: number;
};

// Define the validation schema
const schema = yup.object().shape({
  operation_name: yup.string().required(),
  value_a: yup.number().required(),
  value_b: yup.number().required(),
});

const DataForm = () => {
  // Destruction of the useForm hook
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
        </form>
      </div>
    </>
  );
};

export default DataForm;
