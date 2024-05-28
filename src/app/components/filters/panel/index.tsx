import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import Close from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Refresh from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import { FilterList } from "app/components/filters/list";
import { FiltersApplied } from "app/components/filters/applied";
import { FilterPanelProps } from "app/components/filters/panel/data";
import { ReactComponent as CollapseIcon } from "app/assets/vectors/Collapse_ButtonIcon.svg";

export const FilterPanel: React.FC<FilterPanelProps> = (
  props: FilterPanelProps
) => {
  const [collapseAll, setCollapseAll] = React.useState(false);

  const handleCollapseAll = () => {
    setCollapseAll(!collapseAll);
  };

  const appliedFiltersContent = React.useMemo(() => {
    if (props.appliedFilters.length === 0) {
      return <Typography fontSize="12px">No filters applied.</Typography>;
    }
    return (
      <FiltersApplied
        items={props.appliedFilters}
        filterGroups={props.filterGroups}
        appliedFilterBgColors={props.appliedFilterBgColors}
      />
    );
  }, [props.appliedFilters]);

  return (
    <Box
      gap="7px"
      width="500px"
      display="flex"
      bgcolor="#FFFFFF"
      padding="7px 12px"
      borderRadius="4px"
      flexDirection="column"
      border="1px solid #70777E"
    >
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box gap="5px" display="flex" flexDirection="row" alignItems="center">
          <Add fontSize="small" />
          <Typography fontSize="14px">Filters</Typography>
        </Box>
        <IconButton
          sx={{
            padding: 0,
          }}
          onClick={props.onClose}
        >
          <Close fontSize="small" />
        </IconButton>
      </Box>
      <Divider />
      <Box
        gap="5px"
        display="flex"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        {appliedFiltersContent}
        <Box
          gap="5px"
          display="flex"
          minWidth="192px"
          flexDirection="row"
          sx={{
            "& > button": {
              fontSize: "12px",
              lineHeight: "1.5",
              padding: "2px 12px",
              svg: {
                width: "14px",
                height: "14px",
              },
            },
          }}
        >
          <Button
            variant="outlined"
            onClick={handleCollapseAll}
            startIcon={<CollapseIcon fontSize="small" />}
          >
            Collapse All
          </Button>
          <Button
            variant="outlined"
            onClick={props.handleResetFilters}
            startIcon={
              <Refresh
                fontSize="small"
                sx={{
                  transform: "rotate(-180deg)",
                }}
              />
            }
          >
            Reset
          </Button>
        </Box>
      </Box>
      <Box
        padding="20px"
        maxHeight="450px"
        sx={{
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#F5F6F7",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#70777E",
            borderRadius: "3px",
          },
        }}
      >
        <Typography fontSize="12px">Filter the data page-wide.</Typography>
        <FilterList
          collapseAll={collapseAll}
          groups={props.filterGroups}
          setCollapseAll={setCollapseAll}
        />
      </Box>
    </Box>
  );
};
