import type { Meta, StoryObj } from "@storybook/react";

import { HomeHero } from "app/pages/home/components/hero";
import { withRouter } from "storybook-addon-remix-react-router";

const meta = {
  title: "Pages/Home/Components/Hero",
  component: HomeHero,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof HomeHero>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const HomeHeroStory: StoryType = {};
