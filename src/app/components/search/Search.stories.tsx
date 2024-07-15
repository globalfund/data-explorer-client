import type { Meta, StoryObj } from "@storybook/react";

import { Search } from "app/components/search";
import { withRouter } from "storybook-addon-remix-react-router";

const meta = {
  title: "Components/Search",
  component: Search,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Search>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Primary: StoryType = {
  args: {},
};
