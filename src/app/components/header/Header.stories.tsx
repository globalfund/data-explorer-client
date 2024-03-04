import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "app/components/header";
import { withRouter } from "storybook-addon-react-router-v6";

const meta = {
  title: "Components/Header",
  component: Header,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Header>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Primary: StoryType = {
  args: {},
};
