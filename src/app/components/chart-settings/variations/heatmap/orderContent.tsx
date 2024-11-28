import React from "react";
import { ReactComponent as ColumnsIcon } from "app/assets/vectors/TableToolbarColumns.svg";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import { OrderList } from "app/components/order-list";

import {
  columnsDropdownItems,
  ChartSettingsTableColumnsProps,
} from "app/components/chart-settings/variations/table/data";
import { ItemInterface } from "react-sortablejs";

interface Props {
  sortByHeatmapColumnItems: ItemInterface[];
  setSortByHeatmapColumnItems: React.Dispatch<
    React.SetStateAction<ItemInterface[]>
  >;
}
export default function HeatmapOrderContent(props: Props) {
  return (
    <React.Fragment>
      <Box display={"flex"} gap={"8px"}>
        <ColumnsIcon style={{ transform: "rotate(0deg)" }} />
        <Typography fontSize="12px" marginBottom="5px" fontWeight={"bold"}>
          Columns
        </Typography>
      </Box>
      <Typography fontSize="12px" marginBottom="15px">
        Drag and drop to customise the order of the columns.
      </Typography>
      <ChartSettingsTableColumns
        columns={props.sortByHeatmapColumnItems}
        setColumns={props.setSortByHeatmapColumnItems}
      />
    </React.Fragment>
  );
}

const ChartSettingsTableColumns: React.FC<ChartSettingsTableColumnsProps> = (
  props: ChartSettingsTableColumnsProps
) => {
  const { columns, setColumns } = props;

  const handleColumnAddition = (value: string) => {
    if (columns.find((item) => item.value === value)) {
      return;
    }
    const newItem = {
      id: (columns.length + 1).toString(),
      value,
      name: value,
    };
    setColumns([...columns, newItem]);
  };

  return (
    <Box>
      <OrderList items={columns} setItems={setColumns} />
      <Dropdown
        compact
        width={150}
        height={26}
        dropdownSelected="Add a Column"
        dropdownItems={columnsDropdownItems.map((item) => ({
          ...item,
          name: item.value,
        }))}
        handleDropdownChange={handleColumnAddition}
        secondary
      />
    </Box>
  );
};
