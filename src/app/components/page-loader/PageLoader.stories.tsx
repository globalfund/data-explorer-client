import type { Meta, StoryObj } from "@storybook/react";

import { PageLoader } from "app/components/page-loader";
import { withRouter } from "storybook-addon-react-router-v6";

const meta = {
  title: "Components/Page loader",
  component: PageLoader,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof PageLoader>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Primary: StoryType = {
  args: {},
};
