import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Geography } from "app/pages/geography";
import { withRouter } from "storybook-addon-react-router-v6";

const meta = {
  title: "Pages/Geography List",
  component: Geography,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Geography>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Primary: StoryType = {};
