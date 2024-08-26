import React from "react";
import Box from "@mui/material/Box";
import { useCMSData } from "app/hooks/useCMSData";
import Typography from "@mui/material/Typography";
import { getCMSDataField } from "app/utils/getCMSDataField";
// import { TableContainer } from "app/components/table-container";
// import {
//   TABLE_VARIATION_6_DATA,
//   TABLE_VARIATION_6_COLUMNS,
// } from "app/components/table/data";

export const GrantDocuments: React.FC = () => {
  const cmsData = useCMSData({ returnData: true });
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
        <Typography>
          {getCMSDataField(
            cmsData,
            "pagesGrantDocuments.notAvailable",
            "No data available"
          )}
        </Typography>
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
