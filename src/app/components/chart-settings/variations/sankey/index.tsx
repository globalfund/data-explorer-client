import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import { OrderList } from "app/components/order-list";
import { ChartSettingsSankeyProps, nodesDropdownItems } from "./data";

export const ChartSettingsSankey: React.FC<ChartSettingsSankeyProps> = (
  props: ChartSettingsSankeyProps
) => {
  const { nodes, setNodes } = props;

  const handleColumnAddition = (value: string) => {
    if (nodes.find((item) => item.value === value)) {
      return;
    }
    const newItem = {
      id: (nodes.length + 1).toString(),
      value,
    };
    setNodes([...nodes, newItem]);
  };

  return (
    <Box
      sx={{
        gap: "10px",
        display: "flex",
        flexDirection: "column",
        "> div": {
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          flexDirection: "column",
        },
      }}
    >
      <Box>
        <Typography
          gap="5px"
          display="flex"
          fontSize="12px"
          fontWeight="700"
          marginBottom="5px"
          alignItems="center"
        >
          Sankey Chart Nodes
        </Typography>
        <Typography
          gap="5px"
          display="flex"
          fontSize="12px"
          fontWeight="400"
          alignItems="center"
        >
          Drag and drop to customise the order of the nodes showcased in this
          chart.
        </Typography>
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={"5px"}>
        <OrderList items={nodes} setItems={setNodes} />

        <Dropdown
          compact
          width={122.2}
          height={26}
          dropdownSelected="Add a Node"
          dropdownItems={nodesDropdownItems}
          handleDropdownChange={handleColumnAddition}
          secondary
          noEllipsis
          expandWidth
        />
      </Box>
    </Box>
  );
};
