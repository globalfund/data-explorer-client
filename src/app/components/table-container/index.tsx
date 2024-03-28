import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Table } from "app/components/table";
import IconButton from "@mui/material/IconButton";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { TableContainerProps } from "app/components/table-container/data";
import { ReactComponent as FilterIcon } from "app/assets/vectors/TableToolbarFilter.svg";
import { ReactComponent as SearchIcon } from "app/assets/vectors/TableToolbarSearch.svg";
import { ReactComponent as ColumnsIcon } from "app/assets/vectors/TableToolbarColumns.svg";
import { ReactComponent as DownloadIcon } from "app/assets/vectors/TableToolbarDownload.svg";
import { ReactComponent as FullscreenIcon } from "app/assets/vectors/TableToolbarFullscreen.svg";

export const TableContainer: React.FC<TableContainerProps> = (
  props: TableContainerProps
) => {
  const [table, setTable] = React.useState<any>(null);
  const fullscreenRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = document.getElementById("table");
    if (element) {
      const tabulatorTables = Tabulator.findTable("#table");
      if (tabulatorTables.length > 0 && tabulatorTables[0]) {
        setTable(tabulatorTables[0]);
      }
    }
  }, []);

  const download = () => {
    if (table) {
      table.download("csv", "data.csv");
    }
  };

  const fullscreen = () => {
    if (!fullscreenRef.current) {
      return;
    }
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      fullscreenRef.current.requestFullscreen();
    }
  };

  return (
    <Box
      gap="24px"
      display="flex"
      bgcolor="#fff"
      borderRadius="32px"
      ref={fullscreenRef}
      flexDirection="column"
    >
      {!props.tabsView && (
        <Box
          gap="8px"
          display="flex"
          justifyContent="flex-end"
          sx={{
            "& > button": {
              padding: "0px",
            },
          }}
        >
          <IconButton disableRipple onClick={fullscreen}>
            <FullscreenIcon />
          </IconButton>
          <IconButton disableRipple>
            <ColumnsIcon />
          </IconButton>
          <IconButton disableRipple>
            <FilterIcon />
          </IconButton>
          <IconButton disableRipple onClick={download}>
            <DownloadIcon />
          </IconButton>
          <IconButton disableRipple>
            <SearchIcon />
          </IconButton>
        </Box>
      )}
      {props.tabsView && (
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            gap="8px"
            display="flex"
            flexDirection="row"
            alignItems="center"
            sx={{
              "& > button": {
                height: "32px",
                fontSize: "14px",
                fontWeight: "400",
                padding: "0px 24px",
                borderRadius: "8px",
                textTransform: "none",
                "&:hover": {
                  color: "#fff",
                  background: "#000",
                },
              },
            }}
          >
            {props.tabsView.tabs.map((tab) => (
              <Button
                key={tab}
                onClick={() => props.tabsView?.onTabChange(tab)}
                sx={{
                  color: props.tabsView?.selectedTab === tab ? "#fff" : "#000",
                  background:
                    props.tabsView?.selectedTab === tab ? "#000" : "#F1F3F4",
                }}
              >
                {tab}
              </Button>
            ))}
          </Box>
          <IconButton disableRipple>
            <SearchIcon />
          </IconButton>
        </Box>
      )}
      <Table {...props} />
    </Box>
  );
};
