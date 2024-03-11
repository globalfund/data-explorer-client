import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { GrantOverview } from "app/pages/grant/views/overview";
import { withRouter } from "storybook-addon-react-router-v6";

const meta = {
  title: "Pages/Grant/Views/Overview",
  component: GrantOverview,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof GrantOverview>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Primary: StoryType = {};
