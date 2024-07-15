import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Home } from "app/pages/home";
import { withRouter } from "storybook-addon-remix-react-router";

const meta = {
  title: "Pages/Home",
  component: Home,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Home>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Primary: StoryType = {};
