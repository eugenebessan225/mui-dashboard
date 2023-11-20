import { Grid, Paper } from "@mui/material";
import Chart from "./Chart";
import DataForm from "./DataForm";
import DataTable from "./TableData";
import ModelOutput from "./ModelOutput";
import { useEffect } from "react";
import { socket } from "../socket";
import Launch from "./Launch";


export default function Dashboard() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper>
          <Chart id="chart1" socket={socket} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <DataTable />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <ModelOutput />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <DataForm />
        </Paper>
      </Grid>
      <Grid item xs={12} md={12}>
          <Launch />
      </Grid>
    </Grid>
  );
}