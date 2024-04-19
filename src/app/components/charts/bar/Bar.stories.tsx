import type { Meta, StoryObj } from "@storybook/react";

import { BarChart } from "app/components/charts/bar";
import { withRouter } from "storybook-addon-remix-react-router";
import {
  STORY_DATA_VARIANT_1,
  STORY_DATA_VARIANT_2,
} from "app/components/charts/bar/data";

const meta = {
  title: "Components/Charts/Bar chart",
  component: BarChart,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof BarChart>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const BarChartVariant1: StoryType = {
  args: {
    data: STORY_DATA_VARIANT_1,
    valueLabels: {
      value: "",
    },
  },
};

export const BarChartVariant2: StoryType = {
  args: {
    data: STORY_DATA_VARIANT_2,
    valueLabels: {
      value: "Pledge",
      value1: "Contribution",
    },
  },
};
