import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChartSettings } from "app/components/chart-settings";
import { withRouter } from "storybook-addon-remix-react-router";
import { ChartSettingsProps } from "app/components/chart-settings/data";
import { treesDropdownItems } from "app/components/chart-settings/variations/treemap/data";
import {
  xAxisDropdownItems,
  yAxisDropdownItems,
  stacksDropdownItems,
} from "app/components/chart-settings/variations/bar/data";
import { rowsDropdownItems } from "./variations/table/data";
import { ChartSettingsSortByOrderProps } from "./sort-by/data";

const Wrapper: React.FC<{
  chartType: ChartSettingsProps["chartType"];
}> = (props: { chartType: ChartSettingsProps["chartType"] }) => {
  const [stacked, setStacked] = React.useState(false);
  const [xAxis, setXAxis] = React.useState(xAxisDropdownItems[0].value);
  const [yAxis, setYAxis] = React.useState(yAxisDropdownItems[0].value);
  const [stacks, setStacks] = React.useState(stacksDropdownItems[0].value);
  const [nested, setNested] = React.useState(false);
  const [trees, setTrees] = React.useState(treesDropdownItems[0].value);
  const [nestedContent, setNestedContent] = React.useState(
    treesDropdownItems[0].value
  );
  const [rows, setRows] = React.useState(rowsDropdownItems[0].value);
  const [tableOrder, setTableOrder] =
    React.useState<ChartSettingsSortByOrderProps["order"]>(null);
  const handleResetTableOrder = () => {
    setTableOrder(null);
  };

  const csprops = React.useMemo(() => {
    switch (props.chartType) {
      case "bar":
        return {
          barProps: {
            stacked,
            xAxis,
            yAxis,
            stacks,
            setStacked,
            setXAxis,
            setYAxis,
            setStacks,
            stacksDropdownItems,
          },
        };
      case "line":
        return {
          lineProps: { xAxis, yAxis, setXAxis, setYAxis },
        };
      case "treemap":
        return {
          treemapProps: {
            nested,
            trees,
            nestedContent,
            setNested,
            setTrees,
            setNestedContent,
          },
        };
      case "table":
        return {
          tableProps: {
            rows,
            setRows,
            order: tableOrder,
            setOrder: setTableOrder,
            onReset: handleResetTableOrder,
            secondary: true,
          },
        };
      default:
        return {};
    }
  }, [
    props.chartType,
    stacked,
    xAxis,
    yAxis,
    stacks,
    nested,
    trees,
    nestedContent,
  ]);

  const reset = () => {
    setStacked(false);
    setXAxis(xAxisDropdownItems[0].value);
    setYAxis(yAxisDropdownItems[0].value);
    setStacks(stacksDropdownItems[0].value);
    setNested(false);
    setTrees(treesDropdownItems[0].value);
    setNestedContent(treesDropdownItems[0].value);
  };

  return (
    <ChartSettings
      chartType={props.chartType}
      reset={reset}
      {...csprops}
      handleSettingsPanelClose={() => {}}
    />
  );
};

const meta = {
  title: "Components/Chart settings",
  component: Wrapper,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    chartType: {
      control: "select",
      options: ["bar", "line", "treemap", "table"],
    },
  },
} satisfies Meta<typeof Wrapper>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Primary: StoryType = {
  args: {
    chartType: "bar",
  },
};
