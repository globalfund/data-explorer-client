import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import { OrderList } from "app/components/order-list";
import { ChartSettingsSortBy } from "app/components/chart-settings/sort-by";
import { ReactComponent as ColumnsIcon } from "app/assets/vectors/TableToolbarColumns.svg";
import {
  rowsDropdownItems,
  columnsDropdownItems,
  ChartSettingsTableProps,
  ChartSettingsTableColumnsProps,
} from "app/components/chart-settings/variations/table/data";

export const ChartSettingsTable: React.FC<ChartSettingsTableProps> = (
  props: ChartSettingsTableProps
) => {
  const { rows, setRows, ...sortByProps } = props;

  return (
    <Box
      sx={{
        gap: "15px",
        display: "flex",
        flexDirection: "column",
        "> div": {
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        },
      }}
    >
      <Box>
        <Typography
          gap="5px"
          display="flex"
          fontSize="12px"
          fontWeight="700"
          marginBottom="5px"
          alignItems="center"
        >
          <ColumnsIcon style={{ transform: "rotate(-90deg)" }} />
          Rows
        </Typography>
        <Dropdown
          compact
          width={150}
          height={26}
          dropdownSelected={rows}
          handleDropdownChange={setRows}
          dropdownItems={rowsDropdownItems}
        />
      </Box>
      <Box>
        <ChartSettingsSortBy {...sortByProps} simple />
      </Box>
    </Box>
  );
};

export const ChartSettingsTableColumns: React.FC<
  ChartSettingsTableColumnsProps
> = (props: ChartSettingsTableColumnsProps) => {
  const { columns, setColumns } = props;

  const handleColumnAddition = (value: string) => {
    const newItem = {
      id: (columns.length + 1).toString(),
      value,
    };
    setColumns([...columns, newItem]);
  };

  return (
    <Box>
      <Typography fontSize="12px" fontWeight="700">
        X Axis
      </Typography>
      <OrderList items={columns} setItems={setColumns} />
      <Dropdown
        compact
        width={150}
        height={26}
        dropdownSelected="Add a Column"
        dropdownItems={columnsDropdownItems}
        handleDropdownChange={handleColumnAddition}
      />
    </Box>
  );
};
