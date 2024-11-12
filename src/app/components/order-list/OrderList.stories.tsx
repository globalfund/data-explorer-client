import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { OrderList } from "app/components/order-list";
import { withRouter } from "storybook-addon-remix-react-router";
import { ItemInterface } from "react-sortablejs";

const Wrapper: React.FC = () => {
  const [list, setList] = React.useState<ItemInterface[]>([
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
    { id: "3", name: "Item 3" },
    { id: "4", name: "Item 4" },
    { id: "5", name: "Item 5" },
  ]);

  return <OrderList items={list} setItems={setList} />;
};

const meta = {
  title: "Components/Order List",
  component: Wrapper,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Wrapper>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Primary: StoryType = {};
