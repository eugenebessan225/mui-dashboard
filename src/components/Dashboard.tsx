import { Grid, Paper } from "@mui/material";
import Chart from "./Chart";
import DataForm from "./DataForm";
import DataTable from "./TableData";
import ModelOutput from "./ModelOutput";
// import { io, Socket } from "socket.io-client";
import { useRef, useEffect } from "react";
import { socket } from "../socket";
// http://192.168.1.121:8765
export default function Dashboard() {
  // const socket_connection = useRef<Socket>(null);
  useEffect(() => {
    // const socket = io("localhost:8080");

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
          <DataForm socket={socket} />
        </Paper>
      </Grid>
    </Grid>
  );
}
