import type { Meta, StoryObj } from "@storybook/react";

import { Treemap } from "app/components/charts/treemap";
import { withRouter } from "storybook-addon-react-router-v6";
import {
  STORY_DATA_VARIANT_1,
  STORY_DATA_VARIANT_2,
} from "app/components/charts/treemap/data";

const meta = {
  title: "Treemap",
  component: Treemap,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Treemap>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Variant1: StoryType = {
  args: {
    data: STORY_DATA_VARIANT_1,
  },
};

export const Variant2: StoryType = {
  args: {
    data: STORY_DATA_VARIANT_2,
  },
};
