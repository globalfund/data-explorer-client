import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { GrantImplementation } from "app/pages/grant/views/grant-implementation";
import { withRouter } from "storybook-addon-remix-react-router";

const meta = {
  title: "Pages/Grant/Views/Financial Insights",
  component: GrantImplementation,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof GrantImplementation>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Primary: StoryType = {};
