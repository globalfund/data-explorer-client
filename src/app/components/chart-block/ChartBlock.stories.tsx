import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { BarChart } from "app/components/charts/bar";
import { ChartBlock } from "app/components/chart-block";
import { withRouter } from "storybook-addon-react-router-v6";
import { STORY_DATA_VARIANT_2 } from "app/components/charts/bar/data";

const cycles = [
  "All",
  "Cycle 1",
  "Cycle 2",
  "Cycle 3",
  "Cycle 4",
  "Cycle 5",
  "Cycle 6",
];

const Wrapper: React.FC = () => {
  const [selectedCycle, setSelectedCycle] = React.useState("All");

  const handleCycleChange = (cycle: string) => {
    setSelectedCycle(cycle);
  };

  return (
    <ChartBlock
      cycles={cycles}
      title="$84 Billion"
      selectedCycle={selectedCycle}
      subtitle="Funds raised to date"
      handleCycleChange={handleCycleChange}
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