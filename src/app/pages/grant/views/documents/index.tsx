import React from "react";
import Box from "@mui/material/Box";
import { TableContainer } from "app/components/table-container";
import {
  TABLE_VARIATION_6_DATA,
  TABLE_VARIATION_6_COLUMNS,
} from "app/components/table/data";

export const GrantDocuments: React.FC = () => {
  return (
    <Box marginTop="60px">
      <TableContainer
        dataTree
        dataTreeStartExpanded
        id="grant-documents-table"
        data={TABLE_VARIATION_6_DATA}
        columns={TABLE_VARIATION_6_COLUMNS}
      />
    </Box>
  );
};
