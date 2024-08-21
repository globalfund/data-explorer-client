import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { TableContainer } from "app/components/table-container";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { TABLE_VARIATION_6_COLUMNS as DOCUMENTS_TABLE_COLUMNS } from "app/components/table/data";

interface AccessToFundingBlock6Props {
  filterString: string;
}

export const AccessToFundingBlock6: React.FC<AccessToFundingBlock6Props> = (
  props: AccessToFundingBlock6Props
) => {
  const dataDocumentsTable = useStoreState((state) =>
    get(state.AccessToFundingDocumentsTable, "data.data", []).map(
      (item: any, index) => {
        if (index === 0) {
          return {
            ...item,
            top: true,
            _children: item._children.map((subItem: any) => ({
              ...subItem,
              top: true,
              _children: subItem._children.map((subSubItem: any) => ({
                ...subSubItem,
                top: true,
              })),
            })),
          };
        }
        return item;
      }
    )
  );
  const loadingDocumentsTable = useStoreState(
    (state) => state.AccessToFundingDocumentsTable.loading
  );
  const fetchDocumentsTable = useStoreActions(
    (actions) => actions.AccessToFundingDocumentsTable.fetch
  );

  React.useEffect(() => {
    fetchDocumentsTable({
      filterString: `types=Application${
        props.filterString.length > 0 ? `&${props.filterString}` : ""
      }`,
    });
  }, [props.filterString]);

  return (
    <Box
      id="documents"
      padding="50px 0"
      sx={{
        "@media (max-width: 767px)": {
          padding: "20px 0",
        },
      }}
    >
      <Typography variant="h3" lineHeight={1.2}>
        Documents
      </Typography>
      <Divider
        sx={{
          margin: "20px 0",
          "@media (max-width: 767px)": {
            display: "none",
          },
        }}
      />
      {loadingDocumentsTable && (
        <Box
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
      )}
      {!loadingDocumentsTable && dataDocumentsTable.length > 0 ? (
        <React.Fragment>
          <Box
            height="40px"
            sx={{
              "@media (max-width: 767px)": {
                display: "none",
              },
            }}
          />
          <TableContainer
            dataTree
            id="documents-table"
            data={dataDocumentsTable}
            columns={DOCUMENTS_TABLE_COLUMNS}
            dataTreeStartExpandedFn={(row) => row.getData().top}
          />
        </React.Fragment>
      ) : (
        <Box
          width="100%"
          height="100%"
          minHeight="250px"
          alignItems="center"
          justifyContent="center"
          display={!loadingDocumentsTable ? "flex" : "none"}
        >
          <Typography>No data available</Typography>
        </Box>
      )}
    </Box>
  );
};
