import { Typography } from "@mui/material";
import React from "react";
import { ChartSettingsSortBy } from "app/components/chart-settings/sort-by";
import {
  ChartSettingsSortByItem,
  ChartSettingsSortByItems,
} from "app/components/chart-settings/sort-by/data";

export default function BarOrderContent(props: {
  sortByItems: ChartSettingsSortByItem[];
  setSortByItems: React.Dispatch<
    React.SetStateAction<ChartSettingsSortByItem[]>
  >;
  sortByTempItems: ChartSettingsSortByItem[];
  setSortByTempItems: React.Dispatch<
    React.SetStateAction<ChartSettingsSortByItem[]>
  >;
}) {
  const onCancel = () => {
    props.setSortByTempItems(props.sortByItems);
  };

  const onSubmit = () => {
    props.setSortByItems(props.sortByTempItems);
  };
  const handleItemSortOrderChange = (name: string, value: string) => {
    const newItems = [...props.sortByTempItems];
    const itemIndex = newItems.findIndex((i) => i.name === name);
    if (itemIndex !== -1) {
      newItems[itemIndex] = {
        ...newItems[itemIndex],
        dropdown: {
          ...newItems[itemIndex].dropdown,
          selected: value,
        },
      };
      props.setSortByTempItems(newItems);
    }
  };
  const pool = React.useMemo(() => {
    return ChartSettingsSortByItems.map((item) => ({
      ...item,
      name: item.name,
      disabled: props.sortByItems.some((i) => i.name === item.name),
    }));
  }, [props.sortByItems]);

  return (
    <React.Fragment>
      <Typography fontSize="14px" marginBottom="15px">
        Customise the order of what you see.
      </Typography>
      <ChartSettingsSortBy
        pool={pool}
        onCancel={onCancel}
        onSubmit={onSubmit}
        items={props.sortByTempItems}
        setItems={props.setSortByTempItems}
        orderListDropdownSetSelected={handleItemSortOrderChange}
      />
    </React.Fragment>
  );
}
