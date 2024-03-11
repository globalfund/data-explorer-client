import type { Meta, StoryObj } from "@storybook/react";

import { RaceBarChart } from "app/components/charts/race-bar";
import { withRouter } from "storybook-addon-react-router-v6";
import { STORY_DATA_VARIANT_1 } from "app/components/charts/race-bar/data";

const meta = {
  title: "Components/Charts/Race bar chart",
  component: RaceBarChart,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof RaceBarChart>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const RaceBarChartVariant1: StoryType = {
  args: {
    data: STORY_DATA_VARIANT_1,
  },
};
