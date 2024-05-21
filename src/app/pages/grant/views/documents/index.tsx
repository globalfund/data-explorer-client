import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import { TableContainer } from "app/components/table-container";
// import {
//   TABLE_VARIATION_6_DATA,
//   TABLE_VARIATION_6_COLUMNS,
// } from "app/components/table/data";

export const GrantDocuments: React.FC = () => {
  return (
    <Box marginTop="50px">
      <Box
        width="100%"
        height="100%"
        display="flex"
        minHeight="400px"
        alignItems="center"
        justifyContent="center"
      >
        <Typography>No data available</Typography>
      </Box>
      {/* <TableContainer
        dataTree
        dataTreeStartExpanded
        id="grant-documents-table"
        data={TABLE_VARIATION_6_DATA}
        columns={TABLE_VARIATION_6_COLUMNS}
      /> */}
    </Box>
  );
};
