import React from "react";
import Box from "@mui/material/Box";
import findIndex from "lodash/findIndex";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { Table } from "app/components/table";
import Close from "@mui/icons-material/Close";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { TableContainerProps } from "app/components/table-container/data";
// import { ReactComponent as FilterIcon } from "app/assets/vectors/TableToolbarFilter.svg";
// import { ReactComponent as SearchIcon } from "app/assets/vectors/TableToolbarSearch.svg";
import { ReactComponent as ColumnsIcon } from "app/assets/vectors/TableToolbarColumns.svg";
// import { ReactComponent as DownloadIcon } from "app/assets/vectors/TableToolbarDownload.svg";
import { ReactComponent as FullscreenIcon } from "app/assets/vectors/TableToolbarFullscreen.svg";

export const TableContainer: React.FC<TableContainerProps> = (
  props: TableContainerProps
) => {
  const [table, setTable] = React.useState<any>(null);
  const [columns, setColumns] = React.useState(
    props.columns.map((column) => ({
      ...column,
      visible: true,
    }))
  );
  const [extraColumns, setExtraColumns] = React.useState(
    props.extraColumns
      ? props.extraColumns.map((column) => ({
          ...column,
          visible: true,
        }))
      : []
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLButtonElement>(
    null
  );

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

  // const download = () => {
  //   if (table) {
  //     table.download("csv", "data.csv");
  //   }
  // };

  const handleColumnsMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
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

  const handleColumnCheckboxChange =
    (title: string, extraCol?: boolean) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const columnsLocal = extraCol ? extraColumns : columns;
      const setColumnsAction = extraCol ? setExtraColumns : setColumns;
      const fColumnIndex = findIndex(columnsLocal, { title });
      if (fColumnIndex > -1) {
        columnsLocal[fColumnIndex].visible = event.target.checked;
      }
      setColumnsAction([...columnsLocal]);
    };

  return (
    <Box
      gap="24px"
      display="flex"
      bgcolor="#fff"
      borderRadius="32px"
      ref={fullscreenRef}
      flexDirection="column"
      data-cy="table-container"
      sx={{
        "&:fullscreen": {
          padding: "32px",
        },
      }}
    >
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent={props.tabsView ? "space-between" : "flex-end"}
      >
        {props.tabsView && (
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
                padding: "0px 12px",
                borderRadius: "4px",
                textTransform: "none",
                border: "1px solid #DFE3E5",
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
                    props.tabsView?.selectedTab === tab ? "#000" : "#fff",
                }}
                data-cy="table-tab-button"
              >
                {tab}
              </Button>
            ))}
          </Box>
        )}
        <Box
          gap="8px"
          display="flex"
          justifyContent="flex-end"
          sx={{
            "& > button": {
              padding: "0",
              width: "40px",
              height: "30px",
              borderRadius: "4px",
              background: "transparent",
              border: "1px solid #DFE3E5",
              "&:hover": {
                background: "#000000",
                borderColor: "#000000",
                svg: {
                  filter: "invert(1)",
                },
              },
            },
          }}
        >
          {/* <IconButton disableRipple>
            <SearchIcon />
          </IconButton> */}
          <IconButton disableRipple onClick={fullscreen}>
            <FullscreenIcon />
          </IconButton>
          {!props.noColumnVisibilitySelection && (
            <IconButton disableRipple onClick={handleColumnsMenuClick}>
              <ColumnsIcon />
            </IconButton>
          )}
          {/* <IconButton disableRipple onClick={download}>
            <DownloadIcon />
          </IconButton> */}
          <Popover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={{
              "& > .MuiPaper-root": {
                minWidth: "168px",
                borderRadius: "8px",
                padding: "10px 12px",
                boxShadow: "0px 1px 14px 0px rgba(0, 0, 0, 0.12)",
              },
            }}
          >
            <Box width="100%" display="flex" flexDirection="column">
              <Box
                display="flex"
                marginBottom="20px"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body1">Show columns</Typography>
                <IconButton
                  disableRipple
                  sx={{ padding: "0px" }}
                  onClick={() => setAnchorEl(null)}
                >
                  <Close htmlColor="#000" />
                </IconButton>
              </Box>
              <FormGroup>
                {columns.map((column) => (
                  <FormControlLabel
                    key={column.title}
                    label={column.title}
                    sx={{ marginLeft: "0px" }}
                    control={
                      <Checkbox
                        name={column.title}
                        checked={column.visible}
                        onChange={handleColumnCheckboxChange(column.title)}
                      />
                    }
                  />
                ))}
                {extraColumns.map((column) => (
                  <FormControlLabel
                    key={column.title}
                    label={column.title}
                    sx={{ marginLeft: "0px" }}
                    control={
                      <Checkbox
                        name={column.title}
                        checked={column.visible}
                        onChange={handleColumnCheckboxChange(
                          column.title,
                          true
                        )}
                      />
                    }
                  />
                ))}
              </FormGroup>
            </Box>
          </Popover>
        </Box>
      </Box>
      <Table {...props} columns={columns} extraColumns={extraColumns} />
    </Box>
  );
};
