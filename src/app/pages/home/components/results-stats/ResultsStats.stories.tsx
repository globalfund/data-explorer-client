import type { Meta, StoryObj } from "@storybook/react";

import { withRouter } from "storybook-addon-react-router-v6";
import { HomeResultsStats } from "app/pages/home/components/results-stats";

const meta = {
  title: "Home/Results stats",
  component: HomeResultsStats,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof HomeResultsStats>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const HomeResultsStatsStory: StoryType = {};
