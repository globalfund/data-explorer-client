import type { Meta, StoryObj } from "@storybook/react";

import { SankeyChart } from "app/components/charts/sankey";
import { withRouter } from "storybook-addon-react-router-v6";
import { STORY_DATA_VARIANT_1 } from "app/components/charts/sankey/data";

const meta = {
  title: "Charts/Sankey chart",
  component: SankeyChart,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SankeyChart>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const SankeyChartVariant1: StoryType = {
  args: {
    data: STORY_DATA_VARIANT_1,
  },
};
