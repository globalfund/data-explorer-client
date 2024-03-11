import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { GrantImplementation } from "app/pages/location/views/grant-implementation";
import { withRouter } from "storybook-addon-react-router-v6";

const meta = {
  title: "Pages/Location/Views/Grant Implementation",
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
