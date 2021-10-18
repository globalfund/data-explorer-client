import React from "react";
import { BarIcon } from "app/assets/icons/charts/Bar";
import { DotIcon } from "app/assets/icons/charts/Dot";
import { MapIcon } from "app/assets/icons/charts/Map";
import { TableIcon } from "app/assets/icons/charts/Table";
import { SankeyIcon } from "app/assets/icons/charts/Sankey";
import { TreemapIcon } from "app/assets/icons/charts/Treemap";
import { AllocationIcon } from "app/assets/icons/charts/Allocation";
import { ViewModel } from "app/components/ToolBoxPanel/utils/getControlItems";

export function getChartIcon(view: ViewModel) {
  switch (view.value) {
    case "Disbursements":
      return <TreemapIcon />;
    case "Treemap":
      return <TreemapIcon />;
    case "Time cycle":
      return <BarIcon />;
    case "Replenishment Periods":
      return <BarIcon />;
    case "Map":
      return <MapIcon />;
    case "Table":
      return <TableIcon />;
    case "List":
      return <TableIcon />;
    case "Flow":
      return <SankeyIcon />;
    case "Geomap":
      return <MapIcon />;
    case "Chart":
      return <DotIcon />;
    case "Radial":
      return <AllocationIcon />;
    default:
      return "";
  }
}
