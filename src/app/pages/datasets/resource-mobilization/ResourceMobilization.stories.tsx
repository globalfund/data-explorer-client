import type { Meta, StoryObj } from "@storybook/react";

import { ResourceMobilizationPage } from "app/pages/datasets/resource-mobilization";
import { withRouter } from "storybook-addon-remix-react-router";

const meta = {
  title: "Pages/Datasets/ResourceMobilization",
  component: ResourceMobilizationPage,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ResourceMobilizationPage>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Primary: StoryType = {};
