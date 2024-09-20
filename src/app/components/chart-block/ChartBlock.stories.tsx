import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { CYCLES } from "app/pages/home/data";
import { BarChart } from "app/components/charts/bar";
import { ChartBlock } from "app/components/chart-block";
import { withRouter } from "storybook-addon-remix-react-router";
import { STORY_DATA_VARIANT_2 } from "app/components/charts/bar/data";

const Wrapper: React.FC = () => {
  const [selectedCycles, setSelectedCycles] = React.useState([CYCLES[0]]);

  const handleCycleChange = (cycle: { name: string; value: string }) => {
    const index = selectedCycles.findIndex((c) => c.value === cycle.value);
    if (index === -1) {
      setSelectedCycles([...selectedCycles, cycle]);
    } else {
      setSelectedCycles(selectedCycles.filter((c) => c.value !== cycle.value));
    }
  };

  return (
    <ChartBlock
      id="chart"
      cycles={CYCLES}
      infoType="global"
      title="$84 Billion"
      data={STORY_DATA_VARIANT_2}
      selectedCycles={selectedCycles}
      subtitle="Funds raised to date"
      handleCycleChange={handleCycleChange}
      exportName="pledges-and-contributions"
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
