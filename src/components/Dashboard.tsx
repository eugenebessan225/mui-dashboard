import { Grid, Paper } from "@mui/material";
import Chart from "./Chart";
import EnhancedTable from "./TableData";

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
          <EnhancedTable />
        </Paper>
      </Grid>
    </Grid>
  );
}
