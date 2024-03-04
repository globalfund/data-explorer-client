import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import { ChartBlockProps } from "app/components/chart-block/data";
import { ChartBlockCycles } from "app/components/chart-block/components/cycles";

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

  return (
    <Box>
      <Typography variant="h2" lineHeight={1}>
        $84 Billion
      </Typography>
      <Typography variant="h5" marginBottom="5px">
        Funds raised to date
      </Typography>
      <Typography variant="subtitle2" maxWidth="350px" lineHeight="normal">
        Government, private sector, nongovernment and other donor pledges and
        contributions
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
    </Box>
  );
};
