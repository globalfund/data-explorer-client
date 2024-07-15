import type { Meta, StoryObj } from "@storybook/react";

import { RadarChart } from "app/components/charts/radar";
import { withRouter } from "storybook-addon-remix-react-router";
import { STORY_DATA_VARIANT_1 } from "app/components/charts/radar/data";

const meta = {
  title: "Components/Charts/Radar chart",
  component: RadarChart,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof RadarChart>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const RadialChartVariant1: StoryType = {
  args: {
    data: STORY_DATA_VARIANT_1,
  },
};
