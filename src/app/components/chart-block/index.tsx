import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import { ChartBlockProps } from "app/components/chart-block/data";
import { splitStringInMiddle } from "app/utils/splitStringInMiddle";
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

  const text = React.useMemo(() => {
    if (props.noSplitText) {
      return (
        <Box
          sx={{
            a: { textDecoration: "none", fontWeight: "700", color: "#000" },
          }}
          dangerouslySetInnerHTML={{
            __html: props.text,
          }}
        />
      );
    }
    const splits = splitStringInMiddle(props.text);
    return (
      <React.Fragment>
        {splits[0]}
        <br />
        {splits[1]}
      </React.Fragment>
    );
  }, [props.text, props.noSplitText]);

  return (
    <Box>
      <Typography variant="h2" lineHeight={1}>
        {props.title}
      </Typography>
      <Typography variant="h5" marginBottom="5px">
        {props.subtitle}
      </Typography>
      <Typography variant="subtitle2" lineHeight="normal">
        {text}
      </Typography>
      {(showCycles || showRightComponents) && (
        <Box
          width="100%"
          padding="32px"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
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
              {props.unitButtons && props.unitButtons}
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
      <Box width="100%" minHeight="400px" padding="0 32px" position="relative">
        {props.children}
      </Box>
      {!props.noBottomToolbar && (
        <Box width="100%" paddingRight="32px">
          <ChartBlockButtonToolbar />
        </Box>
      )}
    </Box>
  );
};
