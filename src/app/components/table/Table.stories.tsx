import type { Meta, StoryObj } from "@storybook/react";

import { Table } from "app/components/table";
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
  TABLE_VARIATION_6_DATA,
  TABLE_VARIATION_6_COLUMNS,
  TABLE_VARIATION_7_DATA,
  TABLE_VARIATION_7_COLUMNS,
} from "app/components/table/data";

const meta = {
  title: "Components/Table",
  component: Table,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Table>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Variant1: StoryType = {
  args: {
    id: "table",
    dataTree: true,
    data: TABLE_VARIATION_1_DATA,
    columns: TABLE_VARIATION_1_COLUMNS,
  },
};

export const Variant2: StoryType = {
  args: {
    id: "table",
    dataTree: true,
    dataTreeBranchElement: false,
    data: TABLE_VARIATION_2_DATA,
    columns: TABLE_VARIATION_2_COLUMNS.slice(0, 7),
    extraColumns: TABLE_VARIATION_2_COLUMNS.slice(
      7,
      TABLE_VARIATION_2_COLUMNS.length - 1
    ),
  },
};

export const Variant3: StoryType = {
  args: {
    id: "table",
    dataTree: true,
    dataTreeBranchElement: false,
    data: TABLE_VARIATION_3_DATA,
    columns: TABLE_VARIATION_3_COLUMNS,
  },
};

export const Variant4: StoryType = {
  args: {
    id: "table",
    dataTree: true,
    data: TABLE_VARIATION_4_DATA,
    columns: TABLE_VARIATION_4_COLUMNS.slice(0, 1),
    extraColumns: TABLE_VARIATION_4_COLUMNS.slice(
      1,
      TABLE_VARIATION_2_COLUMNS.length - 1
    ),
  },
};

export const Variant5: StoryType = {
  args: {
    id: "table",
    dataTree: true,
    data: TABLE_VARIATION_5_DATA,
    columns: TABLE_VARIATION_5_COLUMNS,
  },
};

export const Variant6: StoryType = {
  args: {
    id: "table",
    dataTree: true,
    data: TABLE_VARIATION_6_DATA,
    columns: TABLE_VARIATION_6_COLUMNS,
  },
};

export const Variant7: StoryType = {
  args: {
    id: "table",
    dataTree: true,
    data: TABLE_VARIATION_7_DATA,
    columns: TABLE_VARIATION_7_COLUMNS,
  },
};
