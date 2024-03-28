import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { TableContainer } from "app/components/table-container";
import { withRouter } from "storybook-addon-react-router-v6";
import {
  TABLE_VARIATION_1_DATA,
  TABLE_VARIATION_1_COLUMNS,
  TABLE_VARIATION_2_DATA,
  TABLE_VARIATION_2_COLUMNS,
  TABLE_VARIATION_3_DATA,
  TABLE_VARIATION_3_COLUMNS,
  TABLE_VARIATION_4_DATA,
  TABLE_VARIATION_4_COLUMNS,
  TABLE_VARIATION_5_DATA,
  TABLE_VARIATION_5_COLUMNS,
} from "app/components/table/data";

const Variant2Wrapper = (args: any) => {
  const [tab, setTab] = React.useState(args.tabsView?.selectedTab);

  return (
    <TableContainer
      {...args}
      tabsView={
        args.tabsView && {
          ...args.tabsView,
          selectedTab: tab,
          onTabChange: setTab,
        }
      }
    />
  );
};

const meta = {
  title: "Components/Table Container",
  component: Variant2Wrapper,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TableContainer>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Variant1: StoryType = {
  args: {
    dataTree: true,
    data: TABLE_VARIATION_1_DATA,
    columns: TABLE_VARIATION_1_COLUMNS,
  },
};

export const Variant2: StoryType = {
  args: {
    dataTree: true,
    data: TABLE_VARIATION_1_DATA,
    columns: TABLE_VARIATION_1_COLUMNS,
    tabsView: {
      tabs: ["All", "Impact Indicators", "Outcome Indicators"],
      selectedTab: "All",
      onTabChange: (tab: string) => console.log(tab),
    },
  },
};
