import React from "react";
import Box from "@mui/material/Box";
import uniqueId from "lodash/uniqueId";
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
  const id = React.useMemo(() => uniqueId("chart-block-"), []);

  const showRightComponents = React.useMemo(() => {
    return (
      (props.dropdownItems &&
        props.dropdownItems.length > 0 &&
        props.dropdownSelected &&
        props.handleDropdownChange) ||
      props.unitButtons ||
      props.extraDropdown
    );
  }, [
    props.dropdownItems,
    props.dropdownSelected,
    props.handleDropdownChange,
    props.unitButtons,
    props.extraDropdown,
  ]);

  const showCycles = React.useMemo(() => {
    return (
      props.cycles &&
      props.cycles.length > 0 &&
      props.selectedCycles &&
      props.handleCycleChange
    );
  }, [props.cycles, props.selectedCycles, props.handleCycleChange]);

  const content = React.useMemo(() => {
    if (props.loading) {
      return (
        <Box
          width="100%"
          height="300px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
      );
    }
    return props.children;
  }, [props.children, props.loading]);

  if (props.empty && !props.loading) {
    return <React.Fragment />;
  }

  return (
    <Box id={props.id} data-cy="chart-block">
      <Typography variant="h2" lineHeight={1}>
        {props.title}
      </Typography>
      <Typography variant="h5" marginBottom="5px">
        {props.subtitle}
      </Typography>
      {props.text && props.text.length > 0 && (
        <Typography variant="subtitle2" lineHeight="normal" marginBottom="20px">
          <Box
            sx={{
              a: { textDecoration: "none", fontWeight: "700", color: "#000" },
            }}
            dangerouslySetInnerHTML={{
              __html: props.text ?? "",
            }}
          />
        </Typography>
      )}
      <Divider
        sx={{
          borderTopColor: "#868E96",
          "@media (max-width: 767px)": {
            display: "none",
          },
        }}
      />
      {(showCycles || showRightComponents) && (
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          padding="20px 0 40px 0"
          alignItems="flex-start"
          justifyContent={showCycles ? "space-between" : "flex-end"}
          sx={{
            "@media (max-width: 767px)": {
              flexDirection: "column",
            },
          }}
        >
          {props.cycles && props.selectedCycles && props.handleCycleChange && (
            <ChartBlockCycles
              cycles={props.cycles}
              showCycleAll={props.showCycleAll}
              selectedCycles={props.selectedCycles}
              handleCycleChange={props.handleCycleChange}
            />
          )}
          {showRightComponents && (
            <Box
              gap="8px"
              display="flex"
              flexDirection="row"
              alignItems="center"
              sx={{
                "@media (max-width: 767px)": {
                  width: "100%",
                  marginTop: "20px",
                  justifyContent: "flex-end",
                  "> button": {
                    maxWidth: "unset",
                  },
                },
              }}
            >
              {props.unitButtons ?? props.unitButtons}
              {props.extraDropdown ?? props.extraDropdown}
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
        id={id}
        width="100%"
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
      <Box
        width="100%"
        display="flex"
        marginTop="40px"
        alignItems="center"
        position="relative"
        // justifyContent={props.latestUpdate ? "space-between" : "flex-end"}
        justifyContent="flex-end"
      >
        {/* {props.latestUpdate && (
          <Typography variant="overline">
            Latest Update: <b>{props.latestUpdate}</b>
          </Typography>
        )} */}
        {!props.noBottomToolbar && (
          <ChartBlockButtonToolbar
            blockId={id}
            hashId={props.id}
            infoType={props.infoType}
            chartType={props.dropdownSelected}
          />
        )}
      </Box>
    </Box>
  );
};
