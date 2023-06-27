import { Grid, Paper } from "@mui/material";
import Chart from "./Chart";
import DataForm from "./DataForm";
import DataTable from "./TableData";

export default function Dashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper>
          <Chart id="chart1" />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <DataTable />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <DataTable />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <DataForm />
        </Paper>
      </Grid>
    </Grid>
  );
}
