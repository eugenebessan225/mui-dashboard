import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 300 },
  { field: "operation_name", headerName: "Name", width: 200 },
  { field: "Value A", headerName: "Value A" },
  { field: "Value B", headerName: "Value B" },
];

const DataTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("./data.json")
      .then((data) => data.json())
      .then((data) => setTableData(data));
  }, []);

  console.log(tableData);

  return (
    <div style={{ height: "45vh", width: "100%" }}>
      <DataGrid rows={tableData} columns={columns} autoPageSize />
    </div>
  );
};

export default DataTable;
