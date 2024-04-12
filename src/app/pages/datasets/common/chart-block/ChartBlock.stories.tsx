import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { BarChart } from "app/components/charts/bar";
import { withRouter } from "storybook-addon-react-router-v6";
import { STORY_DATA_VARIANT_2 } from "app/components/charts/bar/data";
import { DatasetChartBlock } from "app/pages/datasets/common/chart-block";

const items = [
  { label: "Bar Chart", value: "Bar Chart" },
  { label: "Table View", value: "Table View" },
];

const Wrapper: React.FC = () => {
  const [dropdownSelected, setDropdownSelected] = React.useState(
    items[0].value
  );

  const handleSelectionChange = (value: string) => {
    setDropdownSelected(value);
  };

  return (
    <DatasetChartBlock
      title="$84 Billion"
      subtitle="Funds raised to date"
      dropdownItems={items}
      dropdownSelected={dropdownSelected}
      handleDropdownChange={handleSelectionChange}
    >
      <BarChart
        data={STORY_DATA_VARIANT_2}
        valueLabels={{
          value: "Pledge",
          value1: "Contribution",
        }}
      />
    </DatasetChartBlock>
  );
};

const meta = {
  title: "Pages/Datasets/Common/Chart block",
  component: Wrapper,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DatasetChartBlock>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Primary: StoryType = {};
