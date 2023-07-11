import { TreeMapNodeDatum } from "@nivo/treemap";

export interface BudgetsTreemapDataItem {
  name: string;
  value: number;
  formattedValue: string;
  color: string;
  _children?: BudgetsTreemapDataItem[];
  tooltip: {
    header: string;
    componentsStats: {
      name: string;
      value: number;
    }[];
    value: number;
  };
}

export interface BudgetsTreemapProps {
  invertColors?: boolean;
  selectedNodeId?: string;
  isChildTreemap?: boolean;
  tooltipKeyLabel?: string;
  tooltipValueLabel: string;
  isDrilldownTreemap?: boolean;
  data: BudgetsTreemapDataItem[];
  xsTooltipData?: TreeMapNodeDatum | null;
  parentNodeCoords?: { x: number; y: number };
  onNodeClick: (node: string, x: number, y: number) => void;
  setXsTooltipData?: (data: TreeMapNodeDatum | null) => void;
}

export interface TreemapTooltipProps {
  node: TreeMapNodeDatum;
}
