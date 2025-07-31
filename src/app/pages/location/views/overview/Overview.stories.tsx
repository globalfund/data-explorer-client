import type { Meta, StoryObj } from "@storybook/react";

import { LocationOverview } from "app/pages/location/views/overview";
import { withRouter } from "storybook-addon-remix-react-router";

const meta = {
  title: "Pages/Location/Views/Overview",
  component: LocationOverview,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LocationOverview>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Primary: StoryType = {};
