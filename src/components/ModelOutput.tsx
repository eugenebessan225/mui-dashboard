import {
  Card,
  Grid,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

const model_names = ["Model A", "Model B", "Model C", "Model D"];

const ModelOutput = () => {
  const [model, setModel] = useState("");

  const onChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setModel(typeof value === "string" ? value : "");
    console.log(model);
  };

  return (
    <>
      <div style={{ height: "45vh", width: "100%" }}>
        <Typography>Model Output</Typography>

        <Grid container spacing={2} style={{ padding: "2rem" }}>
          <Grid item xs={12} md={12}>
            <InputLabel id="model-select-label">Model</InputLabel>
            <Select
              labelId="model-select-label"
              id="model-select"
              value={model}
              onChange={onChange}
              style={{ width: "100%" }}
            >
              {model_names.map((model_name) => (
                <MenuItem value={model_name}>{model_name}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <Typography variant="h6" component="h2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <Typography variant="h6" component="h2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ModelOutput;
