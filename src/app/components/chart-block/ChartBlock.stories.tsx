import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { CYCLES } from "app/pages/home/data";
import { BarChart } from "app/components/charts/bar";
import { ChartBlock } from "app/components/chart-block";
import { withRouter } from "storybook-addon-remix-react-router";
import { STORY_DATA_VARIANT_2 } from "app/components/charts/bar/data";

const Wrapper: React.FC = () => {
  const [selectedCycle, setSelectedCycle] = React.useState(CYCLES[0]);

  return (
    <ChartBlock
      cycles={CYCLES}
      title="$84 Billion"
      selectedCycle={selectedCycle}
      subtitle="Funds raised to date"
      handleCycleChange={setSelectedCycle}
      text="Government, private sector, nongovernment and other donor pledges and contributions"
    >
      <BarChart
        data={STORY_DATA_VARIANT_2}
        valueLabels={{
          value: "Pledge",
          value1: "Contribution",
        }}
      />
    </ChartBlock>
  );
};

const meta = {
  title: "Components/Chart block",
  component: Wrapper,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ChartBlock>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Primary: StoryType = {};
