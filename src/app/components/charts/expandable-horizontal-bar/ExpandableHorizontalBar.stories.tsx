import type { Meta, StoryObj } from "@storybook/react";

import { ExpandableHorizontalBar } from "app/components/charts/expandable-horizontal-bar";
import { withRouter } from "storybook-addon-remix-react-router";
import { STORY_DATA_VARIANT_1 } from "app/components/charts/expandable-horizontal-bar/data";

const meta = {
  title: "Components/Charts/Expandable Horizontal Bar chart",
  component: ExpandableHorizontalBar,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ExpandableHorizontalBar>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const BarChartVariant1: StoryType = {
  args: {
    data: STORY_DATA_VARIANT_1,
    yAxisLabel: "Donor Types & Donors",
    xAxisLabel: "Amount",
    valueLabels: {
      value: "Pledge",
      value1: "Contribution",
    },
  },
};
