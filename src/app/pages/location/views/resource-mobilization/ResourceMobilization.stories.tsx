import type { Meta, StoryObj } from "@storybook/react";

import { ResourceMobilization } from "app/pages/location/views/resource-mobilization";
import { withRouter } from "storybook-addon-remix-react-router";

const meta = {
  title: "Pages/Location/Views/Resource Mobilization",
  component: ResourceMobilization,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ResourceMobilization>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Primary: StoryType = {};
