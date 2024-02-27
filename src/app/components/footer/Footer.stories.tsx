import type { Meta, StoryObj } from "@storybook/react";

import { Footer } from "app/components/footer";
import { withRouter } from "storybook-addon-react-router-v6";

const meta = {
  title: "Footer",
  component: Footer,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Footer>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Primary: StoryType = {
  args: {},
};
