import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { ChartSettingsSortBy } from "app/components/chart-settings/sort-by";
import { withRouter } from "storybook-addon-remix-react-router";
import {
  ChartSettingsSortByItem,
  ChartSettingsSortByItems,
} from "app/components/chart-settings/sort-by/data";

const Wrapper: React.FC<{ secondary: boolean }> = (props: {
  secondary: boolean;
}) => {
  const [items, setItems] = React.useState<ChartSettingsSortByItem[]>([]);
  const [tempItems, setTempItems] = React.useState<ChartSettingsSortByItem[]>(
    []
  );

  const handleItemSortOrderChange = (name: string, value: string) => {
    const newItems = [...tempItems];
    const itemIndex = newItems.findIndex((i) => i.name === name);
    if (itemIndex !== -1) {
      newItems[itemIndex] = {
        ...newItems[itemIndex],
        dropdown: {
          ...newItems[itemIndex].dropdown,
          selected: value,
        },
      };
      setTempItems(newItems);
    }
  };

  const pool = React.useMemo(() => {
    return ChartSettingsSortByItems.map((item) => ({
      ...item,
      name: item.name,
      disabled: tempItems.some((i) => i.name === item.name),
    }));
  }, [tempItems]);

  const onCancel = () => {
    setTempItems(items);
  };

  const onSubmit = () => {
    setItems(tempItems);
  };

  return (
    <ChartSettingsSortBy
      pool={pool}
      items={tempItems}
      onCancel={onCancel}
      onSubmit={onSubmit}
      setItems={setTempItems}
      orderListDropdownSetSelected={handleItemSortOrderChange}
      secondary={props.secondary}
    />
  );
};

const meta = {
  title: "Components/Chart Settings/Sort By",
  component: Wrapper,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Wrapper>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Primary: StoryType = {
  args: {
    secondary: false,
  },
};

export const Secondary: StoryType = {
  args: {
    secondary: true,
  },
};
