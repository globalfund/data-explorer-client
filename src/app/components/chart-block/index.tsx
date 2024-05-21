import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import CircularProgress from "@mui/material/CircularProgress";
import { ChartBlockProps } from "app/components/chart-block/data";
import { ChartBlockCycles } from "app/components/chart-block/components/cycles";
import { ChartBlockButtonToolbar } from "app/components/chart-block/components/button-toolbar";

export const ChartBlock: React.FC<ChartBlockProps> = (
  props: ChartBlockProps
) => {
  const showRightComponents = React.useMemo(() => {
    return (
      (props.dropdownItems &&
        props.dropdownItems.length > 0 &&
        props.dropdownSelected &&
        props.handleDropdownChange) ||
      props.unitButtons
    );
  }, [
    props.dropdownItems,
    props.dropdownSelected,
    props.handleDropdownChange,
    props.unitButtons,
  ]);

  const showCycles = React.useMemo(() => {
    return (
      props.cycles &&
      props.cycles.length > 0 &&
      props.selectedCycle &&
      props.handleCycleChange
    );
  }, [props.cycles, props.selectedCycle, props.handleCycleChange]);

  const content = React.useMemo(() => {
    if (props.loading) {
      return (
        <Box
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
      );
    }
    if (props.empty) {
      return (
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
      );
    }
    return props.children;
  }, [props.children, props.loading, props.empty]);

  return (
    <Box>
      <Typography variant="h2" lineHeight={1}>
        {props.title}
      </Typography>
      <Typography variant="h5" marginBottom="5px">
        {props.subtitle}
      </Typography>
      <Typography variant="subtitle2" lineHeight="normal" marginBottom="20px">
        <Box
          sx={{
            a: { textDecoration: "none", fontWeight: "700", color: "#000" },
          }}
          dangerouslySetInnerHTML={{
            __html: props.text,
          }}
        />
      </Typography>
      <Divider
        sx={{
          borderTopColor: "#868E96",
        }}
      />
      {(showCycles || showRightComponents) && (
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          padding="20px 0 40px 0"
          justifyContent={showCycles ? "space-between" : "flex-end"}
        >
          {props.cycles && props.selectedCycle && props.handleCycleChange && (
            <ChartBlockCycles
              cycles={props.cycles}
              selectedCycle={props.selectedCycle}
              handleCycleChange={props.handleCycleChange}
            />
          )}
          {showRightComponents && (
            <Box
              gap="8px"
              display="flex"
              flexDirection="row"
              alignItems="center"
            >
              {props.unitButtons ?? props.unitButtons}
              {props.dropdownItems &&
                props.dropdownItems.length > 0 &&
                props.dropdownSelected &&
                props.handleDropdownChange && (
                  <Dropdown
                    dropdownItems={props.dropdownItems}
                    dropdownSelected={props.dropdownSelected}
                    handleDropdownChange={props.handleDropdownChange}
                  />
                )}
            </Box>
          )}
        </Box>
      )}
      <Box
        width="100%"
        minHeight="400px"
        position="relative"
        sx={
          props.loading
            ? {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }
            : {}
        }
      >
        {content}
      </Box>
      {!props.noBottomToolbar && (
        <Box width="100%" paddingRight="32px">
          <ChartBlockButtonToolbar />
        </Box>
      )}
    </Box>
  );
};
