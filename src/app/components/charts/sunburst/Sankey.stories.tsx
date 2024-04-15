import type { Meta, StoryObj } from "@storybook/react";

import { SunburstChart } from "app/components/charts/sunburst";
import { withRouter } from "storybook-addon-react-router-v6";
import { STORY_DATA_VARIANT_1 } from "app/components/charts/sunburst/data";

const meta = {
  title: "Components/Charts/Sunburst chart",
  component: SunburstChart,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SunburstChart>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const SunburstChartVariant1: StoryType = {
  args: {
    data: STORY_DATA_VARIANT_1,
  },
};
