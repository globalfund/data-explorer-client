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

  const textSplits = React.useMemo(
    () => splitStringInMiddle(props.text),
    [props.text]
  );

  return (
    <Box>
      <Typography variant="h2" lineHeight={1}>
        {props.title}
      </Typography>
      <Typography variant="h5" marginBottom="5px">
        {props.subtitle}
      </Typography>
      <Typography variant="subtitle2" lineHeight="normal">
        {textSplits[0]}
        <br />
        {textSplits[1]}
      </Typography>
      <Box
        width="100%"
        padding="32px"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <ChartBlockCycles
          cycles={props.cycles}
          selectedCycle={props.selectedCycle}
          handleCycleChange={props.handleCycleChange}
        />
        {showRightComponents && (
          <Box gap="8px" display="flex" flexDirection="row" alignItems="center">
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
      <Box width="100%" minHeight="400px" padding="0 32px">
        {props.children}
      </Box>
      <Box width="100%" paddingRight="32px">
        <ChartBlockButtonToolbar />
      </Box>
    </Box>
  );
};
